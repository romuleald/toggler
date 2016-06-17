/**
 * Created by stecov on 26/01/2015.
 * @version 1.0
 *
 * trigger:
 * <li class="JS_toggler" data-toggler-group="group" data-toggler-id="id">
 * available options:
 * data-toggler-action="open|close|close-all"
 *
 * receiver:
 * <div class="JS_item_toggler" data-toggler-group="group" data-toggler-itemid="id">
 * available options:
 * data-toggler-group-no-close="true"
 *
 */

"use strict";
var addClass = function (className, o) {
    o.classList.add(className);
};
var removeClass = function (className, o) {
    o.classList.remove(className);
};
var hasClass = function (className, o) {
    let reg = new RegExp(className);
    return reg.test(o.className);
};
var filterGroupAndId = function (togglerId, groupName, o) {
    return o.getAttribute('data-toggler-id') == togglerId
        && o.getAttribute('data-toggler-group') == groupName;
};
var filterGroup = function (groupName, o) {
    return o.getAttribute('data-toggler-group') == groupName;
};
var filterNoClose = function (o) {
    return o.getAttribute('data-toggler-group-no-close') == 'true';
};
var fireEvent = function (o, type) {
    var e = new Event(type);
    o.dispatchEvent(e);
};
var toggler = function (classTrigger = 'js-toggler-trigger', classContent = 'js-toggler-content') {
    var selector = function (e) {

        e.stopImmediatePropagation();//todo check how to improve this quick fix
        let DOMallLinksToggler = document.querySelectorAll('.' + classTrigger);
        let DOMlinkToggler = this;
        let action = e.type;
        let dataAction = DOMlinkToggler.getAttribute('data-toggler-action');
        let toggle = /click|toggle/.test(action);
        let opening = action === 'open' || dataAction === 'open';
        let closing = action === 'close' || dataAction === 'close';
        let closeAll = action === 'close-all' || dataAction === 'close-all';

        let DOMallContents = document.querySelectorAll('.' + classContent);
        let groupName = DOMlinkToggler.getAttribute('data-toggler-group');
        let togglerId = DOMlinkToggler.getAttribute('data-toggler-id');
        let DOMFilterContents = [].filter.call(DOMallContents, filterGroupAndId.bind(arguments, togglerId, groupName));
        let DOMFilterContentsAllGroup = [].filter.call(DOMallContents, filterGroup.bind(arguments, groupName));
        let hasNoClose = [].filter.call(DOMallContents, filterNoClose).length;

        var DOMcontentGroup = closing ? DOMFilterContents : DOMFilterContentsAllGroup;

        var isActive = opening ? !opening : closing ? closing : DOMFilterContents.forEach(hasClass.bind(arguments, 'active'));

        // Add remove classes
        if (hasNoClose && !((toggle || opening || closing) && !isActive)) {
            return;
        }

        var DOMlinksTogglerGroup;
        if (toggle || opening || closing || closeAll) {
            let DOMlinksTogglerGroup = [].filter.call(DOMallLinksToggler, filterGroup.bind(arguments, groupName));
            DOMlinksTogglerGroup.forEach(removeClass.bind(arguments, 'active'));
            DOMcontentGroup.forEach(function (o) {
                var _hasClass = hasClass('active', o);
                removeClass('active', o);
                _hasClass && fireEvent(o, 'close.content');
            });
        }

        //
        if (!isActive && !closeAll && !closing) {
            DOMlinksTogglerGroup = [].filter.call(DOMallLinksToggler, filterGroupAndId.bind(arguments, togglerId, groupName));
            DOMlinksTogglerGroup.forEach(addClass.bind(arguments, 'active'));
            DOMFilterContents.forEach(function (o) {
                var _hasClass = hasClass('active', o);
                addClass('active', o);
                !_hasClass && fireEvent(o, 'open.content');
            });
        }
        if (this.tagName === "A") {
            e.preventDefault();
        }
    };

    //init by adding the global event
    var delegate = function (e) {
        //console.info(e);
        for (var target = e.target; target && target != this; target = target.parentNode) {
            // loop parent nodes from the target to the delegation node
            var regExp = new RegExp(classTrigger);
            if (regExp.test(target.className)) {
                selector.call(target, e);
                break;
            }
        }
    };

    if (typeof jQuery === 'object') {
        (function ($) {
            $.fn.extend({
                trigger: function (type, data) {
                    return this.each(function () {
                        if (typeof type == 'string' && /^toggle\./.test('toggle.')) {
                            var evt = document.createEvent('Event');
                            evt.initEvent(type, true, true);
                            if (data) {
                                evt.data = data;
                            }
                            this.dispatchEvent(evt);
                        } else {
                            jQuery.event.trigger(type, data, this)
                        }
                    });
                }
            });
        })(jQuery);
    }


    document.addEventListener('click', delegate);
    document.addEventListener('toggle.open', delegate);
    document.addEventListener('toggle.close', delegate);
    document.addEventListener('toggle.toggle', delegate);
    console.info('load');
};

export default toggler;