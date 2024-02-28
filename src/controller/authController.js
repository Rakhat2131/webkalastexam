const { registerUser, AuthenticateUser, getUserByUsername} = require('../services/userService');
const { generateToken } = require('../utils/jwt/jwt');
const { setCookie } = require('../utils/cookies/cookie');

exports.Login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const auth = await AuthenticateUser(username, password);
        if (!auth) {
            return res.render('login', { message: 'Invalid username or password' });
        }

        const token = generateToken({ username });

        res.cookie('token', token, { httpOnly: true });
        const user = await getUserByUsername(username);
        // console.log(user)
        if (user.role === 'admin') {
            return res.redirect('/admin/dashboard');
        } else {
            return res.redirect('/main/home');
        }
    } catch (error) {
        return res.render('login', { message: 'Internal server error' });
    }
};


exports.Register = async (req, res) => {
    const { username, password } = req.body;
    try {
        await registerUser(username, password);
        return res.render('login', { message: ''});
    } catch (error) {
        return res.render('register', { message: error.toString()});
    }
};

