const asyncHandler = require('express-async-handler');
const Employee = require('../models/Employee');
const Customer = require('../models/Customer');

const isAdmin = asyncHandler(async (req, res, next) => {
    const { role } = req.user;
    if (role !== 'admin') {
        return res.status(401).json({
            success: false,
            mes: 'Require admin role!',
        });
    }
    next();
});

const isUIdExistEmployee = asyncHandler(async (req, res, next) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    const { uId } = req.body;
    const user = await Employee.findOne({ uId });
    if (user === null) {
        next();
    } else {
        throw new Error('UId already exists in document employee!');
    }
});

const isUIdExistCustomer = asyncHandler(async (req, res, next) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    const { uId } = req.body;
    const user = await Customer.findOne({ uId });
    if (user === null) {
        next();
    } else {
        throw new Error('UId already exists in document customer!');
    }
});

module.exports = { isAdmin, isUIdExistEmployee, isUIdExistCustomer };
