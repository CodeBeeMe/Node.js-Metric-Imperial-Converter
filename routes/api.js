/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  const convertHandler = new ConvertHandler();  
  
  app.get('/api/convert', (req, res) => {
    const invalNum  = "invalid number";
    const invalUnit = "invalid unit";
    const invalNumAndUnit = "invalid number and unit";
    
    const input = req.query.input;    
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);    
    
    /*console.log("Input is: "  + input);
    console.log("initNum is: " + initNum);
    console.log("initUnit is: " + initUnit);
    console.log("returnNum is: " + returnNum);
    console.log("returnUnit is: " + returnUnit);
    console.log("toString is: "    + toString);*/
    
    returnNum  == invalNum  && returnUnit == invalUnit ? res.status(200).send(invalNumAndUnit) :
    initNum    == invalNum  || returnNum  == invalNum  ? res.status(200).send(invalNum)        :
    initUnit   == invalUnit || returnUnit == invalUnit ? res.status(200).send(invalUnit)       :
    res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: toString});
  
  });
  
  app.post('/api/convert', (req, res) => {
    const input = req.body.input;
    const invalUnit = "invalid unit";
    
    !input ? res.json(invalUnit) : null;
  });
};
