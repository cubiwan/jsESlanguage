function jsESaugmentative(){
  var augmentativeRegs = [];
  var augmentativeReplaces = [];
  var augmentativeExceptions = {};

  //[aá] -> +uza
  augmentativeRegs.push(/(.*)[aá]$/);
  augmentativeReplaces.push('$1aza');

  //[eéiíoóuú] -> +uzo
  augmentativeRegs.push(/(.*)[eéiíoóuú]$/);
  augmentativeReplaces.push('$1azo');
  
  //ces
  augmentativeRegs.push(/(.*)ces$/);
  augmentativeReplaces.push('$1sazos');

  //[aá]s -> +uza
  augmentativeRegs.push(/(.*)[aá]s$/);
  augmentativeReplaces.push('$1azas');

  //[eéiíoóuú]s -> +uzo
  augmentativeRegs.push(/(.*)[eéiíoóuú]s$/);
  augmentativeReplaces.push('$1sazos');

  //triz -> +uza
  augmentativeRegs.push(/(.*tri)z$/);
  augmentativeReplaces.push('$1saza');

  //[^aáeéiíoóuú] -> +uzo
  augmentativeRegs.push(/(.*[^eéiíoóuú])$/);
  augmentativeReplaces.push('$1azo');

  this.augmentativeOf = function(word){
    var exception = augmentativeExceptions[word];
    if(exception){
      return exception;
    }

    word = word.toLowerCase();
    for(var i = 0; i < augmentativeRegs.length; ++i){
      if(augmentativeRegs[i].test(word)){
        console.log(word +" match["+i+"] =" + augmentativeRegs[i] + " => "+ augmentativeReplaces[i]);
        return word.replace(augmentativeRegs[i], augmentativeReplaces[i]);
      }
    }
  }

  this.addException = function(normal, augmentative){
    augmentativeExceptions[normal] = augmentative;
  }

  this.addException("mano", "mananaza");
  this.addException("pie", "piezazo");

}
