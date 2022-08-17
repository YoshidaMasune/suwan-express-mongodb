const router = require('express').Router();

const Users = require('../models/users');
const Addresses = require('../models/address');

// MiddleWare 
const validAdd = require('../middleware/valid_address');
const validAddCouter = require('../middleware/valid_data_count');
const create_valid_miter = require('../middleware/create_valid_miter')

router.post('/', validAdd, validAddCouter, create_valid_miter, async (req, res) => {
   const userInp = req.body

   try{

      const user = await Users.create({
         first_name: userInp.first_name,
         last_name: userInp.last_name,
         jaya: userInp.jaya,
         internet: userInp.internet
      })
      const address = await Addresses.create({
         section: userInp.section,
         foor: userInp.foor,
         room: userInp.room,
         miter: [{
            miter: userInp.miter,
            date: new Date()
         }],
         user: user._id || null,
      })

      address.save();
      user.save();

      res.status(200).send('create user successfully')
   }catch(err) {
      res.status(400).send(err)
   }
});

router.post('/no-user', validAddCouter, create_valid_miter, async (req, res) => {
   const userInp = req.body

   try{
      const address = await Addresses.create({
         section: userInp.section,
         foor: userInp.foor,
         room: userInp.room,
         miter: [{
            miter: userInp.miter,
            date: new Date()
         }],
         userID: null,
      })

      address.save();

      res.status(200).send('create adddress-nouser successfully')
   }catch(err) {
      res.status(400).send(err)
   }
})

module.exports = router;