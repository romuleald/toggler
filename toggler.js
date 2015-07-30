/**
 * Created by stecov on 26/01/2015.
 * @version 1.0
 */

var $allLinksToggler;
var selector = function (e) {
    if (pm.debug) {
        console.log('utils:accordion:click');
    }

    var action = e.type;
    var toggle = /click|toggle/.test(action);
    var opening = action === 'open';
    var closing = action === 'close';

    var $linkToggler = $(this);
    var group = $linkToggler.data('accordion-group');
    var toggler_id = $linkToggler.data('accordion-id');
    var $content = $('.JS_item_accordion').filter('[data-accordion-itemid=' + toggler_id + '][data-accordion-group=' + group + ']');
    var $linksTogglerGroup = $allLinksToggler.filter('[data-accordion-itemid=' + toggler_id + '][data-accordion-group=' + group + ']');
    var $contentGroup = $('[data-accordion-group=' + group + ']');

    var isActive = opening ? !opening : closing ? closing : $content.hasClass('active');

    // Add remove classes
    if (toggle || opening || closing) {
        $linksTogglerGroup.removeClass('active');
        $contentGroup.filter('.active').removeClass('active').trigger('close');
    }
    if (!isActive) {
        $linksTogglerGroup.addClass('active');
        $content.addClass('active').trigger('open');
    }
};

var accordion = function () {
    if (pm.debug) {
        console.log('utils:accordion');
    }
    $allLinksToggler = $('.JS_toggler');
    $allLinksToggler.on('click open close toggle', selector);
};

export default accordion;