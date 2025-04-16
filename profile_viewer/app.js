import express from 'express';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { User } from './models/userModel.js';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://pinkmanjessy100:MS5LbXrvkTPLWWO4@nodedatabase.zqft8.mongodb.net/monkey');
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('Connection error: ', err);
});

// Multer Configuration for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });

// Default route
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Handle form submission
app.post('/form', upload.single('photo'), async (req, res) => {
    try {
        const { name, rollNo, year, semester, email, phone, address, college } = req.body;
    console.log(req.body);

    const marksArray = Array.isArray(req.body.marks) ? req.body.marks.filter(mark => mark) : [];
    console.log(marksArray); 
      
        const totalMarks = marksArray.reduce((sum, mark) => sum + Number(mark), 0);
        const percentage = (totalMarks / marksArray.length).toFixed(2);
        const cgpa = calculateCGPA(marksArray);

        const newUser = new User({
            name,
            rollNo,
            year,
            semester,
            email,
            phone,
            address,
            college,
            subjects: req.body.subject,
            marks: marksArray,
            totalMarks,
            cgpa,
            percentage,
            photo: req.file ? `/uploads/${req.file.filename}` : '/uploads/admin.png'
        });

        await newUser.save();
        res.redirect(`/profile/${newUser._id}`);
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send('Internal Server Error');
    }
});



app.get('/profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
            res.render('profile.ejs', { user });
      
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Internal Server Error');
    }
});


//marksheet
app.get('/marksheet', async (req, res) => {
    try {
        const user = await User.findById(req.query.id);
        console.log(user);
        if (!user) {
            console.log('User not found');
            return res.redirect('/');
        }
      
        const totalMarks = user.marks.reduce((sum, mark) => sum + parseInt(mark), 0);
        const percentage = (totalMarks / (user.marks.length * 100)) * 100; 
        const cgpa = percentage / 9.5; 
        res.render('marksheet.ejs', { 
            user, 
            totalMarks, 
            percentage: percentage.toFixed(2), 
            cgpa: cgpa.toFixed(2) 
        });
    } catch (err) {
        console.error("Error fetching marksheet:", err);
        res.status(500).send("Server Error");
    }
});

//logout
app.get('/logout', (req, res) => {
        res.redirect('/'); 
});

// CGPA calculation function
function calculateCGPA(marks) {
    const credits = [4, 4, 4, 4, 3];  //credits
    let totalWeightedGradePoints = 0;
    let totalCredits = 0;

    marks.forEach((mark, index) => {
        let gradePoint;
        if (mark >= 85) gradePoint = 10;
        else if (mark >= 75) gradePoint = 9;
        else if (mark >= 65) gradePoint = 8;
        else if (mark >= 50) gradePoint = 6;
        else if (mark >= 40) gradePoint = 4;
        else gradePoint = 2;

        totalWeightedGradePoints += gradePoint * credits[index];
        totalCredits += credits[index];
    });

    return (totalWeightedGradePoints / totalCredits).toFixed(2);  // Return CGPA
}


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
