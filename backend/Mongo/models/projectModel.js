var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    id: {
        type: String,
    },
    project_name: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    planned_end_date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    project_code: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
});

const Project = (module.exports = mongoose.model('Project', projectSchema));
module.exports = Project;
