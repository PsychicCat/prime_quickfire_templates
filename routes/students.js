var express = require('express');
var router = express.Router();
var fs = require('fs');
var path= require('path');
var students = require('../models/students');


router.get('/', function(req, res, next) {
  res.json(students);
});


router.post('/', function(req, res, next){
  var studentsArray = students;
  studentsArray.push({"firstName": req.body.firstName, "lastName": req.body.lastName});
  var file = path.join(__dirname, '../models/students.json');

  fs.writeFile(file, JSON.stringify(studentsArray), function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
