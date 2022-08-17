const router = require('express').Router();

// MODEL
const Users = require('../models/users');
const Addresses = require('../models/address');

// Middleware
const check_miter = require('../middleware/check_miter');
const valid_data_count = require('../middleware/valid_data_count')

router.put('/user-all', check_miter, async (req, res) => {
   const userInp = req.body;
   const { _id, miter } = req.body;
   const data = await Addresses.findById(_id).exec()   
   const lastMiter = data.miter.map( i => {
      console.log(i)
      return i.miter
   })
   // valid miter === before ?
   if (!data) {
      res.send('no update')
   }else{

      if (lastMiter.sort((a,b) => b-a)[0] === miter || !miter) {
         // miter not modity
         try{
            const address = await Addresses.findOneAndUpdate({_id:userInp._id}, {
               $set:{
                  section: userInp.section,
                  foor: userInp.foor,
                  room: userInp.room,
               }
            },
            {
               new: true
            });
            const user = await Users.findOneAndUpdate({_id:userInp.userID}, {
               $set:{
                  first_name: userInp.first_name,
                  last_name: userInp.last_name,
                  jaya: userInp.jaya,
                  internet: userInp.internet
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
      }else{
         try{
            const address = await Addresses.findOneAndUpdate({_id:userInp._id}, {
               $set:{
                  section: userInp.section,
                  foor: userInp.foor,
                  room: userInp.room,
               },
               $push:{
                  miter: {
                     miter: miter,
                     date: new Date()
                  }
               }
            },
            {
               new: true
            });
            if (userInp.userID){
               const user = await Users.findOneAndUpdate({_id:userInp.userID}, {
                  $set:{
                     first_name: userInp.first_name,
                     last_name: userInp.last_name,
                     jaya: userInp.jaya
                  }
               },{
                  new: true
               });
               user.save()
            }
            address.save();
            res.status(200).send(`${userInp._id} is updated`)
         }catch(err) {
            res.status(500).send(err)
            console.log(err);
         }
      }
   }
});

router.put('/miter', check_miter, async (req, res) => {
   const { _id, miter } = req.body;
   const data = await Addresses.findById(_id).exec()

   const lastMiter = data.miter.map( i => {
      return i.miter
   })
   if (!data) {
      res.send('no update')
   }else{
      if (lastMiter.sort((a,b) => b-a)[0] === miter || !miter ){
         res.send('no update')
      }else{
         try{
            const address = await Addresses.findByIdAndUpdate(_id, {
               $push:{
                  miter: [{
                     miter: miter,
                     date: new Date()
                  }]
               }
            })
            address.save();
            res.status(200).send('updata 1 miter')
         }catch(err){
            console.log(err)
            res.status(500).send('server get error')
         }
      }
   
   }
})

router.put('/user', async (req, res) => {
   const userInp = req.body;
   try{
      const user = await Users.findByIdAndUpdate(userInp.user, {
         $set: {
            first_name: userInp.first_name,
            last_name: userInp.last_name
         }
      });
      user.save().then((err, result) => {
         res.status(200).send(result) 
      })
      
   }catch(err) {
      res.status(500)
   }
})

module.exports = router;