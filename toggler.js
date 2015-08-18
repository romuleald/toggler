/**
 * Created by stecov on 26/01/2015.
 * @version 1.0
 */

var togglers = (function () {
    var $allLinksToggler;
    var selector = function (e) {

        var $linkToggler = $(this);
        var $allContents = $('.JS_item_toggler');
        var $linksTogglerGroup;

        var action = e.type;
        var toggle = /click|toggle/.test(action);
        var opening = action === 'open' || $linkToggler.data('toggler-action') === 'open';
        var closing = action === 'close' || $linkToggler.data('toggler-action') === 'close';

        var group = $linkToggler.data('toggler-group');
        var toggler_id = $linkToggler.data('toggler-id');
        var $content = $allContents.filter('[data-toggler-itemid=' + toggler_id + '][data-toggler-group=' + group + ']');
        var $contentGroup = closing ? $content : $allContents.filter('[data-toggler-group=' + group + ']');
        var isActive = opening ? !opening : closing ? closing : $content.hasClass('active');

        // Add remove classes
        if (toggle || opening || closing) {
            $linksTogglerGroup = $allLinksToggler.filter('[data-toggler-group=' + group + ']');
            $linksTogglerGroup.removeClass('active');
            $contentGroup.filter('.active').removeClass('active').trigger('close');
        }
        if (!isActive) {
            $linksTogglerGroup = $allLinksToggler.filter('[data-toggler-id=' + toggler_id + '][data-toggler-group=' + group + ']');
            $linksTogglerGroup.addClass('active');
            $content.addClass('active').trigger('open');
        }
    };

    var init = function () {
        $allLinksToggler = $('.JS_toggler');
        $allLinksToggler.on('click open close toggle', selector);
    };


    return {
        init: init
    }

})();
