const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const collection = require("./config");
const Teacher = require('./faculty_config');
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.redirect('/index.html');
    // res.sendFile(__dirname+'/views/index.html');
});

app.get('/admin_login', (req, res) => {
    res.render('admin_login');
});

app.get('/teacher_login', (req, res) => {
    res.render('teacher_login');
});

app.get('/add_faculty', (req, res) => {
    res.render('add_faculty');
});

app.get('/add_student', (req, res) => {
    res.render('add_student');
});

app.get('/edit_timetable', (req, res) => {
    res.render('edit_timetable');
});

app.get('/Manual_Attendance', (req, res) => {
    res.redirect('/manualAttendance.html');
});
app.get('/manageStudents', (req, res) => {
    res.render('manageStudents');
});

app.post("/admin_login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const check = await collection.findOne({ email });

        if (!check) {
            console.log("User email not found:", email);
            return res.status(404).send("User email not found");
        }

        const isPasswordMatch = await bcrypt.compare(password, check.password);

        if (!isPasswordMatch) {
            console.log("Wrong password for email:", email);
            return res.status(401).send("Wrong password");
        }

        // Successful login
        res.render("admin_home");
    } catch (e) {
        console.error("Error in admin_login:", e);
        res.status(500).send("Internal server error");
    }
});



app.post('/add_faculty', async (req, res) => {
    try {
        const { email, name, department, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = new Teacher({
            email,
            name,
            department,
            password: hashedPassword, 
        });

        await newTeacher.save();

        res.status(201).send('Teacher added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/faculty_login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const check = await Teacher.findOne({ email });

        if (!check) {
            console.log("User email not found:", email);
            return res.status(404).send("User email not found");
        }

        const isPasswordMatch = await bcrypt.compare(password, check.password);

        if (!isPasswordMatch) {
            console.log("Wrong password for email:", email);
            return res.status(401).send("Wrong password");
        }

        // Successful login
        res.render("faculty_dashboard");
    } catch (e) {
        console.error("Error in admin_login:", e);
        res.status(500).send("Internal server error");
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
