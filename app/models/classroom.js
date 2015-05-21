var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClassroomSchema = new Schema({
  name: {type: String, default: ''},
  numberOfSeats: {type: Number, default: 0},
  hasKeg: {type: Boolean, default: false}
});

mongoose.model('Classroom', ClassroomSchema);
