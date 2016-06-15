# toggler

## Usage 

* **Import script** `<script src="js/toggler.js"></script>`
* **Call function `togglers`** when document is ready
```javascript
$(document).ready(function () {
    togglers.init();
});
```
* Mark your **html buttons** with class `JS_toggler`, a unique id string or number `data-toggler-id="1"` and **name a group** for them `data-toggler-group="tab-item"`. Only one or many.
```html
<ul>
    <li><a data-toggler-id="1" data-toggler-group="tab-item" class="JS_toggler active">btn 1</a></li>
    <li><a data-toggler-id="2" data-toggler-group="tab-item" class="JS_toggler">btn 2</a></li>
    <li><a data-toggler-id="3" data-toggler-group="tab-item" class="JS_toggler">btn 3</a></li>
    <li><a data-toggler-id="4" data-toggler-group="tab-item" class="JS_toggler">btn 4</a></li>
    <li><a data-toggler-id="5" data-toggler-group="tab-item" class="JS_toggler">btn 5</a></li>
</ul>
```
* These buttons are linked to your **content divs** with attribute `data-toggler-itemid="1"`. One content div or many. 
```html
<div data-toggler-itemid="1" data-toggler-group="tab-item" class="JS_item_toggler active">
    tab content 1
</div>
<div data-toggler-itemid="2" data-toggler-group="tab-item" class="JS_item_toggler">
    tab content 2
</div>
...
```
* **Use your own css** to style `.active` elements !

## Todo

* Documentation
  * events

* Examples :
  * layers
