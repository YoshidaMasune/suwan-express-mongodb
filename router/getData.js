const router = require('express').Router();

const Users = require('../models/users');
const Addresses = require('../models/address');
const Addmin = require('../models/addmin')

router.get('/', async (req, res) => {
   try{
      const data =  await Addresses.find().populate('user').exec()
      const users = data.map(user => {
         return {
            _id: user._id,
            user: user.user.user,
            fname: user.user.first_name,
            lname: user.user.last_name,
            jaya: user.jaya,
            miter: user.miter,
            section: user.section,
            foor: user.foor,
            room: user.room
         }
      })

      // res.render('index', {users: users})
      res.json(data)
   }catch(err) {
      console.log(err)
      res.status(500).send('server errer')
   }
});

router.get('/user/:_id', async (req, res) => {
   try {
      const _id = req.params._id
      const data = await Addresses.findById(_id).populate('user').exec()
      res.status(200).json(data)
   } catch (err) {
      console.log(err);
      res.status(500).send('server intenal error')
   }
})

router.get('/price', (req, res) => {
   Addmin.findOne({password: req.body.password})
})

module.exports = router;