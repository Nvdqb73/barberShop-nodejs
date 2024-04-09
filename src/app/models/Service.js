const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

var ServiceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0,
        min: 0,
    },
    serviceTime: {
        type: String,
        required: true,
    },
});

//Add plugins
ServiceSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

//Export the model
module.exports = mongoose.model('Service', ServiceSchema);
