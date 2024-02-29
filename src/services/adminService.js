const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Country = require("../models/country");

// MongoDB setup is used by both admin and user functionalities, so it's included in both parts
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

exports.registerAdmin = async (username, password) => {
    try {
        return createUser(username, password, 'admin');
    } catch (error) {
        throw new Error('Failed to register admin: ' + error.message);
    }
};

exports.addCountry = async (countryName, lat, lng) => {
    try {
        const newCountry = new Country({
            countryName: countryName,
            lat: lat,
            lng: lng
        });

        await newCountry.save();
        console.log(`Country ${countryName} added successfully.`);
        return { success: true, message: `Country ${countryName} added successfully.`, country: newCountry };
    } catch (error) {
        console.error('Error adding country:', error);
        return { success: false, message: 'Error adding country.', error: error.message };
    }
};

exports.deleteCountry = async (countryName) => {
    try {
        const result = await Country.deleteOne({ countryName: countryName });
        if (result.deletedCount === 0) {
            console.log(`No country found with the name ${countryName}.`);
            return { success: false, message: `No country found with the name ${countryName}.` };
        } else {
            console.log(`Country ${countryName} deleted successfully.`);
            return { success: true, message: `Country ${countryName} deleted successfully.` };
        }
    } catch (error) {
        console.error('Error deleting country:', error);
        return { success: false, message: 'Error deleting country.', error: error.message };
    }
};

exports.getAllCountries = async () => {
    try {
        const countries = await Country.find({});
        console.log(`Retrieved all countries successfully.`);
        return countries;
    } catch (error) {
        console.error('Error getting all countries:', error);
        return { success: false, message: 'Error getting all countries.', error: error.message };
    }
};

// MongoDB connection setup
async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Successfully connected to MongoDB!");
    } finally {
    }
}
run().catch(console.dir);
