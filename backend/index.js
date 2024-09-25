const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const File = require("./mongodb"); 

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mukulved07:sXXCXdeb5le04Zh2@cluster0.qxkhg.mongodb.net/Mean', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Endpoint to upload files
app.post("/upload", upload.single("file"), async (req, res) => {
    if (req.file) {
        const newFile = new File({
            name: req.body.name || req.file.originalname,
            headers: req.body.headers || "false",
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
        });

        try {
            const savedFile = await newFile.save();
            res.json({ message: "File uploaded successfully", file: savedFile });
        } catch (error) {
            res.status(500).json({ message: "Error saving file to database", error });
        }
    } else {
        res.json({ message: "No file uploaded", file: null });
    }
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
