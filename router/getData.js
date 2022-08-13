const router = require('express').Router();

const Users = require('../models/users');
const Addresses = require('../models/address');

router.get('/users-all', async (req, res) => {
   try{
      const data =  await Addresses.aggregate([
         {
            $lookup: {
               from: "users",
               localField: "userID",
               foreignField: "_id",
               as: "user"
            }
         },
         {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$user", 0 ] }, "$$ROOT" ] } }
         },
         { $project: { user: 0 } }
      ])

      res.status(200).json(data)
   }catch(err) {
      res.status(500).send('server errer')
   }
  
})

module.exports = router;