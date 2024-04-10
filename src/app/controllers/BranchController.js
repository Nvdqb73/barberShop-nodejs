const Branch = require('../models/Branch');
const asyncHandler = require('express-async-handler');

class BranchController {
    // [POST] /api/v1/branch/create
    create = asyncHandler(async (req, res, next) => {
        const newBranch = await Branch.create(req.body);
        return res.status(200).json({
            success: newBranch ? true : false,
            createdBranch: newBranch ? newBranch : 'Cannot create new branch',
        });
    });

    // [GET] /api/v1/branch/
    getAll = asyncHandler(async (req, res, next) => {
        const branch = await Branch.find();
        return res.status(branch ? 200 : 404).json({
            success: branch ? true : false,
            branchData: branch ? branch : 'Cannot get branch ',
        });
    });

    // [GET] /api/v1/branch/:bId
    getById = asyncHandler(async (req, res, next) => {
        const { bId } = req.params;
        const branch = await Branch.findById(bId);
        return res.status(branch ? 200 : 404).json({
            success: branch ? true : false,
            branchData: branch ? branch : 'Cannot get branch',
        });
    });

    // [UPDATE] /api/v1/branch/:bId
    update = asyncHandler(async (req, res, next) => {
        const { bId } = req.params;
        const updatedBranch = await Branch.findByIdAndUpdate(bId, req.body, { new: true });
        return res.status(updatedBranch ? 200 : 404).json({
            success: updatedBranch ? true : false,
            branchData: updatedBranch ? updatedBranch : 'Cannot update branch',
        });
    });

    // [DELETE] /api/v1/branch/:bId
    delete = asyncHandler(async (req, res, next) => {
        const { bId } = req.params;
        const deletedBranch = await Branch.findByIdAndDelete(bId);
        return res.status(deletedBranch ? 200 : 404).json({
            success: deletedBranch ? true : false,
            branchData: deletedBranch ? deletedBranch : 'Cannot delete branch',
        });
    });
}

module.exports = new BranchController();
