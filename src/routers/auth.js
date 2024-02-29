const express = require('express')
const router = express.Router()
const { Login, Register } = require('../controller/authController');

//login
router.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error') });
});
router.post('/login', Login);

//logout
router.get('/register', (req, res) => {
    res.render('register', { message: req.flash('error') });
});
router.post('/register', Register);

router.get('/quiz', (req, res) => {
    res.render('quiz'); // Adjust the template name if needed
});

module.exports = router;