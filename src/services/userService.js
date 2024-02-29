const bcrypt = require('bcryptjs');
const User = require('../models/user');
const apiTimeZone = require('../api/time-zone')
const client = require('./mongo')

// MongoDB setup is used by both admin and user functionalities, so it's included in both parts

exports.registerUser = async (username, password) => {
    try {
        return createUser(username, password);
    } catch (error) {
        throw new Error('Failed to register user: ' + error.message);
    }
};

exports.getUserByUsername = async (username) => {
    try {
        const users = await client.db("countryGuide1").collection("users");
        const user =  await users.findOne({username: username});
        return user
    } catch (error) {
        throw Error('getUserByUsername failed: ' + error.message);
    }
};

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

exports.getData = async (countryName, lat, lng) => {
    let map = new Map();
    let timeZone = apiTimeZone.getTimeZoneInfoByCountryCode(lat, lng);
    let news = apiNews.getNews(countryName, timeZone.substring(0, 10), timeZone.substring(0, 10));

    map.set('news', news);
    map.set('timeZone', timeZone);
    return map;
}

const createUser = async (username, password, role = 'user') => {
    try {
        const db = (await client).db("countryGuide1").collection("users");
        const hash = await bcrypt.hash(password, 10);
        const user = new User({username: username, password: hash, role: role});
        const result = await db.insertOne(user);
        return result;
    } catch (error) {
        if (error.code === 'P2002' && error.meta.target.includes('username')) {
            throw new Error('Username already exists');
        } else {
            throw new Error('Failed to create user: ' + error.message);
        }
    }
};

// MongoDB connection setup
