import express from 'express'
var router = express.Router()
import Player from '../../mongoose/player'

router.post('/', (req, res) => {
 // Insert into TodoList Collection
 var newPlayer = new Player({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  jersey: req.body.jersey,
  id: req.body.id
 })
  newPlayer.save((err,result) => {
    if (err) {return res.json({success: false, msg: err});}
    res.json({success: true, msg: 'Successfully created new player.', player: newPlayer});
  })
});

export default router;
