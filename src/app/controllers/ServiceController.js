const Service = require('../models/Service');
const asyncHandler = require('express-async-handler');

class ServiceController {
    // [POST] /api/v1/services/create
    create = asyncHandler(async (req, res, next) => {
        if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
        const newService = await Service.create(req.body);
        return res.status(200).json({
            success: newService ? true : false,
            createdService: newService ? newService : 'Cannot create new service',
        });
    });

    // [GET] /api/v1/services/
    getAll = asyncHandler(async (req, res, next) => {
        const services = await Service.find();
        return res.status(services ? 200 : 404).json({
            success: services ? true : false,
            servicesData: services ? services : 'Cannot get services',
        });
    });

    // [GET] /api/v1/services/trash
    getTrash = asyncHandler(async (req, res, next) => {
        const trashServices = await Service.findWithDeleted({ deleted: true });
        return res.status(trashServices ? 200 : 404).json({
            success: trashServices ? true : false,
            trashServicesData: trashServices ? trashServices : 'Cannot get trashServices',
        });
    });

    // [GET] /api/v1/services/:sId
    getById = asyncHandler(async (req, res, next) => {
        const { sId } = req.params;
        const service = await Service.findById(sId);
        return res.status(service ? 200 : 404).json({
            success: service ? true : false,
            serviceData: service ? service : 'Cannot get service',
        });
    });

    // [UPDATE] /api/v1/services/update/:sId
    update = asyncHandler(async (req, res, next) => {
        const { sId } = req.params;
        if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
        const updatedService = await Service.findByIdAndUpdate(sId, req.body, { new: true });
        return res.status(updatedService ? 200 : 404).json({
            success: updatedService ? true : false,
            serviceData: updatedService ? updatedService : 'Cannot update service',
        });
    });

    // [DELETE] /api/v1/services/delete/:sId
    softDelete = asyncHandler(async (req, res, next) => {
        const { sId } = req.params;
        const softDeletedService = await Service.deleteById(sId);
        return res.status(softDeletedService ? 200 : 404).json({
            success: softDeletedService ? true : false,
            serviceData: softDeletedService ? softDeletedService : 'Cannot soft delete service',
        });
    });

    // [DELETE] /api/v1/services/:sId/force
    forceDestroy = asyncHandler(async (req, res, next) => {
        const { sId } = req.params;
        const deletedService = await Service.findByIdAndDelete(sId);
        return res.status(deletedService ? 200 : 404).json({
            success: deletedService ? true : false,
            serviceData: deletedService ? deletedService : 'Cannot force destroy service',
        });
    });
    // [PATCH] /api/v1/services/:sId/restore
    restore = asyncHandler(async (req, res, next) => {
        const { sId } = req.params;
        const restoreService = await Service.restore({ _id: sId });
        return res.status(restoreService ? 200 : 404).json({
            success: restoreService ? true : false,
            serviceData: restoreService ? restoreService : 'Cannot restore service',
        });
    });
}

module.exports = new ServiceController();
