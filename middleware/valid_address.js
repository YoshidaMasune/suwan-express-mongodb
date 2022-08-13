
// CHECK { section.length !> 2 && foor.length !> 3 && room !> 5

const Addresses = require('../models/address')

const validdata = (req, res, next) => {
   const check = req.body;
   if (check.section <= 2 && check.foor <= 3 && check.room <= 5){
      next()
   }else{
      res.status(400).send('bad request')
   }
}

module.exports = validdata