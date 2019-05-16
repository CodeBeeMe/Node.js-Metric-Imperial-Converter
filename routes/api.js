/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();
  
  app
    .route('/api/convert')
    .get(function (req, res){
    var input = req.query.input;
    var initNum = convertHandler.getNum(input);
    var initUnit = convertHandler.getUnit(input);
    var returnNum = convertHandler.convert(initNum, initUnit);
    var returnUnit = convertHandler.getReturnUnit(initUnit);
    var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    returnUnit == "invalid unit"   ?  res.json("invalid unit")       :
    returnNum  == "invalid number" ?  res.json("invalid number")     :     
    returnUnit == "invalid unit"   && returnNum  == "invalid number" ? res.json("invalid number and unit") :
    res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: toString});
  
  });
    
};
