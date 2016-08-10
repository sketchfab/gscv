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
            '              <div class="decrease"><a></a></div>',
            '              <input class="value" />',
            '              <div class="increase"><a></a></div>',
            '          </div>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, Widget.prototype.events, {
            'click .decrease': 'decreaseEvent',
            'click .increase': 'increaseEvent',
            'change .value:input': 'changeEvent',
            'keydown .value:input': 'keydownEvent',
            'mousewheel .value': 'mousewheelEvent'
        } ),

        initialize: function ( options ) {
            options = _.defaults( options || {}, {
                model: new Backbone.Model(),
                name: 'value'

            } );

            Widget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set( 0 );

            if ( this.options.decimals === null ) {
                this.options.decimals = options.step.toString().replace( /^[0-9]*(?:\.([0-9]*))$/, '$1' ).length;
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

        fixValue: function ( value ) {

            if ( value < this.options.minimum ) {

                if ( this.options.cycle ) {
                    return this.options.maximum - ( this.options.minimum - value ) % ( this.options.maximum - this.options.minimum );
                } else {
                    return false;
                }

            } else if ( value >= this.options.maximum ) {

                if ( this.options.cycle ) {
                    return this.options.minimum + ( value - this.options.maximum ) % ( this.options.maximum - this.options.minimum );
                } else if ( value > this.options.maximum ) {
                    return false;
                } else {
                    return value;
                }

            } else {

                return value;

            }

        },

        add: function ( amount ) {

            var factor = this.get() / this.options.step;
            var intFactor = Math.round( factor );

            var value = this.fixValue( this.options.step * ( intFactor + amount ) );

            if ( value !== false ) {
                this.change( value );
            }

        },

        increaseEvent: function ( e ) {

            e.preventDefault();

            this.add( +1 );

        },

        decreaseEvent: function ( e ) {

            e.preventDefault();

            this.add( -1 );

        },

        changeEvent: function ( e ) {

            var value = $( e.currentTarget ).val();

            var valueUnit = value.match( /[^0-9.]*$/ )[ 0 ];
            var valueNumber = value.substr( 0, value.length - valueUnit.length );

            valueUnit = valueUnit.trim();
            valueNumber = valueNumber.trim();

          


            // override the inputValue to change the scale
            // typically it's for non linear scale
            // It's clearly not the good way to do it
            // we should refactor widget to handle custom
            // scale
            if ( this.options.inputValue ) {
                value = this.options.inputValue( value );
            }
            // This force the update
            this.set( value );
            this.change( value );

        },

        keydownEvent: function ( e ) {

            switch ( e.keyCode ) {

            case 38:
                /* up */
                    e.preventDefault();
                this.add( +1 );
                break;

            case 40:
                /* down */
                    e.preventDefault();
                this.add( -1 );
                break;

            case 33:
                /* page up */
                    e.preventDefault();
                this.add( +10 );
                break;

            case 34:
                /* page down */
                    e.preventDefault();
                this.add( -10 );
                break;

            }

        },

        mousewheelEvent: function ( e, delta ) {

            if ( !this.$( '.value' ).is( ':focus' ) ) {
                return;
            }

            e.preventDefault();

            if ( delta > 0 ) { // up
                this.add( +1 );
            } else if ( delta < 0 ) {
                this.add( -1 );
            }

        }

    } );

} );
