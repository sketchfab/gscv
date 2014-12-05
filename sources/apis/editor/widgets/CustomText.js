define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Layout',

], function ( Backbone, $, _, Layout ) {

    'use strict';

    return Layout.extend( {

        el: [ '<div class="widget layout-widget vertical-widget">',
            '          <div class="widget-wrapper">',
            '              <div class="children"></div>',
            '          </div>',
            '      </div>'
        ].join( '' ),

        initialize: function ( options ) {

            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                name: 'value',

                placeholder: '',
                Ymin: 0,
                Ymax: 500,
                Xmin: 0,
                Xmax: 500,
                Sizemin: 8,
                Sizemax: 80,
                FontArray: ['Lato', 'Lobster', 'Overlock']

            } );

            Layout.prototype.initialize.call( this, options );

            this.widgetModel = new Backbone.Model();
            this.widgetModel.set(this.model.attributes[this.options.name ]);

            this.createWidget('Input', {
                model : this.widgetModel,
                name  : 'Textval',
                placeholder : this.options.placeholder
            } );

            this.createWidget( 'Position X', 'NumberedSlider', {
                model   : this.widgetModel,
                name    : 'X',
                minimum : this.options.Xmin,
                maximum : this.options.Xmax
            } );

            this.createWidget( 'Position Y', 'NumberedSlider', {
                model   : this.widgetModel,
                name    : 'Y',
                minimum : this.options.Ymin,
                maximum : this.options.Ymax
            } );

            this.createWidget( 'Font Size', 'NumberedSlider', {
                model   : this.widgetModel,
                name    : 'Fontsize',
                minimum : this.options.Sizemin,
                maximum : this.options.Sizemax,
            } );

            this.createWidget( 'Font Family', 'Select', {
                model   : this.widgetModel,
                name    : 'Font',
                options : this.options.FontArray
            } );

            this.createWidget( 'Color', 'Color', {
                model   : this.widgetModel,
                name    : 'Color'
            } );

            this.widgetModel.on( 'change', this.changeEvent, this );

        },

        changeEvent: function ( ) {

            var values = {};
            var name = this.options.name;
            values[ name ] = this.widgetModel.attributes;

            this.model.set(values);
            this.model.trigger('change:'+name);

        }

    } );

} );
