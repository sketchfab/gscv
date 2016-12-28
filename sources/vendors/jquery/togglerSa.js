/**
 * Created by stefan cova & antoine sanchez on 26/01/2015.
 * @version 1.1
 *
 * trigger:
 * <li class="js-toggler" data-toggler-group="group" data-toggler-id="id">
 * available options:
 * data-toggler-action="open|close|close-all"
 *
 * receiver:
 * <div class="js-item-toggler" data-toggler-group="group" data-toggler-itemid="id">
 * available options:
 * data-toggler-group-no-close="true"
 *
 */
var jsToggler = (function () {
    /**
     *
     * @type {string}
     * @private
     */
    var _cssSelector = '';
    /**
     *
     * @type {string}
     * @private
     */
    var _activeClass = '';
    /**
     *
     * @type {string}
     * @private
     */
    var _currentTriggerClass = '';
    /**
     *
     * @type {string}
     * @private
     */
    var _cssSelectorContent = '';

    var selector = function (e) {
        e.stopImmediatePropagation();//todo check how to improve this quick fix
        var $allLinksToggler = $(_cssSelector);
        var $linkToggler = $(this);
        var action = e.type;
        var toggle = /click|toggle/.test(action);
        var opening = action === 'open' || $linkToggler.data('toggler-action') === 'open';
        var closing = action === 'close' || $linkToggler.data('toggler-action') === 'close';
        var closeAll = action === 'close-all' || $linkToggler.data('toggler-action') === 'close-all';

        var $allContents = $(_cssSelectorContent);
        var group = $linkToggler.data('toggler-group');
        var toggler_id = $linkToggler.data('toggler-id');
        var $content = $allContents.filter('[data-toggler-itemid=' + toggler_id + '][data-toggler-group=' + group + ']');
        var $contentGroup = closing ? $content : $allContents.filter('[data-toggler-group=' + group + ']');

        var isActive = opening ? !opening : closing ? closing : $content.hasClass(_activeClass);

        // Add remove classes
        if ($content.data('toggler-group-no-close') && !((toggle || opening || closing) && !isActive)) {
            return;
        }
        if (toggle || opening || closing || closeAll) {
            var $linksTogglerGroup = $allLinksToggler.filter('[data-toggler-group=' + group + ']');
            $linksTogglerGroup.removeClass(_activeClass + ' ' + _currentTriggerClass);
            $contentGroup.filter('.' + _activeClass).removeClass(_activeClass).trigger('close.content');
        }
        if (!isActive && !closeAll && !closing) {
            var $linksTogglerGroup = $allLinksToggler.filter('[data-toggler-id=' + toggler_id + '][data-toggler-group=' + group + ']');
            $linksTogglerGroup.addClass(_activeClass);
            $linkToggler.addClass(_currentTriggerClass);
            $content.addClass(_activeClass).trigger('open.content');
        }
        if (this.tagName === "A") {
            e.preventDefault();
        }
    };
    /**
     *
     * @param cssSelector
     * @param cssSelectorContent
     * @param activeClass
     * @param events
     * @param currentTriggerClass
     */
    return function (cssSelector, cssSelectorContent, activeClass, events, currentTriggerClass) {
        cssSelector = cssSelector || '.js-toggler';
        cssSelectorContent = cssSelectorContent || '.js-item-toggler';
        activeClass = activeClass || 'active';
        events = events || '';
        currentTriggerClass = currentTriggerClass || 'current-trigger';

        console.info('mdrlol');
        events = events ? ' ' + events : '';
        _cssSelector = cssSelector;
        _cssSelectorContent = cssSelectorContent;
        _activeClass = activeClass;
        _currentTriggerClass = currentTriggerClass;
        $('body').on('click open close toggle' + events, cssSelector, selector);
    };
})();

