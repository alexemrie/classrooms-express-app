var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Classroom = mongoose.model('Classroom');

router.get('/', function(req, res) {
  Classroom.find({}, function(err, classrooms) {
    if (err) console.log(err);
    res.render('classrooms/index', {classrooms: classrooms})
  });
});

router.get('/:id', function(req, res) {
  Classroom.findOne({_id: req.params.id}, function(err, classroom) {
    res.render('classrooms/show', {classroom: classroom});
  });
});

module.exports = router;
