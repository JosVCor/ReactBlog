const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const AWS = require('aws-sdk');
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
require("./config/mongoose.config");

console.log("Before AWS.config.update()");

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-west-1',
});

console.log("After AWS.config.update()");
console.log(AWS.config.credentials);

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ... Rest of your code
require("./routes/blog_post.routes")(app);
require("./routes/blog_categories.routes")(app);
require("./routes/user.routes")(app);

// Handle the root path ("/").
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});