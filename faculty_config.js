const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login");

// Check database connected or not
connect.then(() => {
    console.log("Teacher Database Connected Successfully");
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
    department: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
});

// Create a Mongoose model based on the schema
const Teacher = mongoose.model("teachers", LoginSchema);

module.exports = Teacher;
