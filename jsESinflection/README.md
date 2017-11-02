# jsESinflection
Spanish inflections

## Plural - Singular

### Load

```html
<script src="jsESnumber.js" charset="UTF-8"></script>
```
```js
var number = new jsESnumber();
```

### Functions

```js
number.pluralOf(word);
```
return word in plural

```js
number.singularOf(word);
```
return word in singular

```js
number.singularOrPlural(word);
```
return: -1(singular), 1(plural), 0(both), 2(no idea)

```js
number.addException(singular, plural);
```
add a pair of words (singular, plural) to dictionary of exceptions.

## Masculine - Feminine

### Load

```html
<script src="jsESgender.js" charset="UTF-8"></script>
```
```js
var gender = new jsESgender();
```

### Functions

```js
gender.masculineOf(word);
```
return word in masculine

```js
gender.feminineOf(word);
```
return word in feminine

```js
gender.masculineOrFeminine(word);
```
return -1(masculine), 1(feminine), 0(no gender), 2(no idea)

```js
gender.addException(masculine, feminine);
```
add a pair of words (masculine, feminine) to dictionary of exceptions.

You can use *gender.addException("", "feminine")* or *gender.addException("masculine", "");* to add words wihtout masculine or feminine form.

## Augmentative

### Load

```html
<script src="jsESaugmentative.js" charset="UTF-8"></script>
```
```js
var augmentative = new jsESaugmentative();
```

### Functions

```js
augmentative.augmentativeOf(word);
```
return aumentative form (-az-) of word.

```js
augmentative.addException(normal, augmentative);
```
add a pair of words (normal, augmentative) to dictionary of exceptions.

## Diminutive

### Load

```html
<script src="jsESdiminutive.js" charset="UTF-8"></script>
```
```js
var diminutive = new jsESdiminutive();
```

### Functions

```js
diminutive.diminutiveOf(word);
```
return diminutive form (-it-) of word.


```js
diminutive.addException(normal, diminutive);
```
add a pair of words (normal, diminutive) to dictionary of exceptions.

## Despective

### Load

```html
<script src="jsESdespective.js" charset="UTF-8"></script>
```
```js
var despective = new jsESdespective();
```

### Functions

```js
despective.despectiveOf(word);
```
return despective form (-uch-) of word.


```js
diminutive.addException(normal, despective);
```
add a pair of words (normal, despective) to dictionary of exceptions.

## Demo

Test in this [demo](https://cubiwan.github.io/jsESinflection/index.html)
