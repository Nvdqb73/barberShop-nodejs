const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseDelete = require('mongoose-delete');

var detailServiceSchema = new mongoose.Schema(
    {
        bookingId: {
            type: mongoose.Types.ObjectId,
            ref: 'Booking',
            required: [true, 'detailService bookingId is required'],
        },
        serviceId: {
            type: mongoose.Types.ObjectId,
            ref: 'Service',
            required: [true, 'detailService serviceId is required'],
        },
    },
    {
        timestamps: true,
    },
);

//Add plugins
detailServiceSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
detailServiceSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

//constraint index => Xem xét
// detailServiceSchema.index({ bookingId: 1, serviceId: 1 }, { unique: true });

//Export the model
module.exports = mongoose.model('DetailService', detailServiceSchema);
