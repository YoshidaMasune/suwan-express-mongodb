// Model
const Addresses = require('../models/address')

const validCouterAdd = async (req, res, next) => {
   const inp = req.body;
   
   const check = await Addresses.findOne({section: inp.section, foor: inp.foor, room: inp.room}).exec();

   if (check){
      res.status(203).send('has 1 record')
   }else{
      next()
   }
}

module.exports = validCouterAdd;