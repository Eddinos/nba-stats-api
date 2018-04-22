var mongoose = require('mongoose');

var Schema = mongoose.Schema;
// create a schema
var TeamSchema = new Schema({
    fullName: String,
    tricode: String,
    city: String,
    conference: String,
    division: String,
    id: {
      type: Number,
      required: true,
      unique: true
    }
}, {collection:"Teams"});
// we need to create a model using it
var Team = mongoose.model('Team', TeamSchema);
export default Team
