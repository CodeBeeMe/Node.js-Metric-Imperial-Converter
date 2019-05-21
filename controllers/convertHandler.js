/*
*
*
*       Complete the handler logic below
*       
*       
*/

const math = require('mathjs');

function ConvertHandler() {
  
  const invalNum  = "invalid number";
  const invalUnit = "invalid unit";
  const invalNumAndUnit = "invalid number and unit";
  
  this.getNum = (input) => {
    let result;
    
    // isolating all non-aritmetic operators because not all the special charters throw a syntax error when evaluated in a math expression
    const deniedChars = input.match(/[^.,\+\-\*/\^0-9a-z]/gi); 
    
    const unitIndex = input.indexOf(/[a-z]/gi.exec(input)); //finding the index of the first letter of the unit of measurement
    
    // when unitIndex == 0  => no value input => result defaults to 1
    unitIndex == 0 ? result = 1 : deniedChars !=null ? result = new Error() : result = input.slice(0, unitIndex).replace(",", ".");
    
    // in case of any instance of a Syntax Error or an Error will return "invalid number"
    try { math.eval(result) }
    catch (e) { if (e instanceof SyntaxError || e) return result = invalNum }
    
    //console.log(result);    
    return math.eval(result);
  };
  
  this.getUnit = (input) => {
    let result,
        getUnit = /[a-z]{1,3}/gi.exec(input);
    
    const unitIndex = input.indexOf(/[a-z]/gi.exec(input));    
    // when unitIndex == -1 => value present but no unit of measurement ("invalid unit")    
    unitIndex == -1 ? result = invalUnit : result = input.slice(getUnit.index);
    
    //console.log(result);
    return result;
  };
  
  this.getReturnUnit = (initUnit) => {
    let result,
        standardUnit = initUnit.toLowerCase();    
    
    standardUnit == "gal" ? result = "L"   : 
    standardUnit == "mi"  ? result = "Km"  : 
    standardUnit == "lbs" ? result = "Kg"  :
    
    standardUnit == "l"   ? result = "gal" :
    standardUnit == "km"  ? result = "mi"  :
    standardUnit == "kg"  ? result = "lbs" : 
    
    standardUnit == "ft"  ? result = "m"   : 
    standardUnit == "in"  ? result = "cm"  : 
    standardUnit == "oz"  ? result = "g"   :
    
    standardUnit == "m"   ? result = "ft"  :
    standardUnit == "cm"  ? result = "in"  :
    standardUnit == "g"   ? result = "oz"  : result = invalUnit;
    
    return result;
  };

  this.spellOutUnit = (unit) => {
    let result,
        standardUnit = unit.toLowerCase();    
   
    standardUnit == "gal" ? result = "gallons"      :     
    standardUnit == "mi"  ? result = "miles"        : 
    standardUnit == "ft"  ? result = "feet"         : 
    standardUnit == "in"  ? result = "inches"       : 
    standardUnit == "lbs" ? result = "pounds"       : 
    standardUnit == "oz"  ? result = "ounces"       : 
    
    standardUnit == "l"   ? result = "Litres"       : 
    standardUnit == "km"  ? result = "Kilometers"   : 
    standardUnit == "m"   ? result = "Metres"       : 
    standardUnit == "cm"  ? result = "Centimetres"  :
    standardUnit == "kg"  ? result = "Kilograms"    : 
    standardUnit == "g"   ? result = "Grams"        : result = unit;
    
    
    
    return result;
  };
  
  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const ozToG = 28.3495;
    const ftToM = 0.3048;
    const inToCm = 2.54;
    const standardUnit = initUnit.toLowerCase();
    
    let result;
    
    standardUnit == "gal"    ? result = Number((initNum * galToL).toFixed(5))  :
    standardUnit == "lbs"    ? result = Number((initNum * lbsToKg).toFixed(5)) :
    standardUnit == "mi"     ? result = Number((initNum * miToKm).toFixed(5))  :
    
    standardUnit == "oz"     ? result = Number((initNum * ozToG).toFixed(5))   :
    standardUnit == "ft"     ? result = Number((initNum * ftToM).toFixed(5))   :
    standardUnit == "in"     ? result = Number((initNum * inToCm).toFixed(5))  :
    
    standardUnit == "l"      ? result = Number((initNum / galToL).toFixed(5))  :
    standardUnit == "kg"     ? result = Number((initNum / lbsToKg).toFixed(5)) :
    standardUnit == "km"     ? result = Number((initNum / miToKm).toFixed(5))  :
    
    standardUnit == "g"      ? result = Number((initNum / ozToG).toFixed(5))   :
    standardUnit == "m"      ? result = Number((initNum / ftToM).toFixed(5))   :
    standardUnit == "cm"     ? result = Number((initNum / inToCm).toFixed(5))  :
    
    initNum      == invalNum ? result = invalNum                               : result = invalUnit;
    
    return result;
  };
  
  this.getString = (initNum, initUnit, returnNum, returnUnit) => {    
    let result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);    
    return result;
  };
  
}

module.exports = ConvertHandler;
 
