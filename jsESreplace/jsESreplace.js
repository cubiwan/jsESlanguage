function jsESreplace() {
    var replaces = [];
    this.defaultLetter = null;
    
    this.add = function(letter, replace){
        replaces[letter] = replace;
    }

    function replaceLetter(letter){
       var result = replaces[letter];
       if(result){
         return result;
       }else{
           if(this.defaultLetter){
               return this.defaultLetter;
           } else {
               return letter;
           }
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
