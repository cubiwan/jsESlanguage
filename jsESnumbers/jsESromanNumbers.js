//code from:
//https://www.selftaughtjs.com/algorithm-sundays-converting-roman-numerals/

export function numberToRoman(num){
    var result = '';
    var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
    for (var i = 0;i<=decimal.length;i++) {
        while (num%decimal[i] < num) {    
        result += roman[i];
        num -= decimal[i];
        }
    }
    return result;
}

export function romanToNumber(str){
    var result = 0;
    // the result is now a number, not a string
    var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
    for (var i = 0;i<=decimal.length;i++) {
        while (str.indexOf(roman[i]) === 0){
        result += decimal[i];
        str = str.replace(roman[i],'');
        }
    }
    return result;
}

