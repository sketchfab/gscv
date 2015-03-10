define( [

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Horizontal'

], function ( Backbone, $, _, HorizontalWidget ) {

    'use strict';

    return HorizontalWidget.extend( {

        el: [ '<div class="widget input-widget flex">',
              '          <input class="input-text flex-4" type="text" name="text" value="">',
              '          </input>',
              '          <div class="font-size number flex flex-1">',
              '          </div>',
              '          <div class="text-position flex flex-2">',
              '          <label class="label">X</label>',
              '          <div class="x number"></div>',

              '          <label class="label">Y</label>',
              '          <div class="y number"></div>',
              '          </div>',
              '      </div>'
            ].join( '' ),

        events: _.extend( {}, HorizontalWidget.prototype.events, {
            'change .input-text'            : 'changeText'
        } ),

        initialize: function ( options ) {
            options = _.defaults( options || {}, {

                model: new Backbone.Model(),
                text        : '',
                fontSize    : 16,
                x           : 0,
                y           : 0,
                name        : ''

            }, options );

            HorizontalWidget.prototype.initialize.call( this, options );

            this.settings = {
                fontSize : options.fontSize,
                text     : options.text,
                x        : options.x,
                y        : options.y
            };

            this.set(this.settings);

            var numberOpt = {
                minimum: 6,
                maximum: 92,
                defaultNumber: options.fontSize,
                name: 'font-size'
            };

            var xOpt = {
                minimum: 0,
                maximum: 700,
                defaultNumber: options.x,
                name: 'x'
            };

            var yOpt = {
                minimum: 0,
                maximum: 700,
                defaultNumber: options.y,
                name: 'y'
            };

            var customSize  = this.createWidget( 'Number', numberOpt );
            var positionX   = this.createWidget( 'Number', xOpt );
            var positionY   = this.createWidget( 'Number', yOpt );

            customSize.model.on('change', this.changeFontSize, this);
            positionX.model.on('change', this.changePositionX, this);
            positionY.model.on('change', this.changePositionY, this);

            this.$el.find( '.font-size' ).append(customSize.$el);
            this.$el.find( '.text-position .x' ).append(positionX.$el);
            this.$el.find( '.text-position .y' ).append(positionY.$el);

            this.$el.find('.input-text').val(options.text);
        },



        changePositionX: function ( model ) {
            var value = model.get('x');

            if (!value)
                return;

            this.settings = _.extend({}, this.settings, {x: value})
            this.set(this.settings);
        },

        changePositionY: function ( model ) {
            var value = model.get('y');

            if (!value)
                return;

            this.settings = _.extend({}, this.settings, {y: value})
            this.set(this.settings);
        },

        changeFontSize: function ( model ) {
            var value = model.get('font-size');

            if (!value)
                return;

            this.settings = _.extend({}, this.settings, {fontSize: value})
            this.set(this.settings);
        },

        changeText: function ( e ) {
            e.preventDefault();

            var value = e.target.value;

            this.settings = _.extend({}, this.settings, {text: value})
            this.set(this.settings);

        }

    } );

} );
