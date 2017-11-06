var jsEStemmer = require("./jsEStemmer.js");
var stem = new jsEStemmer.stemmer();
var lemma = stem.stemWord("comeran");
console.log(lemma);
