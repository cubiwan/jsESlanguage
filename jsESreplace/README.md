# jsESreplace
Replace letters

## Load

```html
<script src="jsESreplace.js" charset="UTF-8"></script>
```
```js
var replace = new jsESreplace();
```

## Functions

```js
replace.add(letter, replace);
```
Indicates who letters are replace  
*letter* - Letter to be replace 
*replace* - Letter that replaces 
return array of syllables (string)

```js
replace.replace(text);
```
Replace all letter in the text  
*text* - string 
return a new text with all letters replace

## Demo

Test in this [demo](https://cubiwan.github.io//jsESlanguage/jsESreplace/index.html)
