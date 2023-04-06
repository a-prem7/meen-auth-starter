
// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const methodOverride = require('method-override');


// Dependencies 
const mongoose = require('mongoose');

// Database Configuration
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Middleware
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));

// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// Routes / Controllers

const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);

const userController = require('./controllers/users');
app.use('/users', userController);


// Routes / Controllers

// Routes / Controllers

app.get('/', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser
	});
});


app.get('/', (req, res) => {
	if (req.session.currentUser) {
		res.render('dashboard.ejs', {
			currentUser: req.session.currentUser
		});
	} else {
		res.render('index.ejs', {
			currentUser: req.session.currentUser
		});
	}
});






// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));