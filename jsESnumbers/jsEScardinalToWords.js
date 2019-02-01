function unidades(num, femenine){
    switch(num){
        case "0": return "";
        case "1": 
            if(femenine)
                return "una";
            else
                return "uno";
        case "2": return "dos";
        case "3": return "tres";
        case "4": return "cuatro";
        case "5": return "cinco";
        case "6": return "seis";
        case "7": return "siete";
        case "8": return "ocho";
        case "9": return "nueve";
    }
}

function decenas(num, femenine){
    switch(num) {
        case "10": return "diez";
        case "11": return "once";
        case "12": return "doce";
        case "13": return "trece";
        case "14": return "catorce";
        case "15": return "quince";
        case "20": return "veinte";
    }
    var unidad = num[1];
    switch(num[0]) {
        case "0": return "" + unidades(unidad);
        case "2": return "veinti" + unidades(unidad);
        case "3": return "treinta" + y(num[1]) + unidades(unidad);
        case "4": return "cuarenta" + y(num[1]) + unidades(unidad);
        case "5": return "cincuenta" + y(num[1]) + unidades(unidad);
        case "6": return "sesenta" + y(num[1]) + unidades(unidad);
        case "7": return "setenta" + y(num[1]) + unidades(unidad);
        case "8": return "ochenta" + y(num[1]) + unidades(unidad);
        case "9": return "noventa" + y(num[1]) + unidades(unidad);
        case "0": return unidades(num[1]);
    }
}

function centenas(num, femenine) {    
    if(num == "100"){
        return "cien";
    }
    var decena = num.substring(1);
    if(femenine){
        switch(num[0])
        {
            case "0": return "" + decenas(decena);
            case "1": return "ciento " + decenas(decena);
            case "2": return "doscientas " + decenas(decena);
            case "3": return "trescientas " + decenas(decena);
            case "4": return "cuatrocientas " + decenas(decena);
            case "5": return "quinientas " + decenas(decena);
            case "6": return "seiscientas " + decenas(decena);
            case "7": return "setecientas " + decenas(decena);
            case "8": return "ochocientas " + decenas(decena);
            case "9": return "novecientas " + decenas(decena);
        }
    } else {
        switch(num[0])
        {
            case "0": return "" + decenas(decena);
            case "1": return "ciento " + decenas(decena);
            case "2": return "doscientos " + decenas(decena);
            case "3": return "trescientos " + decenas(decena);
            case "4": return "cuatrocientos " + decenas(decena);
            case "5": return "quinientos " + decenas(decena);
            case "6": return "seiscientos " + decenas(decena);
            case "7": return "setecientos " + decenas(decena);
            case "8": return "ochocientos " + decenas(decena);
            case "9": return "novecientos " + decenas(decena);
        }
    }
}


function s(number){
    if(number > 1){
        return "s";
    } else {
        return "";
    }
}

function y(num) {
    if (num > 0){
        return " y "
    } else {
        return "";
    }
}

function con() {
    return " con ";        
}

var decimalNames = [" décima", " centésima", " milésima", " diezmilésima"," cienmilésima", " millonésima", " diezmillonésima", " cienmillonésima", " billonésima"];
var sectionNames = ["", " mil ", " millones ", " mil ", " billones ", " mil ", " trillones ", " mil ", " cuatrillones ", " mil ", " quintillones ", " mil "];

function replaces(text){
    text = text.replace("uno millones", "un millón");
    text = text.replace("uno mil", "un mil");
    text = text.replace("uno billones", "un billón");
    text = text.replace("uno trillones", "un trillón");
    text = text.replace("uno cuatrillones", "un cuatrillón");
    text = text.replace("uno quintillones", "un quintillón");
    text = text.replace("una millones", "un millón");
    text = text.replace("una mil", "un mil");
    text = text.replace("una billones", "un billón");
    text = text.replace("una trillones", "un trillón");
    text = text.replace("una cuatrillones", "un cuatrillón");
    text = text.replace("una quintillones", "un quintillón");
    text = text.replace("veintidos", "veintidós");
    text = text.replace("veintitres", "veintitrés");
    text = text.replace("veintiseis", "veintiséis");
    if(text.startsWith("un mil")){
        text = text.replace("un mil", "mil");
    }
    return text;
}

function translateInteger(number, femenine){    
    var text = "";
    if(number == "0"){
        return "cero";
    }
    number = number.trim();
    if(number.startsWith("-")){
        number = number.substring(1);
        text += "menos "
        number = number.trim();
    }    
    
    var triples = divideTriples(number);
    
    for(var i = 0; i < triples.length; ++i){
        var section = translateTriple(triples[i], femenine);
        if(section.trim() != "")
            text  += section + sectionNames[(triples.length-1)-i];        
    }        
    return text;
}

function translateDecimal(number){
    if(number == "0")
        return "";
    var total = con() + translateInteger(number, true) + decimalNames[number.length-1] + s(number);
    return total;
}


function divideTriples(num){
    if(num.length == 0)
        return [];      

    var headLength = num.length % 3;
    if(headLength == 0){
        headLength = 3;
    }
    var head = num.substring(0,headLength);
    num = num.substring(headLength);

    var triples = [];
    triples.push(head);
    triples = triples.concat(divideTriples(num));
    return triples;
}

function translateTriple(num, femenine){        
    if(num.length == 1){
        return unidades(num, femenine);
    } else if(num.length == 2){
        return decenas(num, femenine);
    } else if(num.length == 3){
        return centenas(num, femenine);
    } else {
        return "";
    }
}

export function cardinalToWords(intPart, decPart, femenine){  
    intPart += "";
    intPart = intPart.trim();
    if(intPart.indexOf(',') > -1){
        [intPart, decPart] = intPart.split(',')
    }

    var text = translateInteger(intPart, femenine);
    text = text.trim();
    if(decPart){
        decPart += "";
        decPart = decPart.trim();
        text += translateDecimal(decPart);
    }

    return replaces(text);
}

