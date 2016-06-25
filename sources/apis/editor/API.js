/* global define */
define([
    'vendors/Underscore',
    'apis/editor/defaultWidgets'
], function (_, defaultWidgets) {
    'use strict';

    return {
        start: function (environment, options) {
            var widget = defaultWidgets.Vertical.reify(null, _.extend( {
                environment: _.extend({}, environment, {
                    popupStack: []
                })
            }, options));

            if (environment.rootContainer)
                widget.$el.appendTo(environment.rootContainer);

            return widget;
        }
    };
});
