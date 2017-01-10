define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Horizontal',

], function ( Backbone, $, _, HorizontalWidget ) {

    'use strict';

    return HorizontalWidget.extend( {

        el: [ ' <div class="widget layout-widget horizontal-widget rich-text-widget">',
            '       <div class="widget-wrapper">',
            '           <div class="children"></div>',
            '       </div>',
            '   </div>'
        ].join( '' ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value'

            }, options );

            HorizontalWidget.prototype.initialize.call( this, options );

            var common = {
                model: this.model,
            };
            this.text = this.createWidget( 'Text', _.extend( {}, common, { name: this.field( 'text' ) }, this.options.textOptions ) );
            this.size = this.createWidget( 'Number', _.extend( {}, common, { name: this.field( 'size' ) }, this.options.sizeOptions ) );
            this.color = this.createWidget( 'Color', _.extend( {}, common, { name: this.field( 'color' ) }, this.options.colorOptions ) );

        }

    } );

} );
