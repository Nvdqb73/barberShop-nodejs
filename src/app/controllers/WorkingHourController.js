const WorkingHour = require('../models/WorkingHour');
const asyncHandler = require('express-async-handler');

class WorkingHourController {
    // [POST] /api/v1/workingHours/create
    create = asyncHandler(async (req, res, next) => {
        const newWorkingHour = await WorkingHour.create(req.body);
        return res.status(200).json({
            success: newWorkingHour ? true : false,
            createdWorkingHour: newWorkingHour ? newWorkingHour : 'Cannot create new working hour',
        });
    });

    // [GET] /api/v1/workingHours/
    getAll = asyncHandler(async (req, res, next) => {
        const workingHours = await WorkingHour.find();
        return res.status(workingHours ? 200 : 404).json({
            success: workingHours ? true : false,
            workingHourData: workingHours ? workingHours : 'Cannot get working hours',
        });
    });

    // [GET] /api/v1/workingHours/:whId
    getById = asyncHandler(async (req, res, next) => {
        const { whId } = req.params;
        const workingHour = await WorkingHour.findById(whId);
        return res.status(workingHour ? 200 : 404).json({
            success: workingHour ? true : false,
            workingHourData: workingHour ? workingHour : 'Cannot get working hour',
        });
    });

    // [UPDATE] /api/v1/workingHours/update/:whId
    update = asyncHandler(async (req, res, next) => {
        const { whId } = req.params;
        const updatedWorkingHour = await WorkingHour.findByIdAndUpdate(whId, req.body, { new: true });
        return res.status(updatedWorkingHour ? 200 : 404).json({
            success: updatedWorkingHour ? true : false,
            workingHourData: updatedWorkingHour ? updatedWorkingHour : 'Cannot update working hour',
        });
    });

    // [DELETE] /api/v1/workingHours/delete/:whId
    delete = asyncHandler(async (req, res, next) => {
        const { whId } = req.params;
        const deletedWorkingHour = await WorkingHour.findByIdAndDelete(whId);
        return res.status(deletedWorkingHour ? 200 : 404).json({
            success: deletedWorkingHour ? true : false,
            workingHourData: deletedWorkingHour ? deletedWorkingHour : 'Cannot delete working hour',
        });
    });
}

module.exports = new WorkingHourController();
