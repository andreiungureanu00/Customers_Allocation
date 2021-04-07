const express = require('express');
const router = express.Router();
const EmployeeModel = require('../Mongo/models/employeeModel');

router.get('/', async(req, res) => {
    const projectID = req.query.project_id;

    if (projectID) {
        try {
            const employees = await EmployeeModel.find({
                project_id: projectID,
            }).exec();
            res.status(200).send(employees);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    } else {
        try {
            const employees = await EmployeeModel.find().exec();
            res.status(200).send(employees);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
});

router.post('/', async(req, res) => {
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const query = 'INSERT INTO employees SET ?';

    const employee = new EmployeeModel(req.body);
    employee.hire_date = new Date(employee.hire_date);

    const valid = emailRegex.test(employee.email);
    if (!valid) res.status(500).send('Wrong email format');

    try {
        const result = await employee.save();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.put('/:id', async(req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id).exec();
        employee.set(req.body);
        const result = await employee.save();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const result = await EmployeeModel.deleteOne({
            _id: req.params.id,
        }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
