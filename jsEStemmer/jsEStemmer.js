(function(exports){

exports.stemmer = function(dictionary){
  this.dictionary = dictionary;

  /*Return lemma of word
  word - word to be stemmed
  */
  this.stemWord = function(word){
    var cleanWord = cleanCharacters(word);
    if(this.dictionary){
      return stemOrDictionary(cleanWord, this.dictionary);
    } else {
      return stem(cleanWord.trim());
    }
  }

  /*Return array of lemmas(structure)
  text - text to be stemmed
  distanceSimilar - if distance between two lemmas are less than
    distanceSimilar both are grouped in the same lemma
  */
  this.stemText = function(text, distanceSimilar){
    distanceSimilar = distanceSimilar || 0;

    var cleanText = cleanCharacters(text);
    var words = tokenize(cleanText);
    words = removeStopwords(words);
    stemmedWords = [];
    var wordsLength = words.length;
    if(this.dictionary){
      for(var i = 0; i < wordsLength; ++i){
        var stemmedWord = stemOrDictionary(words[i], this.dictionary);
        stemmedWords.push(stemmedWord);
      }
    } else {
      for(var i = 0; i < wordsLength; ++i){
        var stemmedWord = stem(words[i]);
        stemmedWords.push(stemmedWord);
      }
    }
    var lemmas = groupLemmas(stemmedWords);
    if(distanceSimilar > 0)
      lemmas = groupSimilarLemmas(lemmas, distanceSimilar);
    lemmas = lemmas.sort(compare);
    return lemmas;
  }

  /*Return an array of lemmas(structure) filtered
  lemmas - array of lemmas
  max - max number of lemmas to return (if 0 or less doesn't apply)
  number - filter lemmas which number field was less than that parameter
  percentage - filter lemmas which percentage field was less than that parameter
  */
  this.filterLemmas = function(lemmas, max, number, percentage){
    var newLemmas = [];
    if(max < 1){
      max = lemmas.length;
    }
    for(var i = 0; i < max; ++i){
        if(lemmas[i].number < number){
          break;
        }
        if(lemmas[i].percentage < percentage){
          break;
        }
        newLemmas.push(lemmas[i]);
    }
    return newLemmas;
  }

  /*take an array of lemmas and return an array of strings
  lemmas array of lemmas
  */
  this.arrayLemmasToArrayStrings = function(lemmas){
    var strLemmas = [];
    var lemmasLength = lemmas.length;
    for(var i = 0; i < lemmasLength; ++i){
        strLemmas = strLemmas.concat(lemmas[i].lemmas)
    }
    return strLemmas;
  };

  /*calculate distance between two lemmas
   compare
  */
  this.distance = function(a,b){
    return distanceLemmas(a,b);
  }

  /*Compare two array of lemmas.
   a array of lemmas
   b array of lemmas
   threshold as max distance between lemmas
   return similarity in (0..1) 1 more similar than 0
  */
  this.compareArrayOfLemmas = function(a, b, threshold){
    threshold = threshold || 0;
    var similars = 0;
    for(var ia = 0; ia < a.length; ++ia){
      for(var ib = 0; ib < b.length; ++ib){
        if(areSimilarLemmas(a[ia], b[ib], threshold)){
            similars++;
            break;
        }
      }
    }
    if(similars == 0)
      return 0;
    else
      return similars*2/(a.length+b.length);
  }

  /*return true if word is a stopword*/
  this.isStopWord = function(word){
    var cleanWord = cleanCharacters(word);
    return removeStopwords([cleanWord]).length == 0;
  }  
  
  /*lemma strtucture*/
  function Lemma(){
    this.lemmas = []; //list of similar lemmas
    this.number = 0; //number of repititions on the text
    this.percentage = 0; //percentage of repititions on the text

    //merge whit other lemma(structure) updating values*/
    this.merge = function(lemma){
      this.number += lemma.number;
      this.percentage += lemma.percentage;
      this.lemmas = this.lemmas.concat(lemma.lemmas);
    }
  }

  var stopwords = ["a","acuerdo","adelante","ademas","adrede","ahi","ahora","al",
  "alli","alrededor","antano","antaño","ante","antes","apenas","aproximadamente",
  "aquel","aquella","aquellas","aquello","aquellos","aqui","arriba","abajo","asi",
  "aun","aunque","b","bajo","bastante","bien","breve","c","casi","cerca","claro",
  "como","con","conmigo","contigo","contra","cual","cuales","cuando","cuanta",
  "cuantas","cuanto","cuantos","d","de","debajo","del","delante","demasiado",
  "dentro","deprisa","desde","despacio","despues","detras","dia","dias","donde",
  "dos","durante","e","el","ella","ellas","ellos","en","encima","enfrente",
  "enseguida","entre","es","esa","esas","ese","eso","esos","esta","estado",
  "estados","estan","estar","estas","este","esto","estos","ex","excepto","f",
  "final","fue","fuera","fueron","g","general","gran","h","ha","habia","habla",
  "hablan","hace","hacia","han","hasta","hay","horas","hoy","i","incluso",
  "informo","j","junto","k","l","la","lado","las","le","lejos","lo","los","luego",
  "m","mal","mas","mayor","me","medio","mejor","menos","menudo","mi","mia","mias",
  "mientras","mio","mios","mis","mismo","mucho","muy","n","nada","nadie",
  "ninguna","no","nos","nosotras","nosotros","nuestra","nuestras","nuestro",
  "nuestros","nueva","nuevo","nunca","o","os","otra","otros","p","pais","paìs",
  "para","parte","pasado","peor","pero","poco","por","porque","pronto","proximo",
  "puede","q","qeu","que","quien","quienes","quiza","quizas","r","raras","repente",
  "s","salvo","se","segun","ser","sera","si","sido","siempre","sin","sobre",
  "solamente","solo","son","soyos","su","supuesto","sus","suya","suyas","suyo",
  "t","tal","tambien","tampoco","tarde","te","temprano","ti","tiene","todavia",
  "todo","todos","tras","tu","tus","tuya","tuyas","tuyo","tuyos","u","un","una",
  "unas","uno","unos","usted","ustedes","v","veces","vez","vosotras","vosotros",
  "vuestra","vuestras","vuestro","vuestros","w","x","y","ya","yo","z"];

  var stopwordsIndex = [0,27,32,48,65,92,97,100,112,115,117,118,127,146,161,
                        165,179,186,189,210,229,237,246,247,248,251];

  function removeStopwords(tokens){
    var cleanedTokens = [];
    var tokensLength = tokens.length;
    //it index of tokens
    for(var it = 0; it < tokensLength; ++it){
      var word = tokens[it];
      if(word == "" || word == " "){
        continue;
      }
      var swEnd = stopwordsIndex[word.charCodeAt(0)-96];
      if(!swEnd)
        swEnd = stopwords.length;

      //isw index of stopwords
      for(var isw = stopwordsIndex[word.charCodeAt(0)-97]; isw < swEnd; ++isw){
        if(word == stopwords[isw]){
          word = "";
          break;
        }
      }
      if(word != ""){
        cleanedTokens.push(word);
      }
    }
    return cleanedTokens;
  }

  var remplaceTable=[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
  " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
  " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
  " "," "," "," "," "," "," "," "," "," ","a","b","c","d","e","f","g","h","i","j",
  "k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"," "," "," "," ",
  " "," ","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r",
  "s","t","u","v","w","x","y","z"," "," "," "," "," "," "," "," "," "," "," "," ",
  " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
  " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
  " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","a"," ",
  " ","a"," "," "," "," ","e"," ","e"," ","i"," ","i"," ","ñ"," ","o"," "," ","o",
  " "," "," ","u"," ","u"," "," "," "," ","a"," "," ","a"," "," "," "," ","e"," ",
  "e"," ","i"," ","i"," ","ñ"," ","o"," "," ","o"," "," "," ","u"," ","u"," "," "];

  function cleanCharacters(text){
    var newText = "";
    var code;
    for(var i = 0; i < text.length; ++i){
      code = text.charCodeAt(i);
      if(code > 255){
        newText += " ";
      }else{
        newText += remplaceTable[text.charCodeAt(i)];
      }
    }
    return newText;
  }

  function tokenize(text){
      return text.split(" ");
  }


  //All this code comes from https://github.com/lopezezequiel/Stemmer_es
  var stem = new function() {

    /**
     * @author   Ricardo Ezequiel López
     * @contact  mail@lopezezequiel.com
     * @license  GPLv2
     *
     *
     * Stemmer_es is an implementation in javascript of the Porter algorithm
     * for the Spanish language. It is based on this article:
     * http://snowball.tartarus.org/algorithms/spanish/stemmer.html
     *
     * Stemmer_es es una implementación en javascript del algoritmo de
     * Porter para el idioma Español. Está basado en este artículo:
     * http://snowball.tartarus.org/algorithms/spanish/stemmer.html
     */


    //RegExps
    //------------------------------------------------------------------

    var r1r2_re = /^.*?[aeiouáéíóúü][^aeiouáéíóúü](.*)/;

    var rv_re = /^(.[^aeiouáéíóúü]+[aeiouáéíóúü]|[aeiouáéíóúü]{2,}[^aeiouáéíóúü]|[^aeiouáéíóúü][aeiouáéíóúü].)(.*)/;

    var step0_re = /((i[eé]ndo|[aá]ndo|[aáeéií]r|u?yendo)(sel[ao]s?|l[aeo]s?|nos|se|me))$/;

    var replace_accents = [
        [/á/g, 'a'],
        [/é/g, 'e'],
        [/í/g, 'i'],
        [/ó/g, 'o'],
        [/ú/g, 'u'],
    ];

    var step1_re = [
        [/(anzas?|ic[oa]s?|ismos?|[ai]bles?|istas?|os[oa]s?|[ai]mientos?)$/, '', 'r2'],
        [/((ic)?(adora?|ación|ador[ae]s|aciones|antes?|ancias?))$/, '', 'r2'],
        [/(logías?)$/, 'log', 'r2'],
        [/(ución|uciones)$/, 'u', 'r2'],
        [/(encias?)$/, 'ente', 'r2'],
        [/((os|ic|ad|(at)?iv)amente)$/, '', 'r2'],
        [/(amente)$/, '', 'r1'],
        [/((ante|[ai]ble)?mente)$/, '', 'r2'],
        [/((abil|ic|iv)?idad(es)?)$/, '', 'r2'],
        [/((at)?iv[ao]s?)$/, '', 'r2'],
    ];

    var step2a_re = /(y[ae]n?|yeron|yendo|y[oó]|y[ae]s|yais|yamos)$/;

    var step2b_re_1 = /(en|es|éis|emos)$/;

    var step2b_re_2 = [
        /(([aei]ría|ié(ra|se))mos)$/, //7 chars
        /(([aei]re|á[br]a|áse)mos)$/, //6 chars
        /([aei]ría[ns]|[aei]réis|ie((ra|se)[ns]|ron|ndo)|a[br]ais|aseis|íamos)$/, //5 chars
        /([aei](rá[ns]|ría)|a[bdr]as|id[ao]s|íais|([ai]m|ad)os|ie(se|ra)|[ai]ste|aban|ar[ao]n|ase[ns]|ando)$/, //4 chars
        /([aei]r[áé]|a[bdr]a|[ai]d[ao]|ía[ns]|áis|ase)$/, //3 chars
        /(í[as]|[aei]d|a[ns]|ió|[aei]r)$/, //2 chars
    ];

    var step3_re_1 = /(os|a|o|á|í|ó)$/;

    var step3_re_2 = /(u?é|u?e)$/;


    //Utils
    //------------------------------------------------------------------

    var removeAccents = function(word) {
        replace_accents.forEach(function(r) {
            word = word.replace(r[0], r[1]);
        });

        return word;
    };

    var getRegions = function(word) {
        //R1 is the region after the first non-vowel following a vowel,
        //or is the null region at the end of the word if there is no
        //such non-vowel.
        var r1 = r1r2_re.exec(word);
        r1 = r1 ? r1[1] : '';

        //R2 is the region after the first non-vowel following a vowel
        //in R1, or is the null region at the end of the word if there
        //is no such non-vowel.
        var r2 = r1r2_re.exec(r1);
        r2 = r2 ? r2[1] : '';

        //If the second letter is a consonant, RV is the region after
        //the next following vowel, or if the first two letters are
        //vowels, RV is the region after the next consonant, and
        //otherwise (consonant-vowel case) RV is the region after the
        //third letter. But RV is the end of the word if these positions
        //cannot be found.
        var rv = rv_re.exec(word);
        rv = rv ? rv[2] : '';

        return {r1: r1, r2: r2, rv: rv, word: word, };
    }


    //Steps
    //------------------------------------------------------------------

    //Attached pronoun
    var step0 = function(r) {

        //Search for the longest among the following suffixes
        //me, se, sela, selo, selas, selos, la, le, lo, las, les, los, nos
        //and delete it, if comes after one of:
        //iéndo, ándo, ár, ér, ír, ando, iendo, ar, er, ir, yendo(following u)
        var g = step0_re.exec(r.rv);

        if(g) {
            var w = r.word.substr(0, r.word.length-g[1].length);

            //In the case of (yendo following u), yendo must lie in RV,
            //but the preceding u can be outside it.
            if(g[2] == 'yendo' && w.substr(-1) != 'u') {
                return r.word;
            }

            //In the case of (iéndo   ándo   ár   ér   ír), deletion is
            //followed by removing the acute accent (for example,
            //haciéndola -> haciendo).
            return w + removeAccents(g[2]);
        }

        return r.word;
    }

    //Standard suffix removal
    var step1 = function(r) {
        var rule, match;

        for(var i=0; i<step1_re.length; i++) {
            rule = step1_re[i];
            match = rule[0].exec(r[rule[2]]);
            if(match) {
                var w = r.word.substr(0, r.word.length-match[1].length);
                return w + rule[1];
            }
        }

        //Do step 2a if no ending was removed by step 1.
        return step2a(r);
    }

    //Verb suffixes beginning y
    var step2a = function(r) {
        //Search for the longest among the following suffixes in RV,
        //and if found, delete if preceded by u.
        //ya, ye, yan, yen, yeron, yendo, yo, yó, yas, yes, yais, yamos
        var match = step2a_re.exec(r.rv);

        if(match){
            var w = r.word.substr(0, r.word.length-match[1].length);

            //Note that the preceding u need not be in RV
            if(w.substr(-1) == 'u') {
                return w;
            }
        }

        //Do Step 2b if step 2a was done, but failed to remove a suffix.
        return step2b(r);
    }

    //Other verb suffixes
    var step2b = function(r) {
        //Search for the longest among the following suffixes in RV,
        //and perform the action indicated.

        //iera, ad, ed, id, ase, iese, aste, iste, an, aban, ían, aran,
        //ieran, asen, iesen, aron, ieron, ado, ido, ando, iendo, ió, ar,
        //er, ir, as, idas, ías, aras, ieras, ases, ieses,
        //áis, abais, íais, arais, ierais,   aseis, ieseis, asteis,
        //isteis, ados, idos, amos, ábamos, íamos, imos, áramos, iéramos,
        //iésemos, ásemos
        //delete
        for(var i=0; i<step2b_re_2.length; i++) {
            var match = step2b_re_2[i].exec(r.rv);
            if(match) {
                return r.word.replace(step2b_re_2[i], '');
            }
        }

        //en, es, éis, emos
        //delete, and if preceded by gu delete the u (the gu need not be
        // in RV)
        var match = step2b_re_1.exec(r.rv);
        if(match) {
            var w = r.word.substr(0, r.word.length-match[1].length);
            if(w.substr(-2)=='gu') {
                return w.substr(0, w.length-1);
            }
            return w;
        }

        return r.word;
    }

    //residual suffix
    var step3 = function(r) {
        //Search for the longest among the following suffixes in RV, and
        //perform the action indicated.

        //os, a, o, á, í, ó
        //delete if in RV
        var match = step3_re_1.exec(r.rv);
        if(match) {
            return r.word.replace(step3_re_1, '');
        }

        //e, é
        //delete if in RV, and if preceded by gu with the u in RV delete
        //the u
        match = step3_re_2.exec(r.rv);
        if(match) {
            if(match[1].substr(0,1)=='u' && r.word.substr(-3, 2)=='gu') {
                return r.word.substr(0, r.word.length-2);
            }
            return r.word.substr(0, r.word.length-1);
        }

        return r.word;
    }

    //stem function
  return function(word) {
        //word = word.toLowerCase().trim();
        var r = getRegions(word);
        word = step0(r);
        r = getRegions(word);
        word = step1(r);
        r = getRegions(word);
        word = step3(r);
        return word;
        //return removeAccents(word);
    }

}();


  function distanceLemmas(a,b){
    var shorterLength;
    var totalLength = a.length + b.length;
    if(a.length > b.length){
      shorterLength = b.length;
    } else {
      shorterLength = a.length;
    }

    //how many chars have in common since star of string until first dirence
    var i = 0
    for(; i < shorterLength; ++i){
      if(a[i] != b[i])
        break;
    }

    if(i == 0) {
      return 1;
    } else {
      return 1-((i*2)/totalLength);
    }
  };

  function stemOrDictionary(word, dictionary){
    var wordDict = dictionary[word];
    if(wordDict) return wordDict;
    else return stem(word.trim());
  }

  function compare(a, b){
  	if(a.number > b.number){
  		return -1;
  	} else if (a.number < b.number){
  		return 1;
  	} else return 0;
  }

  function groupLemmas(words){
    var lemmas = [];
    var wordsLength = words.length;
    for(var i = 0; i < wordsLength; ++i){
      var word = words[i];
      if(word == ""){ //lemma selected in one iteration before
        continue;
      }
      var lemma = new Lemma();
      lemma.lemmas.push(word);
      lemma.number = 1;
      for(var w = i+1; w < wordsLength; ++w){
        if(words[w] == word){
          lemma.number++;
          words[w] = "";//delete lemma for next iterations
        }
      }
      lemmas.push(lemma);
    }

    for(var i = 0; i < lemmas.length; ++i){
      lemmas[i].percentage = lemmas[i].number/wordsLength;
    }
    return lemmas;
  }

  function groupSimilarLemmas(lemmas, threshold){
    var newLemmas = [];
    for(var i = 0; i < lemmas.length; ++i){
      var lemma = lemmas[i];
      if(lemma == null){
        continue;
      }
      for(var l = i+1; l < lemmas.length; ++l){
        if(lemmas[l] == null){
          continue;
        }
        if(areSimilarLemmas(lemmas[l], lemma, threshold)){
          lemma.merge(lemmas[l]);
          lemmas[l] = null;
        }
      }
    }
    for(var i = 0; i < lemmas.length; ++i){
      if(lemmas[i] == null)
        continue;
      newLemmas.push(lemmas[i]);
    }
    return newLemmas;
  }

  function areSimilarLemmas(a, b, threshold){
    for(var ia = 0; ia < a.lemmas.length; ++ia){
      for(var ib = 0; ib < b.lemmas.length; ++ib){
        if(distanceLemmas(a.lemmas[ia], b.lemmas[ib]) <= threshold){
          return true;
        }
      }
    }
    return false;
  }

}})(typeof exports === 'undefined'? this['jsEStemmer']={}: exports);
