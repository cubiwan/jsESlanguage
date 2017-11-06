# jsEStemmer
Stemmer for spanish in JS

Stemmer for spanish. Not only stem words too remove stop words, group similar lemmas and filter results.

Not al code is me. Stemmer algorithm is from [Ricardo Ezequiel López](https://github.com/lopezezequiel/Stemmer_es) is an implementation in javascript of the [Porter algorithm](http://snowball.tartarus.org/algorithms/spanish/stemmer.html) for the Spanish language.

## Load

### Browser

```html
<script src="jsEStemmer.js"></script>
```
```js
var stemmer = new jsEStemmer.stemmer();
```

### Node

```js
var jsEStemmer = require("./jsEStemmer.js");
var stemmer = new jsEStemmer.stemmer();
```

## Example

```js
var stem = new jsEStemmer.stemmer();
var lemma = stem.stemWord("comeran");
console.log(lemma);
```

## Interface

```js
stemWord(word);
```
Return lemma of word

_word_: word to be stemmed

```js	
stemText(text, distanceSimilar);
```
Return array of lemmas(structure)

_text_: text to be stemmed

_distanceSimilar_: if distance between two lemmas are less than distanceSimilar both are grouped in the same lemma

```js
filterLemmas(lemmas, max, number, percentage)
```
Take and array of lemmas(structure) and return an array of lemmas(structure) filtered

_lemmas_: array of lemmas(structure)

_max_: max number of lemmas to return (if 0 or less doesn't apply)

_number_: filter lemmas which number field was less than that parameter

_percentage_: filter lemmas which percentage field was less than that parameter

```js
arrayLemmasToArrayStrings(lemmas)
```
take an array of lemmas(structure) and return an array of strings

_lemmas_: array of lemmas(structure)

```js
distance(a,b)
```  
calculate distance (0..1) between two lemmas (strings)

```js
compareArrayOfLemmas(a, b, threshold)
```  
Compare two array of lemmas.
 _a_: array of lemmas
_b_: array of lemmas
_threshold_: as max distance between lemmas
return similarity in (0..1) 1 more similar than 0

### Lemma structure

```js
function Lemma(){
  this.lemmas = []; 
  this.number = 0;
  this.percentage = 0;

  this.merge = function(lemma){...}
}
```
_lemmas_: list of strings whit similar lemmas

_number_: number of repitions on the text

_percentage_: percentage of repititions on the text

_merge(lemma)_: merge whit other lemma(structure) updating values

## Stem Process
### Stem word 

stemWord(word);

1. Clean all no-alpahnumeric characters
2. Stem

### Stem text

stemText(text, distanceSimilar);

1. Clean all no-alpahnumeric characters
2. Clean stop words
3. Divide text in words using spaces as separator
4. Stem all words
5. Group lemmas with distance smaller than parameter "distanceSimilar"

### Filter lemmas

filterLemmas(lemmas, max, number, percentage);

After stem a text you obtain a lemma for each word that isn't stopword. You need select only the most relevant lemmas.

## Dictionary

Sometimes you could prefer set your results instead of stemmer. You can add your "word" => "lemma" hashmap when initializes a stemmer

```js
var jsEStemmer = require("./jsEStemmer.js");
var dictionary = {};
dictionary["jardinero"] = "jardin";
dictionary["ajardinado"] = "jardin";

var stemmer = new jsEStemmer.stemmer(dictionary);
console.log(stemmer.stemWord("ajardinado")); //jardin (dictionary)
console.log(stemmer.stemWord("jardinero")); //jardin (dictionary)
console.log(stemmer.stemWord("jardines")); //jardin (stemmer)
console.log(stemmer.stemWord("jardineria")); //jardineri (stemmer)
```


## Demo

Test jsEStemmer in this [demo](https://cubiwan.github.io/jsESlanguage/jsEStemmer/index.html)

