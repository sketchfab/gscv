/*global define*/

define([

    'vendors/Backbone',
    'vendors/JQuery',

    'editor',
    'apis/editor/tools/localStorage'

], function (Backbone, $, editor, localStorage) {

    var Card = Backbone.Model.extend({

        defaults: {
            radius: 10
        }

    });

    /**
     * @this {Element}
     */
    var setDefaultText = function () {
        var text = localStorage.getStorage(this.getAttribute('data-name'));
        if (text) {
            this.innerHTML = text;
        }
    };

    /**
     *
     * @param oColor {Object} color from the model
     * @returns {string}
     */
    var getRGBColor = function (oColor) {
        //todo check integrity of values
        return 'rgb(' + Object.values(oColor).map(function (v) {
                return (v * 255) << 0
            }).join(',') + ')';
    };

    var View = Backbone.View.extend({

        initialize: function () {
            this.model.on('change:radius', this.onRadiusChange, this);
            this.model.on('change:bg-color', this.onImageChange, this);
            this.model.on('change:color', this.onColorChange, this);
            this.$el.find('.js-text-edit').on('input', this.onTextChange).each(setDefaultText);
        },

        render: function () {
            this.onRadiusChange();
        },

        onTextChange: function () {
            localStorage.setStorage(this.getAttribute('data-name'), this.innerHTML);
        },

        onRadiusChange: function () {
            this.$el.css('border-radius', this.model.get('radius'));
        },

        onImageChange: function () {
            var rgbColors = getRGBColor(this.model.get('bg-color'));
            this.$el.css('background-color', rgbColors);
        },

        onColorChange: function () {
            var rgbColors = getRGBColor(this.model.get('color'));
            //console.info(rgbColors);
            this.$el.css('color', rgbColors);
        }

    });

    // --- --- --- --- --- --- --- --- ---

    var card = new Card();
    var view = new View({model: card, el: $('.card')});

    view.render();

    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget('Group', {
        label: 'Card Appearance'
    });

    appearance.createWidget('Border radius', 'NumberedSlider', {
        model: card,
        name: 'radius'
    });
    appearance.createWidget('Background', 'Color', {
        model: card,
        name: 'bg-color',
        color: {r:.2, g: 1, b: 1}
    });
    appearance.createWidget('Color', 'Color', {
        model: card,
        name: 'color',
        color: {r:.2, g: 1, b: 0}
    });

});
