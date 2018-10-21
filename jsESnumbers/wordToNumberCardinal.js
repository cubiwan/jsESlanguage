function wordsToNumberCardinal(){

    this.transalate = function(text){
        text = cleanLetters(text)
        return separe(text);
    }

    function cleanLetters(text){
        text = text.toLowerCase();
        text = text.replace(/ /g, "");
        text = text.replace(/y/g, "i");
        text = text.replace(/á/g, "a");
        text = text.replace(/é/g, "e");
        text = text.replace(/í/g, "i");
        text = text.replace(/ó/g, "o");
        text = text.replace(/ú/g, "u");
        return text;
    }

    function separe(text){
        var intNumber;
        var decimalNumber;

        text = cleanLetters(text);
        var parts;
        parts = text.split("coma");
        if(parts.length == 1){
            parts = text.split("con");            
        }
        if(parts.length == 1){
            parts = text.split("punto");
        }
        intNumber = cardinal2number(parts[0]);
        if(parts.length == 2){            
            decimalNumber = decimal2number(parts[1]);
        }

        return [intNumber, decimalNumber];
    }
    function cardinal2number(text){

        var number = 0;
        var textLengh = text.length;
        var oldTextLengh;
        do{
            oldTextLengh = textLengh;

            if(text.startsWith("ciento")){
                number += 100;
                text = text.substring("ciento".length);
            } else if(text.startsWith("cien")){
                number += 100;
                text = text.substring("cien".length);
            } else if(text.startsWith("doscientos")){
                number += 200;
                text = text.substring("doscientos".length);
            } else if(text.startsWith("trescientos")){
                number += 300;
                text = text.substring("trescientos".length);
            } else if(text.startsWith("cuatrocientos")){
                number += 400;
                text = text.substring("cuatrocientos".length);
            } else if(text.startsWith("quinientos")){
                number += 500;
                text = text.substring("quinientos".length);    
            } else if(text.startsWith("seiscientos")){
                number += 600;
                text = text.substring("seiscientos".length);    
            } else if(text.startsWith("setecientos")){
                number += 700;
                text = text.substring("setecientos".length);    
            } else if(text.startsWith("ochocientos")){
                number += 800;
                text = text.substring("ochocientos".length);    
            } else if(text.startsWith("novecientos")){
                number += 900;
                text = text.substring("novecientos".length);  
            } else if(text.startsWith("doscientas")){
                number += 200;
                text = text.substring("doscientas".length);
            } else if(text.startsWith("trescientas")){
                number += 300;
                text = text.substring("trescientas".length);
            } else if(text.startsWith("cuatrocientas")){
                number += 400;
                text = text.substring("cuatrocientas".length);
            } else if(text.startsWith("quinientas")){
                number += 500;
                text = text.substring("quinientas".length);    
            } else if(text.startsWith("seiscientas")){
                number += 600;
                text = text.substring("seiscientas".length);    
            } else if(text.startsWith("setecientas")){
                number += 700;
                text = text.substring("setecientas".length);    
            } else if(text.startsWith("ochocientas")){
                number += 800;
                text = text.substring("ochocientas".length);    
            } else if(text.startsWith("novecientas")){
                number += 900;
                text = text.substring("novecientas".length);                 
            } else if(text.startsWith("noventa")){
                number += 90;
                text = text.substring("noventa".length);    
            } else if(text.startsWith("ochenta")){
                number += 80;
                text = text.substring("ochenta".length);    
            } else if(text.startsWith("setenta")){
                number += 70;
                text = text.substring("setenta".length);    
            } else if(text.startsWith("sesenta")){
                number += 60;
                text = text.substring("sesenta".length);    
            } else if(text.startsWith("cincuenta")){
                number += 50;
                text = text.substring("cincuenta".length);    
            } else if(text.startsWith("cuarenta")){
                number += 40;
                text = text.substring("cuarenta".length);
            } else if(text.startsWith("treinta")){            
                number += 30;
                text = text.substring("treinta".length);
            } else if(text.startsWith("veint")){
                number += 20;
                text = text.substring("veint".length);
            } else if(text.startsWith("diec")){
                number += 10;
                text = text.substring("diec".length);
            } else if(text.startsWith("diez")){
                number += 10;
                text = text.substring("diez".length);
            } else if(text.startsWith("once")){
                number += 11;
                text = text.substring("once".length);
            } else if(text.startsWith("doce")){
                number += 12;
                text = text.substring("doce".length);
            } else if(text.startsWith("trece")){
                number += 13;
                text = text.substring("trece".length);
            } else if(text.startsWith("catorce")){
                number += 14;
                text = text.substring("catorce".length);
            } else if(text.startsWith("quince")){
                number += 15;
                text = text.substring("quince".length);
            } else if(text.startsWith("i")){            
                text = text.substring("i".length);    
            } else if(text.startsWith("uno")){
                number += 1;
                text = text.substring("uno".length); 
            } else if(text.startsWith("dos")){
                number += 2;
                text = text.substring("dos".length); 
            } else if(text.startsWith("tres")){
                number += 3;
                text = text.substring("tres".length); 
            } else if(text.startsWith("cuatro")){
                number += 4;
                text = text.substring("cuatro".length); 
            } else if(text.startsWith("cinco")){
                number += 5;
                text = text.substring("cinco".length); 
            } else if(text.startsWith("seis")){
                number += 6;
                text = text.substring("seis".length); 
            } else if(text.startsWith("siete")){
                number += 7;
                text = text.substring("siete".length); 
            } else if(text.startsWith("ocho")){
                number += 8;
                text = text.substring("ocho".length); 
            } else if(text.startsWith("nueve")){
                number += 9;
                text = text.substring("nueve".length); 
            } else if(text.startsWith("un")){
                number += 1;
                text = text.substring("un".length); 
            } else if(text.startsWith("millon")){
                number *= 1000000;
                text = text.substring("millon".length); 
            } else if(text.startsWith("billon")){
                number *= 1000000000000;
                text = text.substring("millon".length); 
            } else if(text.startsWith("mil")){
                if(number == 0){
                    number = 1000;
                }else{
                    number *= 1000;
                }
                text = text.substring("mil".length);
            } else if(text.startsWith("es")){
                text = text.substring("es".length);  
            }

            textLengh = text.length;
            console.log(text);
        }while(oldTextLengh != textLengh)
    return number;
    }


    function decimal2number(text){
        var number = 0;
        var decimal = 1;
        var textLengh = text.length;
        var oldTextLengh;
        do{
            oldTextLengh = textLengh;

            if(text.startsWith("ciento")){
                number += 100;
                text = text.substring("ciento".length);
            } else if(text.startsWith("cien")){
                number += 100;
                text = text.substring("cien".length);
            } else if(text.startsWith("doscientos")){
                number += 200;
                text = text.substring("doscientos".length);
            } else if(text.startsWith("trescientos")){
                number += 300;
                text = text.substring("trescientos".length);
            } else if(text.startsWith("cuatrocientos")){
                number += 400;
                text = text.substring("cuatrocientos".length);
            } else if(text.startsWith("quinientos")){
                number += 500;
                text = text.substring("quinientos".length);    
            } else if(text.startsWith("seiscientos")){
                number += 600;
                text = text.substring("seiscientos".length);    
            } else if(text.startsWith("setecientos")){
                number += 700;
                text = text.substring("setecientos".length);    
            } else if(text.startsWith("ochocientos")){
                number += 800;
                text = text.substring("ochocientos".length);    
            } else if(text.startsWith("novecientos")){
                number += 900;
                text = text.substring("novecientos".length);  
            } else if(text.startsWith("doscientas")){
                number += 200;
                text = text.substring("doscientas".length);
            } else if(text.startsWith("trescientas")){
                number += 300;
                text = text.substring("trescientas".length);
            } else if(text.startsWith("cuatrocientas")){
                number += 400;
                text = text.substring("cuatrocientas".length);
            } else if(text.startsWith("quinientas")){
                number += 500;
                text = text.substring("quinientas".length);    
            } else if(text.startsWith("seiscientas")){
                number += 600;
                text = text.substring("seiscientas".length);    
            } else if(text.startsWith("setecientas")){
                number += 700;
                text = text.substring("setecientas".length);    
            } else if(text.startsWith("ochocientas")){
                number += 800;
                text = text.substring("ochocientas".length);    
            } else if(text.startsWith("novecientas")){
                number += 900;
                text = text.substring("novecientas".length);                 
            } else if(text.startsWith("noventa")){
                number += 90;
                text = text.substring("noventa".length);    
            } else if(text.startsWith("ochenta")){
                number += 80;
                text = text.substring("ochenta".length);    
            } else if(text.startsWith("setenta")){
                number += 70;
                text = text.substring("setenta".length);    
            } else if(text.startsWith("sesenta")){
                number += 60;
                text = text.substring("sesenta".length);    
            } else if(text.startsWith("cincuenta")){
                number += 50;
                text = text.substring("cincuenta".length);    
            } else if(text.startsWith("cuarenta")){
                number += 40;
                text = text.substring("cuarenta".length);
            } else if(text.startsWith("treinta")){            
                number += 30;
                text = text.substring("treinta".length);
            } else if(text.startsWith("veint")){
                number += 20;
                text = text.substring("veint".length);
            } else if(text.startsWith("diec")){
                number += 10;
                text = text.substring("diec".length);
            } else if(text.startsWith("diez")){
                number += 10;
                text = text.substring("diez".length);
            } else if(text.startsWith("once")){
                number += 11;
                text = text.substring("once".length);
            } else if(text.startsWith("doce")){
                number += 12;
                text = text.substring("doce".length);
            } else if(text.startsWith("trece")){
                number += 13;
                text = text.substring("trece".length);
            } else if(text.startsWith("catorce")){
                number += 14;
                text = text.substring("catorce".length);
            } else if(text.startsWith("quince")){
                number += 15;
                text = text.substring("quince".length);
            } else if(text.startsWith("i")){            
                text = text.substring("i".length);    
            } else if(text.startsWith("uno")){
                number += 1;
                text = text.substring("uno".length); 
            } else if(text.startsWith("dos")){
                number += 2;
                text = text.substring("dos".length); 
            } else if(text.startsWith("tres")){
                number += 3;
                text = text.substring("tres".length); 
            } else if(text.startsWith("cuatro")){
                number += 4;
                text = text.substring("cuatro".length); 
            } else if(text.startsWith("cinco")){
                number += 5;
                text = text.substring("cinco".length); 
            } else if(text.startsWith("seis")){
                number += 6;
                text = text.substring("seis".length); 
            } else if(text.startsWith("siete")){
                number += 7;
                text = text.substring("siete".length); 
            } else if(text.startsWith("ocho")){
                number += 8;
                text = text.substring("ocho".length); 
            } else if(text.startsWith("nueve")){
                number += 9;
                text = text.substring("nueve".length); 
            } else if(text.startsWith("una")){
                number += 1;
                text = text.substring("una".length); 
            } else if(text.startsWith("decima")){
                decimal *= 10;
                text = text.substring("millonesima".length); 
            } else if(text.startsWith("millonesima")){
                decimal *= 1000000;
                text = text.substring("millonesima".length); 
            } else if(text.startsWith("millonesima")){
                decimal *= 1000000000000;
                text = text.substring("millon".length); 
            } else if(text.startsWith("milesima")){
                if(number == 0){
                    decimal = 1000;
                }else{
                    decimal *= 1000;
                }
                text = text.substring("milesima".length);
            } else if(text.startsWith("es")){
                text = text.substring("es".length);  
            }

            textLengh = text.length;
            console.log(text);
        }while(oldTextLengh != textLengh)
    
        while(number/decimal > 1){
            decimal *= 10;
        }

        return [number, decimal];
    }
}
