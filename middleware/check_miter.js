const Addresses = require('../models/address')

const check_miter = async (req, res, next) => {
   const data = await Addresses.findById(req.body._id).exec()
   if (req.body.miter.toString().length > 4){
      res.status(400).send('Bad request')
   }else{
      if (data.miter.sort((a,b) => b-a)[0] >= req.body.miter){
         res.status(200).send('miter no modify')
      }else{
         next()  
      }
      
   }
}

module.exports = check_miter;