const mongoose = require('mongoose');
const DB = "jvcBlogs";

mongoose.connect("mongodb+srv://Joe:JoVCo2334@cluster0.tittqfa.mongodb.net/" + DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Connected to ${DB} database`))
    .catch(err => console.log(`Error connecting to ${DB}`, err));