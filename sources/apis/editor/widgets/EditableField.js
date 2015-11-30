define([
    'vendors/Backbone',
    'vendors/JQuery',
    'vendors/Underscore',
    'apis/editor/widgets/Widget'
], function (Backbone, $, _, Widget) {

    'use strict';

    return Widget.extend({

        el: ['<div class="widget editable-field-widget">',
            '   <input>',
            '   </input>',
            '</div>'
        ].join(''),

        events: _.extend( {}, Widget.prototype.events, {
            'input input': 'changeEvent'
        } ),

        initialize: function (options) {

            options = _.defaults(options || {}, {

                model: new Backbone.Model(),
                name: 'value',

                target: undefined
            }, options);

            Widget.prototype.initialize.call(this, options);

            if (this.options.name) {
                this.$('input').attr('name',this.options.name);
            }

            this.$('input').val(this.get());
        },

        changeEvent: function ( e ) {
            var value = $(e.currentTarget).val();

            this.set(value);
        }
    });
});
