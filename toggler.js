var togglers = (function () {
    var $allLinksToggler;
    var selector = function (e) {

        e.stopImmediatePropagation();//todo check how to improve this quick fix
        var $allLinksToggler = $('.JS_toggler');
        var $linkToggler = $(this);
        var action = e.type;
        var toggle = /click|toggle/.test(action);
        var opening = action === 'open' || $linkToggler.data('toggler-action') === 'open';
        var closing = action === 'close' || $linkToggler.data('toggler-action') === 'close';
        var closeAll = action === 'close-all' || $linkToggler.data('toggler-action') === 'close-all';

        var $allContents = $('.JS_item_toggler');
        var group = $linkToggler.data('toggler-group');
        var toggler_id = $linkToggler.data('toggler-id');
        var $content = $allContents.filter('[data-toggler-itemid=' + toggler_id + '][data-toggler-group=' + group + ']');
        var $contentGroup = closing ? $content : $allContents.filter('[data-toggler-group=' + group + ']');

        var isActive = opening ? !opening : closing ? closing : $content.hasClass('active');

        // Add remove classes
        if ($content.data('toggler-group-no-close') && !((toggle || opening || closing) && !isActive)) {
            return;
        }
        var $linksTogglerGroup;
        if (toggle || opening || closing || closeAll) {
            $linksTogglerGroup = $allLinksToggler.filter('[data-toggler-group=' + group + ']');
            $linksTogglerGroup.removeClass('active');
            $contentGroup.filter('.active').removeClass('active').trigger('close.content');
        }
        if (!isActive && !closeAll) {
            $linksTogglerGroup = $allLinksToggler.filter('[data-toggler-id=' + toggler_id + '][data-toggler-group=' + group + ']');
            $linksTogglerGroup.addClass('active');
            $content.addClass('active').trigger('open.content');
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
