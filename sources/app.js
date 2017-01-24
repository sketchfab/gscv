/*global define*/

define([

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function (Backbone, $, editor) {

    var Card = Backbone.Model.extend({
        defaults: {
            radius: localStorage.getItem('radius') * 1 || 10,
            color: JSON.parse(localStorage.getItem('color')) // sorry, default color is not working :(
        }
    });

    var View = Backbone.View.extend({

        initialize: function () {
            this.$el.find('[contenteditable=true]').on('input', this.onTextChange);
            this.$el.find('[contenteditable=true]').each(function () {
                var def_text = localStorage.getItem(this.getAttribute('class'));
                if (def_text) {
                    this.innerHTML = def_text;
                }
            });
            this.model.on('change:radius', this.onRadiusChange, this);
            this.model.on('change:color', this.onColorChange, this);
        },

        render: function () {
            this.onRadiusChange();
            this.onColorChange();
        },

        onRadiusChange: function () {
            var radius = this.model.get('radius');
            this.$el.css('border-radius', radius);
            localStorage.setItem('radius', radius)
        },

        onTextChange: function () {
            localStorage.setItem(this.getAttribute('class'), this.innerHTML);
        },

        onColorChange: function () {
            var color = this.model.get('color');
            localStorage.setItem('color', JSON.stringify(color));
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
