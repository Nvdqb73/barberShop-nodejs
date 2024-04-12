const Customer = require('../models/Customer');
const asyncHandler = require('express-async-handler');

class CustomerController {
    // [POST] /api/v1/customers/create
    create = asyncHandler(async (req, res, next) => {
        const newCustomer = await Customer.create(req.body);
        return res.status(200).json({
            success: newCustomer ? true : false,
            createdCustomer: newCustomer ? newCustomer : 'Cannot create new customer',
        });
    });

    // [GET] /api/v1/customers/
    getAll = asyncHandler(async (req, res, next) => {
        const customers = await Customer.find();
        return res.status(customers ? 200 : 404).json({
            success: customers ? true : false,
            customersData: customers ? customers : 'Cannot get customers ',
        });
    });

    // [GET] /api/v1/customers/:cId
    getById = asyncHandler(async (req, res, next) => {
        const { cId } = req.params;
        const customer = await Customer.findById(cId);
        return res.status(customer ? 200 : 404).json({
            success: customer ? true : false,
            customerData: customer ? customer : 'Cannot get customer',
        });
    });

    // [UPDATE] /api/v1/customers/:cId
    update = asyncHandler(async (req, res, next) => {
        const { cId } = req.params;
        const updatedCustomer = await Customer.findByIdAndUpdate(cId, req.body, { new: true });
        return res.status(updatedCustomer ? 200 : 404).json({
            success: updatedCustomer ? true : false,
            customerData: updatedCustomer ? updatedCustomer : 'Cannot update customer',
        });
    });

    // [DELETE] /api/v1/customers/:cId
    delete = asyncHandler(async (req, res, next) => {
        const { cId } = req.params;
        const deletedCustomer = await Customer.findByIdAndDelete(cId);
        return res.status(deletedCustomer ? 200 : 404).json({
            success: deletedCustomer ? true : false,
            customerData: deletedCustomer ? deletedCustomer : 'Cannot delete customer',
        });
    });
}

module.exports = new CustomerController();
