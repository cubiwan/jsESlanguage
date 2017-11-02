
function jsESnumber(){
  var pluralRegs = [];
  var pluralReplaces = [];
  var singularRegs = [];
  var singularReplaces = [];
  var pluralExceptions = {};
  var singularExceptions = {};

  //[aeiouáéíóú] -> [aeiouáéíóú] +s
  pluralRegs.push(/(.*)([aeiouáéíóú])$/);
  pluralReplaces.push('$1$2s');

  //[bcfgkmpqtvw] -> [bcfgkmpqtvw] +s
  pluralRegs.push(/(.*)([bcfgkmpqtvw])$/);
  pluralReplaces.push('$1$2s');

  //[djl] -> [djl] +es
  pluralRegs.push(/(.*)([djlr])$/);
  pluralReplaces.push('$1$2es');

  //ch -> ch
  pluralRegs.push(/(.*)(ch)$/);
  pluralReplaces.push('$1$2');

  //[áéíóú] +.* +x -> x
  //llana o esdrujula +x -> invariante
  pluralRegs.push(/(.*)([áéíóú])(.*x)$/);
  pluralReplaces.push('$1$2$3');

  //[^áéíóú] +x -> +es
  //aguda +x -> +es
  pluralRegs.push(/(.*)([^áéíóú])(.*x)$/);
  pluralReplaces.push('$1$2$3es');

  //y -> ies
  pluralRegs.push(/(.*)y$/);
  pluralReplaces.push('$1is');

  //z -> ces
  pluralRegs.push(/(.*)(z)$/);
  pluralReplaces.push('$1ces');

  //[áéíóú] +[nrs] -> [aeiou] +[nrs] +es
  pluralRegs.push(/(.*)á([nrs])$/);
  pluralReplaces.push('$1a$2es');
  pluralRegs.push(/(.*)é([nrs])$/);
  pluralReplaces.push('$1e$2es');
  pluralRegs.push(/(.*)í([nrs])$/);
  pluralReplaces.push('$1i$2es');
  pluralRegs.push(/(.*)ó([nrs])$/);
  pluralReplaces.push('$1o$2es');
  pluralRegs.push(/(.*)ú([nrs])$/);
  pluralReplaces.push('$1u$2es');

  //. +[aeiou] +s -> +es
  //monosilaba +s -> +es
  pluralRegs.push(/(^.[aeiou]s)$/);
  pluralReplaces.push('$1es');

  //.[aeiou] -> +s
  //monosilaba -> +s
  pluralRegs.push(/(^.[aeiou])$/);
  pluralReplaces.push('$1s');

  //[aeiou] +[nr] -> [aeiou] +[nr] +es
  pluralRegs.push(/(.*)([aeiou])([nr])$/);
  pluralReplaces.push('$1$2$3es');

  //[^[áéíóú]*+[aeiou] +s -> s
  //llana +s -> s
  pluralRegs.push(/([^áéíóú]*[aeiou]s)$/);
  pluralReplaces.push('$1');

  //esdrujula +[nrs] -> [nrs]
  pluralRegs.push(/([áéíóú].*[aeiou].*[aeiou].*[nrs])$/);
  pluralReplaces.push('$1');

  //***************************************************

  //ces -> z
  singularRegs.push(/(.*)ces$/);
  singularReplaces.push('$1z');

  //monosilaba ->
  singularRegs.push(/(^...)$/);
  singularReplaces.push('$1');
  singularRegs.push(/(^..)$/);
  singularReplaces.push('$1');

  //. +[aeiou] +ses -> s
  //monosilaba +ses -> +s
  singularRegs.push(/(^.[aeiou])ses$/);
  singularReplaces.push('$1s');

  //^[áéíóú] +[aeiou] +s -> s
  //llana +s -> s
  singularRegs.push(/([^áéíóú]*[aeiou])s$/);
  singularReplaces.push('$1');

  //esdrujula +s -> s
  singularRegs.push(/([áéíóú].*[aeiou].*[aeiou].*s)$/);
  singularReplaces.push('$1');

  //oide +s -> oide
  singularRegs.push(/(.*oide)s$/);
  singularReplaces.push('$1');

  //s ->
  singularRegs.push(/(.*)s$/);
  singularReplaces.push('$1');

  //es ->
  singularRegs.push(/(.*)es$/);
  singularReplaces.push('$1');


  this.pluralOf = function(word){
    var exception = pluralExceptions[word];
    if(exception){
      return exception;
    }

    word = word.toLowerCase();
    for(var i = 0; i < pluralRegs.length; ++i){
      if(pluralRegs[i].test(word)){
        console.log(word +" match["+i+"] =" +pluralRegs[i] + " => "+pluralReplaces[i]);
        return word.replace(pluralRegs[i], pluralReplaces[i]);
      }
    }

    //return same word
    return word;
  }

  this.singularOf = function(word){
    var exception = singularExceptions[word];
    if(exception){
      return exception;
    }

    word = word.toLowerCase();
    for(var i = 0; i < singularRegs.length; ++i){
      if(singularRegs[i].test(word)){
        console.log(word +" match["+i+"] =" + singularRegs[i] + " => "+ singularReplaces[i]);
        return word.replace(singularRegs[i], singularReplaces[i]);
      }
    }

    //return same word
    return word;
  }


  //return -1(singular), 1(plural), 0(both), 2(no idea)
  this.singularOrPlural = function(word){
    var plural = this.pluralOf(word);
    var singular = this.singularOf(word);

    if(plural == singular){
      return 0;
    } else if(plural == word){
      return 1;
    } else if(singular == word){
      return -1;
    }

    return 2;
  }

  this.addException = function(singular, plural){
    pluralExceptions[plural] = singular;
    singularExceptions[singular] = plural;
  }


  this.addException("a", "aes");
  this.addException("e", "ees");
  this.addException("i", "ies");
  this.addException("o", "oes");
  this.addException("u", "ues");
  this.addException("el", "los");
  this.addException("este", "estos");
  this.addException("ese", "esos");
  this.addException("equel", "aquellos");
  this.addException("álbum", "álbumes");
  this.addException("imán" , "imanes");
  this.addException("yo" , "yoes");
  this.addException("no" , "noes");
  this.addException("hipérbaton", "hipérbatos");
  this.addException("champú", "champús");
  this.addException("menú", "menús");
  this.addException("tutú", "tutús");
  this.addException("vermú", "vermús");
  this.addException("rey", "reyes");
  this.addException("ley", "leyes");
  this.addException("buey", "bueyes");

  //invariantes
  this.addException("virus", "virus");
  this.addException("dux", "dux");
  this.addException("nada", "nada");
  this.addException("nadie", "nadie");
  this.addException("pereza", "pereza");
  this.addException("adolescencia", "adolescencia");
  this.addException("generosidad", "generosidad");
  this.addException("pánico", "pánico");
  this.addException("decrepitud", "decrepitud");
  this.addException("eternidad", "eternidad");
  this.addException("caos", "caos");
  this.addException("paraguas", "paraguas");
  this.addException("gafas", "gafas");
  this.addException("víveres", "víveres");
  this.addException("albricias", "albricias");
  this.addException("esponsales", "esponsales");
  this.addException("maitines", "maitines");
  this.addException("andurriales", "andurriales");
  this.addException("añicos", "añicos");
  this.addException("pararrayos", "pararrayos");
  this.addException("exequias", "exequias");
  this.addException("enseres", "enseres");
  this.addException("nupcias", "nupcias");
  this.addException("creces", "creces");
  this.addException("trabalenguas", "trabalenguas");
  this.addException("cascarrabias", "cascarrabias");
  this.addException("viacrucis", "viacrucis");
  this.addException("saltamontes", "saltamontes");
  this.addException("sacacorchos", "sacacorchos");
  this.addException("lavacoches", "lavacoches");
  this.addException("paracaídas", "paracaídas");
  this.addException("pisapapeles", "pisapapeles");
  this.addException("quitamanchas", "quitamanchas");
  this.addException("alicates", "alicates");
  this.addException("fauces", "fauces");
  this.addException("mondadientes", "mondadientes");
  this.addException("cortaplumas", "cortaplumas");
  this.addException("abrelatas", "abrelatas");
  this.addException("limpiabotas", "limpiabotas");
  this.addException("cuelgacapas", "cuelgacapas");
  this.addException("parabrisas", "parabrisas");
  this.addException("parachoques", "parachoques");
  this.addException("portaaviones", "portaaviones");
  this.addException("salvavidas", "salvavidas");
  this.addException("rompeolas", "rompeolas");
  this.addException("análisis", "análisis");
  this.addException("crisis", "crisis");
  this.addException("síntesis", "síntesis");
  this.addException("fotosíntesis", "fotosíntesis");
  this.addException("lunes", "lunes");
  this.addException("martes", "martes");
  this.addException("miércoles", "miércoles");
  this.addException("jueves", "jueves");
  this.addException("viernes", "viernes");

}
