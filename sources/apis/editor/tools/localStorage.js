define([], function () {

    'use strict';

    /**
     *
     * @param elemId {String}
     * @param content {String}
     */
    var setStorage = function (elemId, content) {
        localStorage.setItem(elemId, content);
    };

    /**
     *
     * @param elemId {String}
     */
    var getStorage = function (elemId) {
        return localStorage.getItem(elemId);
    };

    return {
        setStorage: setStorage,
        getStorage: getStorage
    }


});
