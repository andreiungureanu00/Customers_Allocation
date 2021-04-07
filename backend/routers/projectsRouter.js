const express = require('express');
const router = express.Router();
require('../Mongo/config').connection;
const ProjectModel = require('../Mongo/models/projectModel');

router.get('/', async(req, res) => {
    try {
        var result = await ProjectModel.find().exec();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const result = await ProjectModel.findById(req.params.id).exec();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/', async(req, res) => {
    try {
        const project = new ProjectModel(req.body);
        const result = await project.save();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.put('/:id', async(req, res) => {
    try {
        const project = await ProjectModel.findById(req.params.id).exec();
        project.set(req.body);
        const result = await project.save();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        var result = await ProjectModel.deleteOne({
            _id: req.params.id,
        }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
