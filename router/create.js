const router = require('express').Router();

const Users = require('../models/users');
const Addresses = require('../models/address');

// MiddleWare 
const validAdd = require('../middleware/valid_address');
const validAddCouter = require('../middleware/valid_data_count');

router.post('/', validAdd, validAddCouter, async (req, res) => {
   const userInp = req.body

   try{

      const user = await Users.create({
         first_name: userInp.first_name,
         last_name: userInp.last_name,
         jaya: userInp.jaya
      })
      const address = await Addresses.create({
         section: userInp.section,
         foor: userInp.foor,
         room: userInp.room,
         miter: [userInp.miter],
         userID: user._id || null,
      })

      address.save();
      user.save();

      res.status(200).send('create user successfully')
   }catch(err) {
      res.status(400).send(err)
   }
});

router.post('/nouser', validAddCouter, async (req, res) => {
   const userInp = req.body

   try{

      const address = await Addresses.create({
         section: userInp.section,
         foor: userInp.foor,
         room: userInp.room,
         miter: [userInp.miter],
         userID: null,
      })

      address.save();

      res.status(200).send('create adddress-nouser successfully')
   }catch(err) {
      res.status(400).send(err)
   }
})

module.exports = router;