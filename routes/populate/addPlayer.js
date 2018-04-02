import express from 'express'
var router = express.Router()
import Player from '../../mongoose/player'

router.post('/', (req, res) => {
 var newPlayer = new Player({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  fullName: `${req.body.firstName} ${req.body.lastName}`,
  jersey: req.body.jersey,
  id: req.body.id,
  img: req.body.img
 })
  newPlayer.save((err,result) => {
    if (err) {return res.json({success: false, msg: err});}
    res.json({success: true, msg: 'Successfully created new player.', player: newPlayer});
  })
});

export default router;
