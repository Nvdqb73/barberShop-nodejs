const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async ({ email, resetToken }) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    async function main() {
        const info = await transporter.sendMail({
            from: '"BarberShop 👻" <no-reply@barbarShop.email>',
            to: email,
            subject: 'Forgot password ✔',
            html: `Xin vui lòng click vào link dưới đấy để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.CLIENT_URL}/resetpassword/${resetToken}>Click here</a>`, // html body
        });

        return info;
    }
    return await main();
});

module.exports = sendMail;
