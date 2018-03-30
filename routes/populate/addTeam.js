import express from 'express'
var router = express.Router()
import Team from '../../mongoose/team'

router.post('/', (req, res) => {
 // Insert into TodoList Collection
 var newTeam = new Team({
  fullName: req.body.fullName,
  tricode: req.body.tricode,
  city: req.body.city,
  conference: req.body.conference,
  division: req.body.division,
  id: req.body.id
 })
  newTeam.save((err,result) => {
    if (err) {return res.json({success: false, msg: err});}
    res.json({success: true, msg: 'Successfully created new team.', team: newTeam});
  })
});

export default router;
