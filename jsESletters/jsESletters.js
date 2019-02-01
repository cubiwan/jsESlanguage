var lettersFrequency = [];
lettersFrequency[0] = {char: "A", prob: 12.5}
lettersFrequency[1] = {char: "B", prob: 1.4};
lettersFrequency[2] = {char: "C", prob: 4.6};
lettersFrequency[3] = {char: "D", prob: 5.8};
lettersFrequency[4] = {char: "E", prob: 13.6};
lettersFrequency[5] = {char: "F", prob: 0.6};
lettersFrequency[6] = {char: "G", prob: 1.0};
lettersFrequency[7] = {char: "H", prob: 0.7};
lettersFrequency[8] = {char: "I", prob: 6.2};
lettersFrequency[9] = {char: "J", prob: 0.4};
lettersFrequency[10] = {char: "K", prob: 0.0};
lettersFrequency[11] = {char: "L", prob: 4.9};
lettersFrequency[12] = {char: "M", prob: 3.1};
lettersFrequency[13] = {char: "N", prob: 6.7};
lettersFrequency[14] = {char: "Ñ", prob: 0.3};
lettersFrequency[15] = {char: "O", prob: 8.6};
lettersFrequency[16] = {char: "P", prob: 2.5};
lettersFrequency[17] = {char: "Q", prob: 0.8};
lettersFrequency[18] = {char: "R", prob: 6.8};
lettersFrequency[19] = {char: "S", prob: 8.0};
lettersFrequency[20] = {char: "T", prob: 4.6};
lettersFrequency[21] = {char: "U", prob: 3.9};
lettersFrequency[22] = {char: "V", prob: 0.9};
lettersFrequency[23] = {char: "W", prob: 0.0};
lettersFrequency[24] = {char: "X", prob: 0.2};
lettersFrequency[25] = {char: "Y", prob: 0.9};
lettersFrequency[26] = {char: "Z", prob: 0.52};

export function randomLetterFrec(){
    var f = 0;
    var rand = Math.random()*100;
    for(var i = 0; i < letter.length; ++i){
        f += lettersFrequency[i].prob;
        if(f > rand){
            return lettersFrequency[i].char;
        }
    }
    return "Z";
}

export function getLettersFrequency(){
    return lettersFrequency.slice(0);
}

export function randomLetter(letters){
    letters = letters || 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';    
    return letters[Math.floor(Math.random()*items.length)];
}

export function cleanLetters(text){
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

export function isNumber(c){
    c = c + "";
    if(c.length > 1){
        return false;
    }
    return !isNaN(c*1)
}

export function isUpperCase(c){
    c = c + "";
    if(c.length > 1){
        return false;
    }
    return c != c.toLowerCase()
}

export function isLowerCase(c){
    c = c + "";
    if(c.length > 1){
        return false;
    }
    return c != c.toUpperCase()
}

export function isLetter(c){
    if(c.length > 1){    
        return false;
    }
    return c.toLowerCase() != c.toUpperCase();
}

export function isLetterOrNumber(c){
    if(isLetter(c)){
        return true;
    } else if(isNumber(c)){
        return true;
    } else {
        return false;
    }
}

export const LETTERS = {   
    'capitalLetters': 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZAÜÁÉÍÓÚ',
    'smallLetters': 'abcdefghijklmnñopqrstuvwxyzüáéíóú',
    'letters': this.capitalLetters+this.smallLetters,
    'numbers': '0123456789',
    'simbolsMath': '-+*/%()^=',
    'simbolsMoney': '-€$.,',
    'simbolsEmail': '@.',
    'numbersMath': this.numbers+this.simbolsMath,
    'numbersMoney': this.numbers+this.simbolsMoney,
    'email': this.simbolsEmail+this.letters+this.numbers,
    'space': ' ',
    'spaceExt': this.space+"_-",
    'simbolsDate': this.numbers+"-/",
    'simbolsTime': this.numbers+":",
    'simbolsDateTime': this.simbolsDate+this.simbolsTime
}
