const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login");

// Check database connected or not
connect.then(() => {
    console.log("Admin Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})


// Define the Mongoose schema
const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
});

// Create a Mongoose model based on the schema
const Admin = mongoose.model("Admins", LoginSchema);

module.exports = Admin;
