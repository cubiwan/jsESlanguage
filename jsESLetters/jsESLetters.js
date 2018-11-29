function jsESLetters(){
    
    this.capitalLetters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZAÜÁÉÍÓÚ';
    this.smallLetters = 'abcdefghijklmnñopqrstuvwxyzüáéíóú';
    this.numbers = '0123456789';
    this.simbolsMath = '-+*/%()^';
    this.simbolsMoney = '-€$.,';
    this.simbolsEmail = '@.';
    this.letters = this.capitalLetters+this.smallLetters;
    this.numbersMath = this.numbers+this.simbolsMath;
    this.numbersMoney = this.numbers+this.simbolsMoney;
    this.email = this.simbolsEmail+this.letters+this.numbers;
    this.space = ' ';
    this.spaceExt = " _-";
    this.simbolsDate = "-/";
    this.simbolsTime = ":";
    this.simbolsDateTime = this.simbolsDate+this.simbolsTime;
   
    this.cleanLetters = function(text){
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }
   
   
}
