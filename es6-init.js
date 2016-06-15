"use strict";

import toggler from './toggler-es6';
toggler();
document.querySelector('.js-toggler-content').addEventListener('open.content', function (e) {
    console.info(e.type);
});
document.querySelector('.js-toggler-content').addEventListener('close.content', function (e) {
    console.info(e.type);
});