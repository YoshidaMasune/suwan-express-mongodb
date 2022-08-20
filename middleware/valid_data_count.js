// Model
const Addresses = require('../models/address')

const validCouterAdd = async (req, res, next) => {
   const inp = req.body;
   
   const check = await Addresses.findOne({section: inp.section, foor: inp.foor, room: inp.room}).exec();

   if (check){
      res.status(203).json({status: 'has 1 user'})
   }else{
      next()
   }
}

module.exports = validCouterAdd;