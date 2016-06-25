/* global define */
define([
    'vendors/Backbone',
    'vendors/SvgColorPicker',
    'vendors/Underscore',
    'apis/editor/widgets/Widget'
], function (Backbone, SvgColorPicker, _, Widget) {
    'use strict';

    return Widget.extend({
        el: [ '<div class="widget color-widget">',
            '    <div class="widget-wrapper">',
            '        <div class="box">',
            '            <div class="picker-wrapper">',
            '                <div class="picker-padder"></div>',
            '                <div class="picker"><div class="cursor"></div></div>',
            '            </div>',
            '            <div class="slider-wrapper">',
            '                <div class="slider"><div class="cursor"></div></div>',
            '            </div>',
            '        </div>',
            '        <input class="value" size="8" />',
            '    </div>',
            '</div>'
        ].join(''),

        events: _.extend({}, Widget.prototype.events, {
            'change .value:input': 'changeEvent'
        }),

        initialize: function (options) {
            options = _.defaults(options || {}, {
                model: new Backbone.Model(),
                name: 'value'
            });

            Widget.prototype.initialize.call(this, options);

            if (typeof this.get() === 'undefined')
                this.set('#FFFFFF');

            var initial_value = this.get();

            this.colorPicker = new SvgColorPicker({
                slider: this.$('.slider')[ 0 ],
                picker: this.$('.picker')[ 0 ],

                sliderCursor: this.$('.slider > .cursor')[ 0 ],
                pickerCursor: this.$('.picker > .cursor')[ 0 ]
            }, function (hsv, rgb , hex) {
                this.change(hex);
            }.bind(this));
            this.set(initial_value);
        },

        changeEvent: function () {
            this.colorPicker.set(this.$('.value').val());
        },

        render: function () {
            var hex = this.get();
            this.colorPicker.set(hex);
            this.$('.value').val(hex);
        }
    });
});
