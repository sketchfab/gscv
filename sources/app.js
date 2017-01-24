/*global define*/

define([

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function (Backbone, $, editor) {

    var Card = Backbone.Model.extend({

        defaults: {
            radius: 10,
            color: "rgb(255,255,255)"
        }

    });

    var View = Backbone.View.extend({

        initialize: function () {
            this.model.on('change:radius', this.onRadiusChange, this);
            this.model.on('change:color', this.onColorChange, this);
        },

        render: function () {
            this.onRadiusChange();
            this.onColorChange();
        },

        onRadiusChange: function () {
            this.$el.css('border-radius', this.model.get('radius'));
        },

        onColorChange: function () {
            var color = this.model.get('color');
            var rgb = Object.values(color).map(function (color) {
                return Math.floor(color * 255);
            }).join(',');
            this.$el.css('color', 'rgb(' + rgb + ')');
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

    appearance.createWidget('Text color', 'Color', {
        model: card,
        name: 'color'
    });

});
