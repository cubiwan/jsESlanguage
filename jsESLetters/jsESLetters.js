   function jsESLetters(){
    
     this.capitalLetters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZAÜÁÉÍÓÚ';
     this.smallLetters = 'abcdefghijklmnñopqrstuvwxyzüáéíóú';
     this.numbers = '0123456789';
     this.simbolsMath = '-+*/%()^';
     this.simbolsMoney = '-€$.,';
     this.simbolsEmail = '@.';
     this.letters = letterMayus+letterMinus;
     this.numbersMath = numbers+simbolsMath;
     this.numbersMoney = numbers+simbolsMoney;
     this.email = simbolsEmail+letters+numbers;
     this.space = ' ';
     this.spaceExt = " _-";
     this.simbolsDate = "-/";
     this.simbolsTime = ":";
     this.simbolsDateTime = simbolsDate+simbolsTime;
    
      this.cleanLetters = function(text){
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      }
    
    
    }
