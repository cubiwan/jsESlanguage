function jsESWords(letters){
    letters = letters || "[a-zA-ZñÑüáéíóúÜÁÉÍÓÚ1234567890]+";
    var regExp = RegExp(letters, "g");
    
    this.length = function(text){
        return text.trimEnd().length;
    }

    this.spaces = function(text){
        var spaces = text.trimEnd().match(/\s/g);
        if(spaces){
            return spaces.length;
        } else {
            return 0;
        }
    }

    this.words = function(text){        
        var words = [];
        while ((word = regExp.exec(text)) !== null) {
            words.push(word[0])
        }
        return words;
    }

    this.sort = function(words){
        return words.sort(function(a,b){
            return a.localeCompare(b, "es");
        })        
    }

    this.unique = function(words){
        var uniqueWord = {};
        for(var i = 0; i < words.length; i++){
            uniqueWord[words[i]] = words[i];            
        }
        return Object.values(uniqueWord);
    }

    this.histogram = function(words){
        var histogramWords = {};
        for(var i = 0; i < words.length; i++){
            if(histogramWords[words[i]]){
                histogramWords[words[i]] += 1;
            } else {
                histogramWords[words[i]] = 1;
            }
        }
        return histogramWords;
    }
}
