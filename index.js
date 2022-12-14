require('dotenv').config();
const express = require('express');
const { PORT } = process.env;
const cors = require('cors');
const condb = require('./config/condb')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = "suwan-jsontoken-2022";
const ejs = require('ejs')
const path = require('path')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

const createRouter = require('./router/create')
const getDataRouter = require('./router/getData')
const updateRouter = require('./router/updata')
const deleteRouter = require('./router/delete')

const Addmin = require('./models/addmin');

app.post('/register', (req, res) => {
   const addmin = req.body;
   try {
      bcrypt.hash(addmin.password , 8, async (err, hash) => {
         if (err) throw err
         const newAddmin = await Addmin.create({
            username: addmin.username,
            email: addmin.email,
            password: hash
         })

         newAddmin.save();
         res.status(200).json(newAddmin)
      });     
   } catch (error) {
      console.log(error)
   }
})

app.post('/login', async (req, res) => {
   const addmin = await Addmin.findOne({username: req.body.username}).exec();
   if (addmin){
      if (addmin) {
         bcrypt.compare(req.body.password, addmin.password, function(err, login) {
            if(login){
               const token = jwt.sign({ username: addmin.username }, secret, {expiresIn: '1h'})
               res.status(200).json({status: "login", token})
   
            }else{
               res.status(200).json({status: "inlogin"})
            }
         });
      }
   }else{
      res.status(200).json({status: 'not found addmin/user'})
   }
   
})
app.post('/auth', (req, res) => {
   try {
      const token = req.headers.authorization.split(' ')[1]
      var decoded = jwt.verify(token, secret);
      res.json({status: "ok", decoded: decoded})    
   } catch (err) {
      res.json({status: "error", msg: err})
   }
   
})

app.use('/create', createRouter)
app.use('/', getDataRouter)
app.use('/update', updateRouter)
app.use('/delete', deleteRouter)

app.listen(PORT)