define( [

    'vendors/Backbone',
    'vendors/Underscore',

    'apis/editor/widgets/Horizontal'

], function ( Backbone, _, HorizontalWidget ) {

    'use strict';

    return HorizontalWidget.extend( {

        el: [ '<div class="widget layout-widget horizontal-widget numbered-slider-widget">',
            '          <div class="widget-wrapper">',
            '              <div class="children"></div>',
            '          </div>',
            '      </div>'
        ].join( '' ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

                minimum: 0,
                maximum: 100,
                step: 1,

                unit: null

            } );

            HorizontalWidget.prototype.initialize.call( this, options );

            if ( typeof this.get() === 'undefined' )
                this.set( 0 );

            var common = {
                model: this.model,
                name: this.options.name,
                minimum: this.options.minimum,
                maximum: this.options.maximum,
                step: this.options.step
            };
            this.slider = this.createWidget( 'Slider', _.extend( {}, common, this.options.sliderOptions ) );
            this.number = this.createWidget( 'Number', _.extend( {}, common, this.options.numberOptions ) );

            if ( this.options.unit ) {
                // Unit is positionned on the right only.
                this.createWidget( 'Label', {
                    label: this.options.unit
                } );
            }

        }

    } );

} );
