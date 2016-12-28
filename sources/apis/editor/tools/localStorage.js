define([], function () {

    'use strict';

    /**
     *
     * @param elemId {String}
     * @param content {String}
     */
    var setStorage = function (elemId, content) {
        localStorage.setItem(elemId, JSON.stringify(content));
    };

    /**
     *
     * @param elemId {String}
     */
    var getStorage = function (elemId) {
        try {
            return JSON.parse(localStorage.getItem(elemId))
        }
        catch (e) {
            return localStorage.getItem(elemId)
        }
    };

    return {
        setStorage: setStorage,
        getStorage: getStorage
    }


});
