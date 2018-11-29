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
Indicates letters to be replace  
*letter* - Letter/letters to be replace 
*replace* - Letter that replaces 

```js
replace.addMultiples(letter, replace);
```
Indicates multiples letters to be replace replace 
*letter* - (String) Letter/letters to be replace 
*replace* - (String) Letter that replaces 
letter[i] will be replace by replace[i]

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
