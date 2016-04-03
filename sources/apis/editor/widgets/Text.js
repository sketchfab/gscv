define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: function() {
            
            return [ '<div class="widget text-widget">',
            '          <div class="widget-wrapper">',
            '              <input class="value"/>',
            '          </div>',
            '      </div>'
            ].join( '' );
        },

        events: _.extend( {}, Widget.prototype.events, {
            'change .value:input': 'changeEvent',
            'keyup .value:input': 'keyupEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model : new Backbone.Model(),
                name : 'value',
                attr : {}
            } );
            
            $(this.el).find( 'value' ).attr( 'maxlength' , options.lengthMaximum );
            
            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set( '' );

            ( function() { this.addAttr( options.model, options ); }.bind( this ) )( );
        },

        render: function () {

            var $valueElement = this.$( '.value' );

            var value = this.get();

            $valueElement.val( value );
        },

        addAttr: function ( model, options ) {

            for (var label in options.attr) {
                this.$( '.value' ).attr( label, options.attr[ label ] );
            }
            
            this.render();
        },

        fixValue: function ( value ) {

            if ( value.length > this.options.lengthMaximum )
                value = value.substring(0, this.options.lengthMaximum);

            return value;
            
        },

        keyupEvent: function ( e ) {

            var value =  $( e.currentTarget ).val();
            value =  this.fixValue( value );
            
            this.set( value );
        },
        
        changeEvent: function ( e ) {

            var value = $( e.currentTarget ).val();
            value =  this.fixValue( value );
            
            this.set( value );
        }

    } );

} );
