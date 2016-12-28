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
            this.model.on('change:bg-color', this.onBgColorChange, this);
            this.model.on('change:text-color', this.onTextColorChange, this);
            this.model.on('change:back-img', this.onBackImageChange, this);
            this.$el.find('.js-text-edit').on('input', this.onTextChange).each(setDefaultText);
        },

        render: function () {
            this.onBackImageChange();
        },

        onTextChange: function () {
            localStorage.setStorage(this.getAttribute('data-name'), this.innerHTML);
        },

        onBgColorChange: function () {
            var rgbColors = getRGBColor(this.model.get('bg-color'));
            localStorage.setStorage('bg-color', this.model.get('bg-color'));
            this.$el.find('.front').css('background-color', rgbColors);
        },

        onTextColorChange: function () {
            var rgbColors = getRGBColor(this.model.get('text-color'));
            localStorage.setStorage('text-color', this.model.get('text-color'));
            this.$el.find('.front').css('color', rgbColors);
        },

        onBackImageChange: function () {
            var image = this.model.get('back-img') || localStorage.getStorage('back-img');
            localStorage.setStorage('back-img', image);
            this.$el.find('.card-model.back').css('background-image', 'url(' + image + ')');
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

    appearance.createWidget('Background', 'Color', {
        model: card,
        name: 'bg-color',
        color: localStorage.getStorage('bg-color') || {
            r: 0.1435441674361342,
            g: 0.3991228070175439,
            b: 0.3991228070175439
        }
    });
    appearance.createWidget('Color', 'Color', {
        model: card,
        name: 'text-color',
        color: localStorage.getStorage('text-color') || {
            r: 0.5152354570637121,
            g: 0.7894736842105263,
            b: 0.4466759002770083
        }
    });
    appearance.createWidget('Back Image', 'Select', {
        model: card,
        name: 'back-img',
        options: {
            'http://stockcg.com/wp-content/uploads/2014/05/05743512-photo-sketchfab-logo.jpg': 'sketchfabulous',
            'https://secure.static.tumblr.com/dda01c20ab0c80c39f70b0602eabf8c4/umfpebc/Qbhns3khm/tumblr_static_tumblr_static_d0214hjyh6o04o0cgco8g8cw4_640.jpg': 'toni'
        }
    });

});
