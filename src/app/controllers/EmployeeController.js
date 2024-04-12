const Employee = require('../models/Employee');
const asyncHandler = require('express-async-handler');

class EmployeeController {
    // [POST] /api/v1/employees/create
    create = asyncHandler(async (req, res, next) => {
        if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
        const newEmployee = await Employee.create(req.body);
        return res.status(200).json({
            success: newEmployee ? true : false,
            createdEmployee: newEmployee ? newEmployee : 'Cannot create new employee',
        });
    });

    // [GET] /api/v1/employees/
    getAll = asyncHandler(async (req, res, next) => {
        const employees = await Employee.find();
        return res.status(employees ? 200 : 404).json({
            success: employees ? true : false,
            employeesData: employees ? employees : 'Cannot get employees ',
        });
    });

    // [GET] /api/v1/employees/:eId
    getById = asyncHandler(async (req, res, next) => {
        const { eId } = req.params;
        const employee = await Employee.findById(eId);
        return res.status(employee ? 200 : 404).json({
            success: employee ? true : false,
            employeeData: employee ? employee : 'Cannot get employee',
        });
    });

    // [UPDATE] /api/v1/employees/:eId
    update = asyncHandler(async (req, res, next) => {
        const { eId } = req.params;
        if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
        const updatedEmployee = await Employee.findByIdAndUpdate(eId, req.body, { new: true });
        return res.status(updatedEmployee ? 200 : 404).json({
            success: updatedEmployee ? true : false,
            employeeData: updatedEmployee ? updatedEmployee : 'Cannot update employee',
        });
    });

    // [DELETE] /api/v1/employees/:eId
    delete = asyncHandler(async (req, res, next) => {
        const { eId } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(eId);
        return res.status(deletedEmployee ? 200 : 404).json({
            success: deletedEmployee ? true : false,
            employeeData: deletedEmployee ? deletedEmployee : 'Cannot delete employee',
        });
    });
}

module.exports = new EmployeeController();
