define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget options-widget">',
            '          <div class="widget-wrapper">',
            '              <ul class="options"></ul>',
            '          </div>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'click [data-value]': 'selectEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',
                image: null,
                options: {},

                allowMultiple: true,
                allowEmpty: true

            } );

            Widget.prototype.initialize.call( this, options );

            if ( options.allowMultiple === true && typeof this.get() === 'undefined' )
                this.set( [] );

            // Converts a simple array into a key-pair object
            // [ 'a', 'b', 'c' ] => { 'a' : 'a', 'b' : 'b', 'c' : 'c' }
            if ( Array.isArray( this.options.options ) ) {
                this.options.options = this.options.options.reduce( function ( options, key ) {
                    options[ key ] = key;
                    return options;
                }.bind( this ), {} );
            }

            // Converts a key-pair object into a key-pair array
            // { 'a' : 'a', 'b' : 'b', 'c' : 'c' } => [ { 'label' : 'a', 'value' : 'a' }, { 'label' : 'b', 'value' : 'b' }, { 'label' : 'c', 'value' : 'c' } ]
            if ( !( this.options.options instanceof Backbone.Collection ) ) {
                this.options.options = new Backbone.Collection( Object.keys( this.options.options ).map( function ( key ) {
                    return {
                        value: key,
                        label: this.options.options[ key ]
                    };
                }.bind( this ) ) );
            }

            this.resetOptionEvent_ = this.resetOptionEvent.bind( this );
            this.addOptionEvent_ = this.addOptionEvent.bind( this );
            this.removeOptionEvent_ = this.removeOptionEvent.bind( this );

            this.options.options.each( function ( model ) {
                this.addOption( model );
            }.bind( this ) );

        },

        delegateEvents: function () {

            Widget.prototype.delegateEvents.apply( this, arguments );

            this.options.options.on( 'reset', this.resetOptionEvent_ );
            this.options.options.on( 'add', this.addOptionEvent_ );
            this.options.options.on( 'remove', this.removeOptionEvent_ );

        },

        undelegateEvents: function () {

            Widget.prototype.undelegateEvents.apply( this, arguments );

            this.options.options.off( 'reset', this.resetOptionEvent_ );
            this.options.options.off( 'add', this.addOptionEvent_ );
            this.options.options.off( 'remove', this.removeOptionEvent_ );

        },

        render: function () {

            var values = [].concat( this.get() || [] );

            values = values.map( function ( value ) {
                return value.toString();
            } );

            this.$( '[data-value]' ).each( function () {
                var $el = $( this ),
                    value = $el.attr( 'data-value' );
                $el.toggleClass( 'active', values.indexOf( value ) !== -1 );
            } );

        },

        addOption: function ( model, render ) {

            if ( typeof render === 'undefined' )
                render = true;

            var $option = $( '<li/>' )
                .attr( 'class', 'option' )
                .attr( 'data-cid', model.cid )
                .attr( 'data-value', model.get( 'value' ) )
                .attr( 'title', model.get( 'label' ) )
                .appendTo( this.$( '.options' ) );

            var $link = $( '<a/>' )
                .text( model.get( 'label' ) )
                .appendTo( $option );

            if ( this.options.image ) {
                if ( model.get( this.options.image ) ) {
                    $( '<span class="image">' )
                        .css( 'background-image', 'url(' + model.get( 'image' ) + ')' )
                        .prependTo( $link );
                }
            }

            if ( render ) {
                this.render();
            }

        },

        removeOption: function ( model ) {

            this.$( '.options .option' ).filter( function () {
                return $( this ).attr( 'data-cid' ) === model.cid;
            } ).remove();

            this.render();

        },

        resetOptions: function () {

            this.$( '.options' ).empty();

            this.options.options.forEach( function ( model ) {
                this.addOption( model, false );
            }.bind( this ) );

            this.render();

        },

        triggerOption : function ( option ) {

            var currentValue = this.get( );
            var allowMultiple = Array.isArray( currentValue );

            if ( allowMultiple ) {

                var index = currentValue.indexOf( option );

                if ( index === - 1 ) {
                    this.change( currentValue.concat( [ option ] ) );
                } else if ( this.options.allowEmpty || currentValue.length >= 2 ) {
                    var updatedValue = currentValue.slice( );
                    updatedValue.splice( index, 1 );
                    this.change( updatedValue );
                }

            } else {

                if ( currentValue !== option ) {
                    this.change( option );
                } else if ( this.options.allowEmpty ) {
                    this.change( null );
                }

            }

        },

        addOptionEvent : function ( model ) {

            this.addOption( model );

        },

        removeOptionEvent: function ( model ) {

            this.removeOption( model );

        },

        resetOptionEvent: function () {

            this.resetOptions();

        },

        selectEvent: function ( e ) {

            e.preventDefault();

            this.triggerOption( $( e.currentTarget ).attr( 'data-value' ) );

        }

    } );

} );
