define([

    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',

    'apis/editor/widgets/Vertical'

], function(Backbone, $, _, VerticalWidget) {

    'use strict';

    return VerticalWidget.extend({

        el: ['<div class="widget text-input-widget">',
            '          <div class="widget-wrapper">',
            '               <input class="value text" />',
            '          </div>',
            '      </div>'
        ].join(''),

        events: _.extend({}, VerticalWidget.prototype.events, {
            'keyup .value:input': 'onTextChange'
        }),

        initialize: function(options) {

            options = _.defaults(options || {}, {

                model: new Backbone.Model(),
                name: 'value',
                placeholder: '',
                value: 'blablabla...'

            });

            if(options.placeholder)
                this.$('.value').attr('placeholder', options.placeholder);

            VerticalWidget.prototype.initialize.call(this, options);

        },

        escapeHtml: function(text) {
            return text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        },

        onTextChange: function(e) {
            this.change(this.escapeHtml(e.target.value.trim()));
        },

    });

});
