const Addresses = require('../models/address')

const check_miter = (req, res, next) => {
   if (req.body.miter.toString().length > 4){
      res.status(400).send('Bad request')
   }else{
      next()
   }
}

module.exports = check_miter;