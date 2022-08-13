require('dotenv').config();
const express = require('express');
const { PORT } = process.env;
const cors = require('cors');
const condb = require('./config/condb')

const app = express();

app.use(cors());
app.use(express.json());

const createRouter = require('./router/create')
const getDataRouter = require('./router/getData')
const updateRouter = require('./router/updata')

app.use('/create', createRouter);
app.use('/', getDataRouter);
app.use('/update', updateRouter);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))