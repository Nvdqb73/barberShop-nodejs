const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async ({ email, resetToken }) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"BarberShop 👻" <no-reply@barbarShop.email>', // sender address
            to: email, // list of receivers
            subject: 'Forgot password ✔', // Subject line
            html: `Xin vui lòng click vào link dưới đấy để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.SERVER_URL}/api/v1/users/resetpassword/${resetToken}>Click here</a>`, // html body
        });

        return info;
    }
    return await main();
});

module.exports = sendMail;
