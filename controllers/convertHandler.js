/*
*
*
*       Complete the handler logic below
*       
*       
*/

const math        = require('mathjs');

function ConvertHandler() {
  
  this.getNum = (input) => {
    //let result = parseFloat(input); 
    //let result = input.match(/(\d+)+?(\/\d)?(\.\d)?/gi)[0].split("");
    let result = math.eval(input.match(/^(?:\d+)?(?:\/\d+)?(?:\.\d+)?/gi).join(""));
    console.log(result);
    return result;
  };
  
  this.getUnit = (input) => {
    let result = input.match(/[a-z]/gi).join("");
    console.log(result);
    return result;
  };
  
  this.getReturnUnit = (initUnit) => {
    let result;
    
    initUnit.toLowerCase() == "gal" ? result = "L"   : 
    initUnit.toLowerCase() == "mi"  ? result = "Km"  : 
    initUnit.toLowerCase() == "lbs" ? result = "Kg"  :
    initUnit.toLowerCase() == "l"   ? result = "gal" :
    initUnit.toLowerCase() == "km"  ? result = "mi"  :
    initUnit.toLowerCase() == "kg"  ? result = "lbs" : result = "invalid unit";
    
    return result;
  };

  this.spellOutUnit = (unit) => {
    let result;
    
    unit.toLowerCase() == "gal" ? result = "gallons"    : 
    unit.toLowerCase() == "mi"  ? result = "miles"      : 
    unit.toLowerCase() == "lbs" ? result = "pounds"     :
    unit.toLowerCase() == "l"   ? result = "Litres"     :
    unit.toLowerCase() == "km"  ? result = "Kilometers" :
    unit.toLowerCase() == "kg"  ? result = "Kilograms"  : result = "invalid unit";    
    
    return result;
  };
  
  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    
    initUnit.toLowerCase() == "gal" ? result = initNum * galToL  :
    initUnit.toLowerCase() == "lbs" ? result = initNum * lbsToKg :
    initUnit.toLowerCase() == "mi"  ? result = initNum * miToKm  :
    initUnit.toLowerCase() == "l"   ? result = initNum / galToL  :
    initUnit.toLowerCase() == "kg"  ? result = initNum / lbsToKg :
    initUnit.toLowerCase() == "km"  ? result = initNum / miToKm  : result = "invalid number";
    
    return result;
  };
  
  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    let result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
    
    return result;
  };
  
}

module.exports = ConvertHandler;
