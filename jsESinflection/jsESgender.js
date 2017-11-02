function jsESgender(){
  var masculineRegs = [];
  var masculineReplaces = [];
  var feminineRegs = [];
  var feminineReplaces = [];
  var isFeminine = [];
  var isMasculine = [];
  var isBoth = [];
  var masculineExceptions = {};
  var feminineExceptions = {};

  //Transformation Rules
  //[aá] -> [aá]
  feminineRegs.push(/(.*[aá])$/);
  feminineReplaces.push('$1');

  //o -> a
  feminineRegs.push(/(.*)(o)$/);
  feminineReplaces.push('$1a');

  //ó -> á
  feminineRegs.push(/(.*)(ó)$/);
  feminineReplaces.push('$1á');

  //te -> te
  feminineRegs.push(/(.*)(t[eé])$/);
  feminineReplaces.push('$1$2');

  //tes -> tas
  feminineRegs.push(/(.*)(t[eé]s)$/);
  feminineReplaces.push('$1$2');

  //os -> as
  feminineRegs.push(/(.*)(os)$/);
  feminineReplaces.push('$1as');

  //ós -> ás
  feminineRegs.push(/(.*)(ós)$/);
  feminineReplaces.push('$1ás');

  //[ée]s -> esa
  feminineRegs.push(/(.*[eé]s)$/);
  feminineReplaces.push('$1a');

  //[óo][rtn] -> o[rtn]a
  feminineRegs.push(/(.*)[óo]([rtn])$/);
  feminineReplaces.push('$1o$2a');

  //[íi]n -> ina
  feminineRegs.push(/(.*)[íi]n$/);
  feminineReplaces.push('$1ina');

  //[íi]n -> ina
  feminineRegs.push(/(.*)[íi]n$/);
  feminineReplaces.push('$1ina');

  //*-> *
  feminineRegs.push(/(.*)$/);
  feminineReplaces.push('$1');

  /**************************************
  **************************************/
  //a -> o
  masculineRegs.push(/(.*)(a)$/);
  masculineReplaces.push('$1o');

  //[oó] -> o
  masculineRegs.push(/(.*[oó])$/);
  masculineReplaces.push('$1');

  //á -> ó
  masculineRegs.push(/(.*)(á)$/);
  masculineReplaces.push('$1ó');

  //as -> os
  masculineRegs.push(/(.*)(as)$/);
  masculineReplaces.push('$1os');

  //ás -> ós
  masculineRegs.push(/(.*)(ás)$/);
  masculineReplaces.push('$1ós');

  //esa -> es
  masculineRegs.push(/(.*es)[aá]$/);
  masculineReplaces.push('$1');

  //o[rtn]a -> o[rtn]
  masculineRegs.push(/(.*)o([rtn])[aá]$/);
  masculineReplaces.push('$1o$2');

  //*-> *
  masculineRegs.push(/(.*)$/);
  masculineReplaces.push('$1');

  //Rules to decide gender
  var FEM = 1;
  var MAS = -1;
  var BOTH = 0;
  var NI = 2;

  var rulesGender = [
    ["análisis",MAS],
    ["amoscas",MAS],
    ["abrisas",MAS],
    ["avidas",MAS],
    ["plasma",MAS],
    ["grama",MAS],
    ["umbre",FEM],
    ["entas",FEM],
    ["ocas",MAS],
    ["tema",MAS],
    ["lema",MAS],
    ["azon",BOTH],
    ["azón",BOTH],
    ["ista",BOTH],
    ["mente",BOTH],
    ["triz",FEM],
    ["cial",FEM],
    ["cion",FEM],
    ["ción",FEM],
    ["sion",FEM],
    ["sión",FEM],
    ["itas",FEM],
    ["enta",FEM],
    ["ante",BOTH],
    ["ide",MAS],
    ["gma",MAS],
    ["oma",MAS],
    ["ped",MAS],
    ["flor",FEM],
    ["sas",FEM],
    ["zas",FEM],
    ["nas",MAS],
    ["bas",MAS],
    ["cas",MAS],
    ["tad",FEM],
    ["tud",FEM],
    ["los",MAS],
    ["las",FEM],
    ["das",FEM],
    ["piz",MAS],
    ["ad",FEM],
    ["as",FEM],
    ["is",FEM],
    ["ís",FEM],
    ["os",MAS],
    ["us",MAS],
    ["ta",FEM],
    ["az",BOTH],
    ["iz",MAS],
    ["b",MAS],
    ["c",MAS],
    ["d",MAS],
    ["e",MAS],
    ["é",MAS],
    ["f",MAS],
    ["g",MAS],
    ["h",MAS],
    ["i",MAS],
    ["í",MAS],
    ["j",MAS],
    ["k",MAS],
    ["l",MAS],
    ["m",MAS],
    ["n",MAS],
    ["r",MAS],
    ["t",MAS],
    ["v",MAS],
    ["w",MAS],
    ["x",MAS],
    ["y",MAS],
    ["z",MAS],
    ["a",FEM],
    ["á",FEM],
    ["o",MAS],
    ["ó",MAS],
    ["u",MAS],
    ["ú",MAS]
  ];


  this.masculineOf = function(word){
    word = word.toLowerCase();
    var gender = this.masculineOrFeminine(word);

    if((gender == MAS) || (gender == BOTH)){
      return word;
    }

    var exception = masculineExceptions[word];
    if(exception){
      return exception;
    }

    for(var i = 0; i < masculineRegs.length; ++i){
      if(masculineRegs[i].test(word)){
        console.log(word +" match["+i+"] =" +masculineRegs[i] + " => "+masculineReplaces[i]);
        return word.replace(masculineRegs[i], masculineReplaces[i]);
      }
    }
  }

  this.feminineOf = function(word){
    word = word.toLowerCase();
    var gender = this.masculineOrFeminine(word);

    if((gender == FEM) || (gender == BOTH)){
      return word;
    }

    var exception = feminineExceptions[word];
    if(exception){
      return exception;
    }


    for(var i = 0; i < feminineRegs.length; ++i){
      if(feminineRegs[i].test(word)){
        console.log(word +" match["+i+"] =" + feminineRegs[i] + " => "+ feminineReplaces[i]);
        return word.replace(feminineRegs[i], feminineReplaces[i]);
      }
    }
  }




  //return -1(masculine), 1(feminine), 0(both), 2(no idea)
  this.masculineOrFeminine = function(word){
    word = word.toLowerCase();

    //1º Exceptions
    if(isBoth[word]){
      return BOTH;
    }
    if(isFeminine[word]){
      return FEM;
    }
    if(isMasculine[word]){
      return MAS;
    }

    //2º Rules [EndsWith, gender]
    var len = rulesGender.length;
    for(var i = 0; i < len; ++i){
      var rule = rulesGender[i];
      if(word.endsWith(rule[0])){
        return rule[1];
      }
    }

    return NI;
  }

  this.addException = function(masculine, feminine){
    if((masculine == feminine)){
      if(masculine != ""){
        isBoth[masculine] = true;
      } else { //both are "" do nothing
        return;
      }
    } else {
      if(masculine != ""){
        isMasculine[masculine] = true;
        feminineExceptions[masculine] = feminine;
      }
      if(feminine!= ""){
        isFeminine[feminine] = true;
        masculineExceptions[feminine] = masculine;
      }
    }
  }


  this.addException("masculino", "femenino");
  this.addException("masculinos", "femeninos");
  this.addException("hombre", "mujer");
  this.addException("hombres", "mujeres");
  this.addException("rey", "reina");
  this.addException("reyes", "reinas");
  this.addException("principe", "princesa");
  this.addException("vaca", "toro");
  this.addException("vacas", "toros");
  this.addException("caballo", "yegua");
  this.addException("caballos", "yeguas");
  this.addException("equel", "aquella");
  this.addException("el", "la");
  this.addException("un", "una");
  this.addException("uno" , "una");
  this.addException("unos" , "unas");
  this.addException("abad", "abadesa");
  this.addException("abades", "abadesas");
  this.addException("conde", "condesa");
  this.addException("condes", "condesas")
  this.addException("duque", "duquesa");
  this.addException("duques", "duquesas");
  this.addException("baron", "baronesa");
  this.addException("barones", "baronesas");
  this.addException("alcalde", "alcaldesa");
  this.addException("alcaldes", "alcaldesas");
  this.addException("zar", "zarina");
  this.addException("zares", "zarinas");
  this.addException("aquel", "aquella");
  this.addException("actor", "actriz");
  this.addException("actores", "actrices");
  this.addException("emperador", "emperatriz");
  this.addException("emperadores", "emperatrices");
  this.addException("padre", "madre");
  this.addException("padres", "madres");
  this.addException("papa", "mama");
  this.addException("papas", "mamas");
  this.addException("poeta", "poeta");
  this.addException("poeta", "poetas");

  //invariantes
  this.addException("yo" , "yo");
  this.addException("tu" , "tu");
  this.addException("no" , "no");
  this.addException("si" , "si");
  this.addException("cosa" , "cosa");
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
  this.addException("mar", "mar");
  this.addException("juez", "juez");
  this.addException("jueces", "jueces");
  this.addException("capital", "capital");
  this.addException("capitales", "capitales");
  this.addException("bocas", "bocas");
  this.addException("bocazas", "bocazas");

  this.addException("sarasa", "");
  this.addException("lunes", "");
  this.addException("martes", "");
  this.addException("miércoles", "");
  this.addException("jueves", "");
  this.addException("viernes", "");
  this.addException("sabado", "");
  this.addException("domingo", "");
  this.addException("pez", "");
  this.addException("peces", "");
  this.addException("día", "");
  this.addException("días", "");
  this.addException("oasis", "");
  this.addException("tirabrasas", "");
  this.addException("planeta", "");
  this.addException("planetas", "");

  this.addException("", "mano");
  this.addException("", "toma");
  this.addException("", "flema");
  this.addException("", "pasma");
  this.addException("", "ley");
  this.addException("", "berzas");
  this.addException("", "foto");
  this.addException("", "moto");
  this.addException("", "nariz");
  this.addException("", "sobrepelliz");
  this.addException("", "avidas");
  this.addException("", "ocas");
  this.addException("", "carcel");
  this.addException("", "pirámide");
  this.addException("", "tarde");
  this.addException("", "sede");
  this.addException("", "tilde");
  this.addException("", "probóscide");

}
