define( [

    'vendors/Backbone',
    'vendors/Underscore',

    'apis/editor/widgets/Horizontal'

], function ( Backbone, _, HorizontalWidget ) {

    'use strict';

    return HorizontalWidget.extend( {

        el: [ '<div class="widget layout-widget horizontal-widget slidered-image-widget">',
            '          <div class="widget-wrapper">',
            '              <div class="children"></div>',
            '          </div>',
            '      </div>'
        ].join( '' ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value'

            } );

            HorizontalWidget.prototype.initialize.call( this, options );

            var common = {
                model: this.model
            };
            var numCommon = this.options.range;

            this.image = this.createWidget( 'FactoredImage',
                _.extend( {}, common, {
                    name: this.field()
                }, this.options.factoredImageOptions )
            );

            this.numberedSlider = this.createWidget( 'NumberedSlider',
                _.extend( {}, common, {
                    name: this.field( 'factor' ),
                    slider: _.extend( {}, numCommon, this.options.sliderOptions ),
                    number: _.extend( {}, numCommon, this.options.numberOptions )
                }, this.options.numberedSliderOptions )
            );

            this.image = this.factoredImage;
            this.slider = this.numberedSlider.slider;
            this.number = this.numberedSlider.number;

        }

    } );

} );
