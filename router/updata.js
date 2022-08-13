const router = require('express').Router();

// MODEL
const Users = require('../models/users');
const Addresses = require('../models/address');

// Middleware

router.put('/user-all', async (req, res) => {
   const userInp = req.body;

   try{
      const address = await Addresses.findByIdAndUpdate({_id:userInp._id}, {
         $set:{
            section: userInp.section,
            foor: userInp.foor,
            room: userInp.room,

         },
         $push:{
            miter: [userInp.miter]
         }
      },
      {
         new: true
      });

      const user = await Users.findByIdAndUpdate({_id:userInp.userID}, {
         $set:{
            first_name: userInp.first_name,
            last_name: userInp.last_name,
            jaya: userInp.jaya
         }
      },{
         new: true
      })

      address.save();
      user.save()
      

      res.status(200).send(`${userInp._id} is updated`)
   }catch(err) {
      res.status(500).send(err)
      console.log(err);
   }
})

module.exports = router;