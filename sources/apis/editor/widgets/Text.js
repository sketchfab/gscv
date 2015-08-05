define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget number-widget">',
            '          <div class="widget-wrapper">',
            '              <input class="value" />',
            '          </div>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
        	'keyup .value:input': 'keyupEvent',
            'change .value:input': 'changeEvent',
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

            } );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set( "Maël Nison" );

        },

        render: function () {

            var $valueElement = this.$( '.value' );

            var value = this.get();
            var displayValue = value;

            if ( $valueElement.is( ':input' ) ) {
                $valueElement.val( displayValue );
            } else {
                $valueElement.text( displayValue );
            }

        },

        keyupEvent: function ( e ) {

        	var value = $( e.currentTarget ).val();
        	// alert ( value );

            // This force the update
            this.set( !value );
            this.change( value );

        },

        changeEvent: function ( e ) {

            var value = $( e.currentTarget ).val();

            // This force the update
            this.set( !value );
            this.change( value );

        }

    } );

} );
