function jsESnumber(){

  var SIN = 1;
  var PLU = -1;
  var BOTH = 0;
  var NOIDEA = 2;

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

  //esdrujula +s -> s
  singularRegs.push(/([áéíóú].*[aeiou].*[aeiou].*s)$/);
  singularReplaces.push('$1');

  //oide +s -> oide
  singularRegs.push(/(.*oide)s$/);
  singularReplaces.push('$1');

  //cines -> cine
  singularRegs.push(/(.*cine)s$/);
  singularReplaces.push('$1');
  
  //eines -> eine
  singularRegs.push(/(.*eine)s$/);
  singularReplaces.push('$1');
  
  //dades -> dad
  singularRegs.push(/(.*dad)es$/);
  singularReplaces.push('$1');  
  
  //es ->
  singularRegs.push(/(.*)es$/);
  singularReplaces.push('$1');
  
  //^[áéíóú] +[aeiou] +s -> s
  //llana +s -> s
  singularRegs.push(/([^áéíóú]*[aeiou])s$/);
  singularReplaces.push('$1');
  
  //s ->
  singularRegs.push(/(.*)s$/);
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
      return BOTH;
    } else if(plural == word){
      return SIN;
    } else if(singular == word){
      return PLU;
    }

    return NOIDEA;
  }

  this.addException = function(singular, plural){
    pluralExceptions[plural] = singular;
    singularExceptions[singular] = plural;
  }

  this.addInvariant = function(word){
    pluralExceptions[word] = word;
    singularExceptions[word] = word;
  }

  this.addException("a", "aes");
  this.addException("e", "ees");
  this.addException("i", "ies");
  this.addException("o", "oes");
  this.addException("u", "ues");
  this.addException("el", "los");
  this.addException("si", "sies");
  this.addException("sí", "síes");
  this.addException("no", "noes");
  this.addException("éste", "éstos");
  this.addException("ese", "esos");
  this.addException("equel", "aquellos");
  this.addException("álbum", "álbumes");
  this.addException("club", "clubes");  
  this.addException("imán" , "imanes");
  this.addException("yo" , "yoes");
  this.addException("hipérbaton", "hipérbatos");
  this.addException("champú", "champús");
  this.addException("menú", "menús");
  this.addException("tutú", "tutús");
  this.addException("vermú", "vermús");
  this.addException("rey", "reyes");
  this.addException("ley", "leyes");
  this.addException("buey", "bueyes");
  this.addException("jersey", "jerséis");
  this.addException("panty", "pantis");  
  this.addException("vals", "valses");  
  this.addException("compás", "compases"); 
  this.addException("currículo", "currículos");
  this.addException("record", "records");
  this.addException("cumpleaños", "cumpleaños");
  this.addException("paréntesis", "paréntesis");
  this.addException("danés", "daneses");
  this.addException("francés", "franceses");
  this.addException("inglés", "ingleses");
  this.addException("holandés", "holandeses");
  this.addException("portugués", "portugueses");
  this.addException("filandés", "filandeses");
  this.addException("finés", "fineses");   
  this.addException("irlandés", "irlandeses");
  this.addException("galés", "galeses");
  this.addException("japonés", "japoneses");
  this.addException("imam", "imames");
  
  //mutiples
  this.addException("bisturí", "bisturís");
  this.addException("bisturí", "bisturíes");
  this.addException("tabú", "tabús");
  this.addException("tabú", "tabúes");
  this.addException("israelí", "israelí");
  this.addException("israelí", "israelíes");

  //invariantes
  this.addInvariant("abrebotellas");
  this.addInvariant("abrecartas");
  this.addInvariant("abrelatas");
  this.addInvariant("accésit");
  this.addInvariant("adolescencia");
  this.addInvariant("aguafiestas");
  this.addInvariant("albricias");
  this.addInvariant("alias");
  this.addInvariant("andurriales");
  this.addInvariant("análisis");
  this.addInvariant("aparcacoches");
  this.addInvariant("atlas");
  this.addInvariant("añicos");
  this.addInvariant("buscavidas");
  this.addInvariant("bíceps");
  this.addInvariant("cantamañanas");
  this.addInvariant("caos");
  this.addInvariant("caries");
  this.addInvariant("cariz");
  this.addInvariant("cascanueces");
  this.addInvariant("cascarrabias");
  this.addInvariant("cenit");
  this.addInvariant("ciempiés");
  this.addInvariant("clímax");
  this.addInvariant("correturnos");
  this.addInvariant("cortaplumas");
  this.addInvariant("cortapuros");
  this.addInvariant("cosmos");
  this.addInvariant("creces");
  this.addInvariant("crisis");
  this.addInvariant("crucis");
  this.addInvariant("cuelgacapas");
  this.addInvariant("cuelgaplatos");
  this.addInvariant("cumpleaños");
  this.addInvariant("cénit");
  this.addInvariant("decrepitud");
  this.addInvariant("dosis");
  this.addInvariant("dux");
  this.addInvariant("enseres");
  this.addInvariant("espantapájaros");
  this.addInvariant("esponsales");
  this.addInvariant("este");
  this.addInvariant("eternidad");
  this.addInvariant("exequias");
  this.addInvariant("éxtasis");
  this.addInvariant("fauces");
  this.addInvariant("fotosíntesis");
  this.addInvariant("fénix");
  this.addInvariant("gafas");
  this.addInvariant("galimatías");
  this.addInvariant("generosidad");
  this.addInvariant("grima");
  this.addInvariant("guardabarros");
  this.addInvariant("guardacoches");
  this.addInvariant("guardacostas");
  this.addInvariant("guardaespaldas");
  this.addInvariant("génesis");
  this.addInvariant("hipótesis");
  this.addInvariant("jueves");
  this.addInvariant("lanzacohetes");
  this.addInvariant("lanzallamas");
  this.addInvariant("lavacoches");
  this.addInvariant("lavaplatos");
  this.addInvariant("lavavajillas");
  this.addInvariant("limpiabotas");
  this.addInvariant("limpiaparabrisas");
  this.addInvariant("lunes");
  this.addInvariant("maitines");
  this.addInvariant("martes");
  this.addInvariant("matamoscas");
  this.addInvariant("matarratas");
  this.addInvariant("matasanos");
  this.addInvariant("matasuegras");
  this.addInvariant("metamorfosis");
  this.addInvariant("miércoles");
  this.addInvariant("moisés");
  this.addInvariant("mondadientes");
  this.addInvariant("montacargas");
  this.addInvariant("nada");
  this.addInvariant("nadie");
  this.addInvariant("nomeolvides");
  this.addInvariant("norte");
  this.addInvariant("nupcias");
  this.addInvariant("oeste");
  this.addInvariant("parabrisas");
  this.addInvariant("paracaídas");
  this.addInvariant("parachoques");
  this.addInvariant("paraguas");
  this.addInvariant("pararrayos");
  this.addInvariant("pasapurés");
  this.addInvariant("pelagatos");
  this.addInvariant("pereza");
  this.addInvariant("pisapapeles");
  this.addInvariant("portaaviones");
  this.addInvariant("portafolios");
  this.addInvariant("portalámparas");
  this.addInvariant("portamaletas");
  this.addInvariant("portamonedas");
  this.addInvariant("portapapeles");
  this.addInvariant("pánico");
  this.addInvariant("quitamanchas");
  this.addInvariant("quitamiedos");
  this.addInvariant("quitanieves");
  this.addInvariant("rascacielos");
  this.addInvariant("rompecabezas");
  this.addInvariant("rompeolas");
  this.addInvariant("sacacorchos");
  this.addInvariant("sacamuelas");
  this.addInvariant("sacapuntas");
  this.addInvariant("saltamontes");
  this.addInvariant("salud");
  this.addInvariant("salvavidas");
  this.addInvariant("salvoconducto");
  this.addInvariant("sed");
  this.addInvariant("sur");
  this.addInvariant("síntesis");
  this.addInvariant("tesis");
  this.addInvariant("tez");
  this.addInvariant("tiralíneas");
  this.addInvariant("tocadiscos");
  this.addInvariant("trabalenguas");
  this.addInvariant("tragaldabas");
  this.addInvariant("tragaperras");
  this.addInvariant("traspiés");
  this.addInvariant("tórax");
  this.addInvariant("viacrucis");
  this.addInvariant("viernes");
  this.addInvariant("virus");
  this.addInvariant("víveres");
}
