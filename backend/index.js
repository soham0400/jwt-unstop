const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter')
const dataRouter = require('./routes/dataRouter')
require('./models/db');
require('dotenv').config();

const PORT = 8080

app.get('/ping',(req,res)=>{
    res.send('PONG')
})

app.use(bodyParser.json())
app.use(cors())
app.use('/auth',authRouter)
app.use('/data',dataRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

