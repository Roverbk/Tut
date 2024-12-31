const express = require('express')
const app = express();
const db = require('./db');
const Person = require('./models/person');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
});

//Routes
const menuItemRoutes = require('./routes/menuRoutes');
app.use('/menu',menuItemRoutes);
const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Listining at post 3000`);
});