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

router.post('/', function(req, res) {
  var name = req.body.name;
  var seats = req.body.numberOfSeats;
  var keg = req.body.hasKeg;
  Classroom.create({
    name: name,
    numberOfSeats: seats,
    hasKeg: keg
  }, function(err, classroom) {
    if (err) console.log(err);
    else {
      console.log('Post creating new classroom');
      res.format({
        html: function() {
          res.location("classrooms");
          res.redirect("/classrooms");
        },
        json: function() {
          res.json(classroom);
        }
      });
    }
  });
});

router.get('/new', function(req, res) {
  res.render('classrooms/new', {title: "Let's create a New Classroom yo!"});
});

router.param('id', function(req, res, next, id) {
  Classroom.findById(id, function(err, classroom) {
    if (err) {
      console.log(id + ' was not found');
      res.status(404);
    } else {
      req.id = id;
      next();
    }
  });
});


router.get('/:id', function(req, res) {
  Classroom.findById(req.id, function(err, classroom) {
    res.render('classrooms/show', {classroom: classroom});
  });
});

router.get('/:id/edit', function(req, res) {
  Classroom.findById(req.id, function(err, classroom) {
    if(err) console.log(err);
    else {
      res.format({
        html: function() {
          res.render('classrooms/edit', {classroom: classroom});
        },
        json: function() {
          res.json(classroom);
        }
      });
    }
  });
});

router.post('/:id/edit', function(req, res) {
  console.log('accessed the post method');
  var name = req.body.name;
  var seats = req.body.numberOfSeats;
  var keg = req.body.hasKeg;
  Classroom.findById(req.id, function(err, classroom) {
    classroom.update({
      name: name,
      numberOfSeats: seats,
      hasKeg: keg
    }, function(err, classroomID) {
      if (err) res.send("There was an error updating the information");
      else {
        res.format({
          html: function() {
            console.log("About to update");
            res.redirect("/classrooms/" + classroom._id);
          },
          json: function() {
            res.json(classroom);
          }
        });
      }
    });
  });
});

router.get('/:id/delete', function(req, res) {
  console.log("About to be deleted");
  Classroom.findById(req.id, function(err, classroom) {
    if (err) console.log(err);
    else {
      classroom.remove(function(err, classroom) {
        console.log('Delete removing: ' + classroom._id);
        res.format({
          html: function() {
            res.redirect("/classrooms");
          },
          json: function() {
            res.json(classroom);
          }
        });
      });
    }
  });
});


module.exports = router;
