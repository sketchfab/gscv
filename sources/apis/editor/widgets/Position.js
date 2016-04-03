define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: function() {
            var name = 'n' + Math.random();
            return [ '<div class="widget position-widget">',
            '          <div class="widget-wrapper">',
            '              <div class="widget-line">',
            '                  <input name="' + name + '" class="value" type="radio" value="top-left">',
            '                  <input name="' + name + '" class="value" type="radio" value="top-center">',
            '                  <input name="' + name + '" class="value" type="radio" value="top-right">',
            '              </div>',
            '              <div class="widget-line">',
            '                  <input name="' + name + '" class="value" type="radio" value="middle-left">',
            '                  <input name="' + name + '" class="value" type="radio" value="middle-center">',
            '                  <input name="' + name + '" class="value" type="radio" value="middle-right">',
            '              </div>',
            '              <div class="widget-line">',
            '                  <input name="' + name + '" class="value" type="radio" value="bottom-left">',
            '                  <input name="' + name + '" class="value" type="radio" value="bottom-center">',
            '                  <input name="' + name + '" class="value" type="radio" value="bottom-right">',
            '              </div>',
            '          </div>',
            '      </div>'
            ].join( '' );
        },

        events: _.extend( {}, Widget.prototype.events, {
            'change .value:input': 'changeEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value'

            } );
            
            Widget.prototype.initialize.call( this, options );

            var values = [
                'top-left', 'top-center', 'top-right',
                'middle-left', 'middle-center', 'middle-right',
                'bottom-left', 'bottom-center', 'bottom-right'
            ];
            
            if ( values.indexOf( this.get() ) < 0 )
                this.set( 'top-left' );

        },

        render: function () {

            var value = this.get();
            this.$( '.value' ).each( function( i, e ) {
                
                if ( e.value === value )
                    e.setAttribute( 'checked', 1 );
            });
        },

        changeEvent: function ( e ) {

            var value = $( e.currentTarget ).val();
            
            this.set( value );
            this.change( value );
        }

    } );

} );
