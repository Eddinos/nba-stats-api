var mongoose = require('mongoose');

var Schema = mongoose.Schema;
// create a schema
var PlayerSchema = new Schema({
    firstName: String,
    lastName: String,
    jersey: Number,
    id: {
      type: Number,
      required: true,
      unique: true
    }
}, {collection:"Players"});
// we need to create a model using it
var Player = mongoose.model('Player', PlayerSchema);
export default Player
