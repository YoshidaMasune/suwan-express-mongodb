const router = require('express').Router();

const Addresses = require('../models/address');
const Users = require('../models/users')

router.delete('/user-all', (req, res) => {
   try {
      Addresses.findByIdAndDelete(req.body._id).exec()
      Users.findByIdAndDelete(req.body.userID).exec()
      res.status(200).send('delete 1 ')
   } catch (error) {
      console.log(err);
      res.status(500).send(err)
   }
});

router.delete('/user', (req, res) => {
   try {
      Users.findByIdAndDelete(req.body.userID).exec()
      res.status(200).send('delete 1 ')
   } catch (error) {
      console.log(err);
      res.status(500).send(err)
   }
})

router.delete('/address', (req, res) => {
   try {
      Addresses.findByIdAndDelete(req.body._id).exec()
      res.status(200).send('delete 1 ')
   } catch (error) {
      console.log(err);
      res.status(500).send(err)
   }
})
module.exports = router;