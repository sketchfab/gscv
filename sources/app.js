/*global define*/

define([

    'vendors/Backbone',
    'vendors/JQuery',

    'editor'

], function (Backbone, $, editor) {

    var Card = Backbone.Model.extend({
        defaults: {
            radius: localStorage.getItem('radius') * 1 || 10,
            bgcolor: JSON.parse(localStorage.getItem('background-color')) || {r: 0, g: 0, b: 1}, // default color not working yet !
            textcolor: JSON.parse(localStorage.getItem('text-color')) || {r: 0, g: 1, b: 1}
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
            this.model.on('change:textcolor', this.onTextColorChange, this);
            this.model.on('change:toggleback', this.onToggleBack, this);
            this.model.on('change:bgcolor', this.onBgColorChange, this);
        },

        render: function () {
            this.onRadiusChange();
            //this.onTextColorChange();
            //this.onBgColorChange();
        },

        onRadiusChange: function () {
            var radius = this.model.get('radius');
            this.$el.find('.front, .back').css('border-radius', radius);
            localStorage.setItem('radius', radius)
        },

        onToggleBack: function () {
            this.$el.toggleClass('hover');
        },

        onTextChange: function () {
            localStorage.setItem(this.getAttribute('class'), this.innerHTML);
        },

        onTextColorChange: function () {
            var color = this.model.get('textcolor');
            localStorage.setItem('text-color', JSON.stringify(color));
            var rgb = Object.values(color).map(function (color) {
                return Math.floor(color * 255);
            }).join(',');
            this.$el.find('.front').css('color', 'rgb(' + rgb + ')');
        },

        onBgColorChange: function () {
            var color = this.model.get('bgcolor');
            localStorage.setItem('background-color', JSON.stringify(color));
            var rgb = Object.values(color).map(function (color) {
                return Math.floor(color * 255);
            }).join(',');
            this.$el.find('.front').css('background-color', 'rgb(' + rgb + ')');
        }

    });

    // --- --- --- --- --- --- --- --- ---

    var card = new Card();
    var view = new View({model: card, el: $('.card')});

    view.render();

    // --- --- --- --- --- --- --- --- ---


    editor.createWidget('Group', {
        label: 'Corners'
    }).createWidget('', 'NumberedSlider', {
        model: card,
        name: 'radius'
    });

    editor.createWidget('Group', {
        label: 'Front Text Color',
        opened : false
    }).createWidget('', 'Color', {
        model: card,
        name: 'textcolor'
    });

    editor.createWidget('Group', {
        label: 'Front Background Color',
        opened : false
    }).createWidget('', 'Color', {
        model: card,
        name: 'bgcolor'
    });

    editor.createWidget('Group', {
        label: 'back',
        opened : false
    }).createWidget('', 'ToggleSwitch', {
        model: card,
        label:'flip card',
        name: 'toggleback'
    });

});
