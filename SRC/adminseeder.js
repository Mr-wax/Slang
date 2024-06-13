import mongoose from 'mongoose';
// import * as crypto from "node:crypto";
import {hashValue} from "../SRC/controllers/auth.Controller.js";
import User from "../SRC/models/user.model.js";

const seedAdminUser = async () => {
    try {

        await mongoose.connect("mongodb://localhost:27017/FROG-APP");

        const adminDetails = {
            name:"SlangAdmin",
            userName:"MainSlang",
            phoneNumber: '09036687238',
            email: 'Ponwaxxx@gmail.com',
            password: hashValue("adminPassword"),
            isAdmin: true,
            profilePic: '',
            role: 'Admin',
            gender:"Male"

        };


        // Create the Signup document
        const adminUser = new User(adminDetails);
        const seededAdmin = await adminUser.save();


        await seededAdmin.save();

        console.log('Admin user seeded successfully');

    } catch (error) {
        console.error('Error seeding admin user:', error);
    } finally {
        // Disconnect from the database after seeding, whether success or failure
        await mongoose.disconnect();
    }
};

// Call the seeding function
seedAdminUser();