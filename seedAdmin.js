require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/user');

const adminUser = {
    username: 'adminUsername',
    password: 'adminPassword',
    email: 'admin@example.com', 
    role: 'admin',


};

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB...');
    } catch (error) {
        console.error('Could not connect to MongoDB:', error);
        process.exit(1);
    }
}

async function createAdmin() {
    try {
        const userExists = await User.findOne({ username: adminUser.username }).exec();
        if (userExists) {
            console.log('Admin user already exists.');
            return;
        }

        const hashedPassword = await bcrypt.hash(adminUser.password, 10);
        const user = new User({
            username: adminUser.username,
            password: hashedPassword,
            role: adminUser.role,
        });

        await user.save();
        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Failed to create admin user:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

async function runSeeder() {
    await connectDB();
    await createAdmin();
}

runSeeder();
