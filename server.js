const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const handleImage = require('./controllors/image');
const handleProfile = require('./controllors/profile');
const handleRegister = require('./controllors/register');
const handleSignin = require('./controllors/signin');

const db = knex({
    client: 'mysql',
    version: '8.0.19',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'bzg970430',
      database : 'smart-brain'
    }
});

// db.select('*').from('users').then(console.log);

const app = express();

app.use(express.json());
app.use(cors());


// root page
app.get('/', (req, res) => {
    db.select('id','name','email','entries','joined').from('users')
    .then(response => {
        res.json(response)
    })
})

// signin part
app.post('/signin', (req,res) => {handleSignin.handleSignin(req,res,db,bcrypt)} )

// register part
app.post('/register', (req,res) => {handleRegister.handleRegister(req,res,db,bcrypt)})

// profile part
app.get('/profile/:id', (req,res) => {handleProfile.handleProfile(req,res,db)} )

// image part
app.put('/image', (req,res) => {handleImage.handleImage(req,res,db)})

app.listen(process.env.PORT || 3000, () => {
    console.log('running on port 3000')
})
