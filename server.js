require('dotenv').config({ path: '.env' });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');




// Initialize Express
const app = express();



// Models
const User = require('./src/models/user');

// Routes
const authRoutes = require('./src/routers/auth');
const adminRouter = require('./src/routers/admin')
const indexRouter = require('./src/routers')

const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public')); // Serve static files
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: 'auto' }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy for login authentication
exports.AuthenticateUser = async (username, password) => {
    try {
        const user = await this.getUserByUsername(username);
        if (!user) {
            return false;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        return passwordMatch;
    } catch (error) {
        throw new Error('Authentication failed: ' + error.message);
    }
};
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

app.use('/auth', authRoutes);
app.use('/admin', adminRouter);
app.use('/main', indexRouter);
app.get('/', (req, res) => {res.render('index');});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
