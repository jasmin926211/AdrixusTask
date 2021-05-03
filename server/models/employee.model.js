const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    index: {
        type: Number,
    },
    isActive: {
        type: String,
    },
    age: {
        type: Number,
    },
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    gender: {
        type: String,
    }
});

mongoose.model('Employee', employeeSchema);