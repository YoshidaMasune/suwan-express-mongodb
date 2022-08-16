const create_valid_miter = (req, res, next) => {
   if (req.body.miter.toString().length > 4){
      res.status(400).send('miter number Invalided')
   }else{
      next()
   }
}

module.exports = create_valid_miter;