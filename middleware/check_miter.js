const Addresses = require('../models/address')

const check_miter = async (req, res, next) => {
   
   try {
      const data = await Addresses.findById(req.body._id).exec()
      if (data){
         if (req.body.miter.toString().length > 4){
            res.status(400).send('miter morethen 0000')
         }else{
            next()
         }
      }else{
         res.status(404).send('not found this user')
      }     
   } catch (error) {
      console.log(error);
      res.status(500).send(error)
   }
}

module.exports = check_miter;