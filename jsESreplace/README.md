# jsESreplace
Replace all letters in one iteration

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
*letter* - Letter/letters to be replace 
*replace* - Letter that replaces 
return array of syllables (string)

```js
replace.replace(text);
```
Replace all letter in the text  
*text* - string 
return a new text with all letters replace

```js
replace.setDefault(replace);
```
Set value to replace for any character whithout replacement defined
*replace* - string that replaces character

## Demo

Test in this [demo](https://cubiwan.github.io//jsESlanguage/jsESreplace/index.html)
