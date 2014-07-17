define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Vertical',
    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, VerticalWidget, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget tabbed-widget">',
            '          <div class="widget-wrapper">',
            '              <ul class="tabs"></ul>',
            '              <div class="panels"></div>',
            '          </div>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'click [data-tab]': 'selectEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value'

            } );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set( null );

            this._index = 0;
            this._panels = [];

        },

        createPanel: function ( label, options ) {

            if ( typeof options === 'undefined' )
                options = {};

            var name = options.name || ( 'panel' + ( ++this._index ) );

            if ( this._panels.indexOf( name ) !== -1 ) {
                throw new Error( 'Duplicate panel name' );
            } else {
                this._panels.push( name );
            }

            var link = $( '<li class="tab"/>' )
                .attr( 'data-tab', name )
                .append( $( '<a/>' ).text( label ) )
                .appendTo( this.$( '.tabs' ) );

            var panel = $( '<div class="panel"/>' )
                .attr( 'data-panel', name )
                .appendTo( this.$( '.panels' ) );

            var widget = VerticalWidget.reify( this, options );
            widget.$el.appendTo( panel );

            widget.removePanel = function () {

                link.remove();
                panel.remove();

                var offset = this._panels.indexOf( name );
                this._panels.splice( offset, 1 );

                if ( this.get() === name ) {

                    if ( offset === this._panels.length ) {
                        if ( this._panels.length > 0 ) {
                            offset -= 1;
                        } else {
                            offset = null;
                        }
                    }

                    if ( offset !== null ) {
                        this.set( this._panels[ offset ] );
                    } else {
                        this.set( null );
                    }

                }

            }.bind( this );

            if ( this.get() === null ) {
                this.set( name );
            } else {
                this.render();
            }

            return widget;

        },

        render: function () {

            var tab = this.get();

            this.$( '[data-tab]' ).each( function () {
                $( this ).toggleClass( 'active', $( this ).attr( 'data-tab' ) === tab );
            } );

            this.$( '[data-panel]' ).each( function () {
                $( this ).toggleClass( 'active', $( this ).attr( 'data-panel' ) === tab );
            } );

        },

        selectEvent: function ( e ) {

            e.preventDefault();

            this.change( $( e.currentTarget ).attr( 'data-tab' ) );

        }

    } );

} );
