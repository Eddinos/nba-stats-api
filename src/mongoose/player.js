var mongoose = require('mongoose');
import teamSchema from './team';

var Schema = mongoose.Schema;
// create a schema
var PlayerSchema = new Schema({
    firstName: String,
    lastName: String,
    jersey: String,
    fullName: String,
    img: String,
    teamTricode: String,
    isAllStar: Boolean,
    position: String,
    heightFeet: Number,
    heightInches: Number,
    weight: Number,
    id: {
      type: Number,
      required: true,
      unique: true
    }
}, {collection:"Players"});
// we need to create a model using it
var Player = mongoose.model('Player', PlayerSchema);
export default Player
