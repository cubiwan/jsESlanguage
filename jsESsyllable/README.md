# jsESsyllable
Spanish syllables division

## Load

```html
<script src="jsESsyllable.js" charset="UTF-8"></script>
```
```js
var syllable = new jsESsyllable();
```

## Functions

```js
syllable.divide(word);
```
Divide a word in syllables  
*word* - Word to divide (string)  
return array of syllables (string)

```js
syllable.stress(word);
```
Calculate position of stress syllable  
*syllables* - array of syllables (string)  
return the position of stress syllable

## Demo

Test in this [demo](https://cubiwan.github.io//jsESlanguage/jsESsyllable/index.html)
