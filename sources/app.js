/* global define */

define([
    'vendors/Backbone',
    'vendors/JQuery',
    'editor'
], function (Backbone, $, editor) {
    var input_fields = [
        { id: 'full_name', label: 'Full name', initial: 'Your name here...' },
        { id: 'job', label: 'Job', initial: 'Your job here...' }
    ];
    var css_fields = [
        { id: 'border-radius', label: 'Border radius', initial: '10', suffix: 'px', widget: 'NumberedSlider' },
        { id: 'color', label: 'Font color', initial: '#FFFFFF', suffix: '', widget: 'Color' }
    ];
    var card_default = {};
    for (var i = 0; i < input_fields.length; i++) {
        var field = input_fields[i];
        card_default[field.id] = field.initial;
    }
    for (var i = 0; i < css_fields.length; i++) {
        var field = css_fields[i];
        card_default[field.id] = field.initial;
    }
    var Card = Backbone.Model.extend({
        defaults : card_default
    });

    var _get_field_changed = function (event) {
        var field_name = null;
        for (var key in event.changed) {
            field_name = key;
            break;
        }
        return field_name;
    };

    var View = Backbone.View.extend({
        initialize: function () {
            // ---------------- Css -----------------
            for (var i = 0; i < css_fields.length; i++) {
                var field = css_fields[i];
                this.model.on('change:' + field.id, this.onCssChange, this);
            }
            // ---------------- Content -----------------
            for (var i = 0; i < input_fields.length; i++) {
                var field = input_fields[i];
                this.$el.append('<p id="' + field.id +  '">' + field.initial + '</p>');
                this.model.on('change:' + field.id, this.onInputChange, this);
            }
        },
        render: function () {
            for (var i = 0; i < css_fields.length; i++) {
                var field = css_fields[i];
                this.$el.css(field.id, field.initial + field.suffix);
            }
        },
        onCssChange: function (event) {
            var field_name = _get_field_changed(event);
            if (field_name) {
                this.$el.css(field_name, this.model.get(field_name));
            }
        },
        onInputChange: function (event) {
            var field_name = _get_field_changed(event);
            if (field_name)
                $('#' + field_name, this.$el).text(this.model.get(field_name));
        }
    });

    // --- --- --- --- --- --- --- --- ---

    var card = new Card();
    var view = new View({ model: card, el: $('#v_card') });

    view.render();

    // --- --- --- --- --- --- --- --- ---

    var appearance = editor.createWidget('Group', {
        label: 'Card Appearance'
    });
    for (var i = 0; i < css_fields.length; i++) {
        var field = css_fields[i];
        appearance.createWidget(field.label, field.widget, {
            model: card,
            name: field.id
        });
    }
    var content = editor.createWidget('Group', {
        label: 'Card Content'
    });
    for (var i = 0; i < input_fields.length; i++) {
        var field = input_fields[i];
        content.createWidget(field.label, 'Input', {
            model: card,
            name: field.id
        });
    }
});
