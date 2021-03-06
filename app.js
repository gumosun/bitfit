 
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const bcryptjs = require('bcryptjs');

const app = express();

require('dotenv').config();


//middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

// views

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


/* setting up port & listen */
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`Port : ${PORT}`);
});


const newspressRoutes = require('./routes/newspress-routes');
app.use('/news', newspressRoutes);

const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

app.get('*', (req, res) => {
    const err = new Error('not found!');
    res.status(404).send(err);
});
