define( [

    'vendors/Backbone',
    'vendors/Underscore',

    'apis/editor/widgets/Horizontal'

], function ( Backbone, _, HorizontalWidget ) {

    'use strict';

    return HorizontalWidget.extend( {

        el: [ '<div class="widget layout-widget horizontal-widget input-button-widget">',
            '          <div class="widget-wrapper">',
            '              <input type="text" class="input" />',
            '          </div>',
            '      </div>'
        ].join( '' ),

        events: _.extend( {}, HorizontalWidget.prototype.events, {
            'change .input:input': 'changeEvent'
        } ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

                unit: null

            } );

            HorizontalWidget.prototype.initialize.call( this, options );

            this.$el.find( '.input' ).val( this.options.value );

            if ( typeof this.get() === 'undefined' )
                this.set( 0 );

            var common = {
                model: this.model,
                name: this.options.name,
                text: this.options.text,
                value: this.options.value,
                renderValue: null,
                inputValue: null
            };

            this.button = this.createWidget( 'Button', _.extend( {}, common, this.options.buttonOptions ) );

            if ( this.options.unit ) {
                // Unit is positionned on the right only.
                this.createWidget( 'Label', {
                    label: this.options.unit
                } );
            }

        },

        render: function () {

            var $valueElement = this.$( '.input' );

            var value = this.get();

            if ( this.options.renderValue ) {
                // we need to set the value from user defined way
                // for example to display the result of a logarithmic scale
                value = this.options.renderValue( value );
            }

            $valueElement.val( value );

        },

        changeEvent: function () {

            console.log(this.model);
            console.log(this.$( '.input' ).val());

            this.model.set( 'value', this.$( '.input' ).val() );

        }

    } );

} );
