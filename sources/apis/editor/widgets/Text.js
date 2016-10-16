define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Widget'

], function ( Backbone, $, _, Widget ) {

    'use strict';

    return Widget.extend( {

        el: [ '<div class="widget text-widget">',
            '          <div class="widget-wrapper">',
            '              <input class="value" />',
            '          </div>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'change .value:input': 'changeEvent',
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

                // used to override the value displayed
                // used for custom scale
                renderValue: null,
                inputValue: null

            } );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' ) {
                this.set( 0 );
            }

        },

        render: function () {

            var $valueElement = this.$( '.value' );

            var value = this.get();

            if ( this.options.renderValue ) {
                // we need to set the value from user defined way
                // for example to display the result of a logarithmic scale
                value = this.options.renderValue( value );
            }

            if ( $valueElement.is( ':input' ) ) {
                $valueElement.val( value );
            } else {
                $valueElement.text( value );
            }

        },

        changeEvent: function ( e ) {

            var value = $( e.currentTarget ).val().trim();

            // override the inputValue to change the scale
            // typically it's for non linear scale
            // It's clearly not the good way to do it
            // we should refactor widget to handle custom
            // scale
            if ( this.options.inputValue ) {
                value = this.options.inputValue( value );
            }

            // This force the update
            this.set( !value );
            this.change( value );

        },

    } );

} );
