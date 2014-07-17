define( [

    'vendors/jquery/UI',
    'vendors/Backbone',
    'vendors/Underscore',

    'apis/editor/widgets/Layout',
    'apis/editor/widgets/Vertical'

], function ( $, Backbone, _, Layout, Vertical ) {

    'use strict';

    return Layout.extend( {

        el: [ '<div class="widget repeat-widget">',
            '    <div class="widget-wrapper">',
            '        <div class="children">',
            '        </div>',
            '    </div>',
            '</div>'
        ].join( '' ),

        initialize: function ( options ) {

            if ( options.sortable === undefined )
                options.sortable = false;

            if ( options.collection === undefined )
                options.collection = new Backbone.Collection();

            if ( options.layout === undefined )
                options.layout = Vertical;

            Layout.prototype.initialize.call( this, options );

            this.widgets = [];
            this.modelToWidget = {};

            this.layout = this.createWidget( this.options.layout );

            this.options.collection.forEach( function ( model, index ) {
                this.onAdd( model, this.options.collection, {
                    at: index
                } );
            }.bind( this ) );

            if ( this.options.sortable ) {
                this.layout.$( '.children' ).sortable( _.extend( {
                    handle: '.sort-handle',
                    change: this.onMove.bind( this )
                }, this.options.sortable ) );
            }

        },

        delegateEvents: function () {

            var orig = Layout.prototype.delegateEvents.apply( this, arguments );

            this.options.collection.on( 'add', this.onAdd, this );
            this.options.collection.on( 'remove', this.onRemove, this );
            this.options.collection.on( 'reset', this.onReset, this );
            this.options.collection.on( 'sort', this.onSort, this );

            return orig;

        },

        undelegateEvents: function () {

            this.options.collection.off( 'add', this.onAdd, this );
            this.options.collection.off( 'remove', this.onRemove, this );
            this.options.collection.off( 'reset', this.onReset, this );
            this.options.collection.off( 'sort', this.onSort, this );

            return Layout.prototype.undelegateEvents.apply( this, arguments );

        },

        onAdd: function ( model, collection, options ) {

            // 'at' may be unset

            var at = options.at || collection.length;

            // We currently use a pretty naive way to keep the items sorted :
            // rather than inserting the new widget at the right place, we
            // remove all the widgets which should be behind it in the DOM, and
            // add them back once the new widget is here.
            //
            // That's not the best way, but it shouldn't hurt performances too
            // bad, and works. Ideally, it should be fixed at some point.

            var nextModels = collection.slice( at ).filter( function ( model ) {

                // We're filtering to keep only the already-here DOM elements
                //
                // Not doing this would induce multiple-insertions when adding
                // multiple elements at once.

                return this.modelToWidget[ model.cid ];

            }.bind( this ) );

            nextModels.forEach( function ( model ) {
                this.onRemove( model );
            }.bind( this ) );

            var widget = this.layout.createWidget( null, this.options.widget, {
                model: model
            } );
            widget.$el.attr( 'data-repeat-cid', model.cid );

            // Save the widget into an array and a map, so we can find it faster next time
            this.modelToWidget[ model.cid ] = widget;
            this.widgets.push( widget );

            // Add back the removed models
            nextModels.forEach( function ( model, index ) {
                this.onAdd( model, collection, {
                    at: at + 1 + index
                } );
            }.bind( this ) );

        },

        onRemove: function ( model ) {

            var widget = this.modelToWidget[ model.cid ];

            if ( !widget )
                return;

            var widgetOffset = this.widgets.indexOf( widget );
            this.widgets.splice( widgetOffset, 1 );

            this.layout.removeWidget( widget );
            delete this.modelToWidget[ model.cid ];

            this.widgets.slice( widgetOffset ).forEach( function ( widget ) {
                widget.trigger( 'sorted' );
            } );

        },

        onReset: function () {

            this.widgets.forEach( function ( widget ) {
                this.onRemove( widget.model );
            }.bind( this ) );

            this.widgets = [];
            this.modelToWidget = {};

        },

        onSort: function () {

            if ( this.inhibNextSort ) {
                // Ooh, dirty trick ! (we do not wish to sort after an onMove)
                this.inhibNextSort = false;
                return;
            }

            // So, here we simply update the inner widget list

            this.widgets = this.collection.map( function ( model ) {
                return this.modelToWidget[ model.cid ];
            }.bind( this ) ).filter( function ( widget ) {
                return widget !== null && widget !== undefined;
            } );

            // There's something weird about this function : it directly
            // modifies the content of its child widget (the layout) using
            // this.layout.$('.children').
            //
            // It's not very clean, however, the layout widgets does not expose
            // any kind of "sort" behavior, so for now it will have to work.

            var $target = this.layout.$( '.children' );

            this.widgets.forEach( function ( widget ) {
                widget.$el.detach().appendTo( $target );
            } );

            this.collection.forEach( function ( model ) {
                this.modelToWidget[ model.cid ].trigger( 'sorted' );
            }.bind( this ) );

        },

        onMove: function ( e, ui ) {

            var $currentTarget = $( ui.item );
            var $placeholder = $( ui.placeholder );

            var model = this.collection.get( $currentTarget.attr( 'data-repeat-cid' ) );
            var widget = this.modelToWidget[ model.cid ];

            var oldPosition = this.collection.indexOf( model );
            var newPosition = $currentTarget.siblings().index( $placeholder );

            // Direct access to the collection's underlying array

            this.collection.models.splice( oldPosition, 1 );
            this.collection.models.splice( newPosition, 0, model );

            // Don't forget to do it too for our underlying widgets

            this.widgets.splice( oldPosition, 1 );
            this.widgets.splice( newPosition, 0, widget );

            // Finally, we can tell the widgets that their positions have been updated

            this.inhibNextSort = true;
            this.collection.trigger( 'sort' );

            var first = Math.min( oldPosition, newPosition );
            var last = Math.max( oldPosition, newPosition ) + 1;

            this.collection.slice( first, last ).forEach( function ( model ) {
                this.modelToWidget[ model.cid ].trigger( 'sorted' );
            }.bind( this ) );

        }

    } );

} );
