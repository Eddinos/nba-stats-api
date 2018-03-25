var mongoose = require('mongoose');

var Schema = mongoose.Schema;
// create a schema
var toDoSchema = new Schema({
    firstName: String,
    lastName: String,
    jersey: Number
}, {collection:"Players"});
// we need to create a model using it
var Player = mongoose.model('Player', toDoSchema);
export default Player
