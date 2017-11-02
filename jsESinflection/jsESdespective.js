function jsESdespective(){
  var despectiveRegs = [];
  var despectiveReplaces = [];
  var despectiveExceptions = {};

  //[aá] -> +ucha
  despectiveRegs.push(/(.*)[aá]$/);
  despectiveReplaces.push('$1ucha');

  //[uú] -> +cho
  despectiveRegs.push(/(.*)[uú]$/);
  despectiveReplaces.push('$1ucho');

  //[eéiíoó] -> +ucho
  despectiveRegs.push(/(.*)[eéiíoóuú]$/);
  despectiveReplaces.push('$1ucho');

  //ces -> suchos
  despectiveRegs.push(/(.*)ces$/);
  despectiveReplaces.push('$1suchos');

  //[aá]s -> +uchas
  despectiveRegs.push(/(.*)[aá]s$/);
  despectiveReplaces.push('$1uchas');

  //[uú]s -> +chos
  despectiveRegs.push(/(.*)[uú]s$/);
  despectiveReplaces.push('$1chos');

  //[eéiíoó]s -> +uchos
  despectiveRegs.push(/(.*)[eéiíoóuú]s$/);
  despectiveReplaces.push('$1uchos');

  //triz -> +ucha
  despectiveRegs.push(/(.*tri)z$/);
  despectiveReplaces.push('$1sucha');

  //[^aáeéiíoóuú] -> +ucho
  despectiveRegs.push(/(.*[^eéiíoóuú])$/);
  despectiveReplaces.push('$1ucho');

  this.despectiveOf = function(word){
    var exception = despectiveExceptions[word];
    if(exception){
      return exception;
    }

    word = word.toLowerCase();
    for(var i = 0; i < despectiveRegs.length; ++i){
      if(despectiveRegs[i].test(word)){
        console.log(word +" match["+i+"] =" + despectiveRegs[i] + " => "+ despectiveReplaces[i]);
        return word.replace(despectiveRegs[i], despectiveReplaces[i]);
      }
    }
  }

  this.addException = function(normal, despective){
    despectiveExceptions[normal] = despective;
  }

  this.addException("mano", "manucha");
  this.addException("pie", "piesucho");
  this.addException("matrices", "matrisuchas");

}
