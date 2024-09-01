require('dotenv').config(); // Ensure this is at the top

const mongoose = require('mongoose');

// Log the MongoDB URI to check if it's loaded correctly
console.log('MongoDB URI:', process.env.MONGOURI);

// Connect to MongoDB
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const Todoschema = new mongoose.Schema({
    task: String,
    taskdone: {
        type: Boolean,
        default: false
    }
});

const Taskmodel = mongoose.model('todos', Todoschema);

module.exports = Taskmodel;
