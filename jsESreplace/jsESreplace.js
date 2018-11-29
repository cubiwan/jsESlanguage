function jsESreplace() {
    var replaces = [];
    var defaultReplace;
    
    this.add = function(letter, replace){
        var length = letter.length;
        for(var i = 0; i < length; ++i){
            replaces[letter[i]] = replace;
        }
    }
    
     this.setDefault = function(replace){
        defaultReplace = replace;
    }

    function replaceLetter(letter){
       var result = replaces[letter];
       if(result != undefined){
         return result;
       }else{
           if(defaultReplace != undefined){
               return defaultReplace;
           } else {
               return letter;
           }
       }
    }
    
    this.addMultiples = function(letter, replace){
        var length = letter.length;
        if(length != replace.length){
            return false;
        }
        for(var i = 0; i < length; ++i){
            replaces[letter[i]] = replace[i];
        }
    }

    this.replace = function(str){
        var length = str.length;
        var replaceStr = "";
        for (var i = 0; i < length; ++i) {
            replaceStr += replaceLetter(str.charAt(i));
        }
        return replaceStr;
    }

}
