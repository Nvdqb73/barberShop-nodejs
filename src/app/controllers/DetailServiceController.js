const DetailService = require('../models/DetailService');
const asyncHandler = require('express-async-handler');

class BookingController {
    // [POST] /api/v1/detailServices/create
    create = asyncHandler(async (req, res, next) => {
        if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
        const newDetailService = await DetailService.create(req.body);
        return res.status(200).json({
            success: newDetailService ? true : false,
            createdDetailService: newDetailService ? newDetailService : 'Cannot create new detailService',
        });
    });

    // [GET] /api/v1/detailServices/
    getAll = asyncHandler(async (req, res, next) => {
        const detailServices = await DetailService.find();
        return res.status(detailServices ? 200 : 404).json({
            success: detailServices ? true : false,
            detailServicesData: detailServices ? detailServices : 'Cannot get detailServices',
        });
    });

    // [GET] /api/v1/detailServices/trash
    getTrash = asyncHandler(async (req, res, next) => {
        const trashDetailServices = await DetailService.findWithDeleted({ deleted: true });
        return res.status(trashDetailServices ? 200 : 404).json({
            success: trashDetailServices ? true : false,
            trashDetailServicesData: trashDetailServices ? trashDetailServices : 'Cannot get trashDetailServices',
        });
    });

    // [GET] /api/v1/detailServices/:dsId
    getById = asyncHandler(async (req, res, next) => {
        const { dsId } = req.params;
        const detailService = await DetailService.findById(dsId);
        return res.status(detailService ? 200 : 404).json({
            success: detailService ? true : false,
            detailServiceData: detailService ? detailService : 'Cannot get detailService',
        });
    });

    // [UPDATE] /api/v1/detailServices/:dsId
    update = asyncHandler(async (req, res, next) => {
        const { dsId } = req.params;
        const updatedDetailService = await DetailService.findByIdAndUpdate(dsId, req.body, { new: true });
        return res.status(updatedDetailService ? 200 : 404).json({
            success: updatedDetailService ? true : false,
            DetailServiceData: updatedDetailService ? updatedDetailService : 'Cannot update detailService',
        });
    });

    // [DELETE] /api/v1/detailServices/:dsId
    softDelete = asyncHandler(async (req, res, next) => {
        const { dsId } = req.params;
        const softDeletedDetailService = await DetailService.deleteById(dsId);
        return res.status(softDeletedDetailService ? 200 : 404).json({
            success: softDeletedDetailService ? true : false,
            detailServiceData: softDeletedDetailService ? softDeletedDetailService : 'Cannot soft delete detailService',
        });
    });

    // [DELETE] /api/v1/detailServices/:dsId/force
    forceDestroy = asyncHandler(async (req, res, next) => {
        const { dsId } = req.params;
        const deletedDetailService = await DetailService.findByIdAndDelete(dsId);
        return res.status(deletedDetailService ? 200 : 404).json({
            success: deletedDetailService ? true : false,
            detailServiceData: deletedDetailService ? deletedDetailService : 'Cannot force destroy detailService',
        });
    });

    // [PATCH] /api/v1/detailServices/:dsId/restore
    restore = asyncHandler(async (req, res, next) => {
        const { dsId } = req.params;
        const restoreDetailService = await DetailService.restore({ _id: dsId });
        return res.status(restoreDetailService ? 200 : 404).json({
            success: restoreDetailService ? true : false,
            detailServiceData: restoreDetailService ? restoreDetailService : 'Cannot restore detailService',
        });
    });
}

module.exports = new BookingController();
