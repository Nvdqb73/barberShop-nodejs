const mongoose = require('mongoose');

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        if (conn.connection.readyState === 1) {
            console.log('DB Connected is successfully');
        } else {
            console.log('DB connect is failed');
        }
    } catch (error) {
        console.log('DB connect is failed');
        throw new Error(error);
    }
};

module.exports = { connect };
