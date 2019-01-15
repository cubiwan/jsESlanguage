export function jsESreplace() {
    var replaces = [];
    var defaultReplace;
    
    this.add = function(letter, replace){
        var length = letter.length;
        for(var i = 0; i < length; ++i){
            console.log(letter[i]+"->"+replace);
            replaces[letter[i]] = replace;
        }
    }
    
    this.setDefault = function(replace){
        defaultReplace = replace;
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
            var letter = str.charAt(i);
            replaceStr += replaces[letter] || defaultReplace || letter;
        }
        return replaceStr;
    }
}
