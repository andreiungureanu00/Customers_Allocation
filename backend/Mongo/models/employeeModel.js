var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hire_date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    job_title: {
        type: String,
        required: true,
    },
    project_id: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
});

const Employee = (module.exports = mongoose.model('Employee', employeeSchema));
module.exports = Employee;
