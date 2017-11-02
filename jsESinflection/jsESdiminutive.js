function jsESdiminutive(){
  var diminutiveRegs = [];
  var diminutiveReplaces = [];
  var diminutiveExceptions = {};

  //[aá] -> +ita
  diminutiveRegs.push(/(.*)[aá]$/);
  diminutiveReplaces.push('$1ita');

  //[eéiíoóuú] -> +ito
  diminutiveRegs.push(/(.*)[eéiíoóuú]$/);
  diminutiveReplaces.push('$1ito');

  //ces -> +itos
  diminutiveRegs.push(/(.*ce)s$/);
  diminutiveReplaces.push('$1citos');

  //[aá]s -> +ita
  diminutiveRegs.push(/(.*)[aá]s$/);
  diminutiveReplaces.push('$1itas');

  //[eéiíoóuú]s -> +ito
  diminutiveRegs.push(/(.*)[eéiíoóuú]s$/);
  diminutiveReplaces.push('$1itos');

  //triz -> +sita
  diminutiveRegs.push(/(.*tri)z$/);
  diminutiveReplaces.push('$1sita');

  //[^aáeéiíoóuú] -> +ito
  diminutiveRegs.push(/(.*[^eéiíoóuú])$/);
  diminutiveReplaces.push('$1ito');

  this.diminutiveOf = function(word){
    var exception = diminutiveExceptions[word];
    if(exception){
      return exception;
    }

    word = word.toLowerCase();
    for(var i = 0; i < diminutiveRegs.length; ++i){
      if(diminutiveRegs[i].test(word)){
        console.log(word +" match["+i+"] =" + diminutiveRegs[i] + " => "+ diminutiveReplaces[i]);
        return word.replace(diminutiveRegs[i], diminutiveReplaces[i]);
      }
    }
  }

  this.addException = function(normal, diminutive){
    diminutiveExceptions[normal] = diminutive;
  }

  this.addException("mano", "manita");
  this.addException("pie", "piececito");

}
