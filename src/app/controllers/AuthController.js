const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Customer = require('../models/Customer');
const OAuth2Client = require('../../utils/oAuth2Client');

class AuthController {
    loginGoogle = asyncHandler(async (req, res, next) => {
        // create URL login
        const url = OAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'profile',
                'email',
                'https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/calendar.events',
            ],
        });

        res.status(200).json({
            url,
        });
    });

    resultLoginGoogle = asyncHandler(async (req, res, next) => {
        const { userInfo, access_token, refresh_token } = req.dataUser;
        const userGoogleId = userInfo.resourceName.replace('people/', '');

        const existingUser = await User.findOne({
            email: userInfo.emailAddresses[0]?.value,
            googleId: { $exists: false },
        });
        if (existingUser) {
            existingUser.googleId = userGoogleId;
            existingUser.refreshToken = refresh_token;
            await existingUser.save();
            return res.status(200).json({
                success: true,
                access_token,
                existingUser,
            });
        } else {
            const userCurrent = await User.findOne({
                googleId: userGoogleId,
            });

            if (!userCurrent) {
                const newUser = await User.create({
                    username: userInfo.names[0]?.displayName,
                    email: userInfo.emailAddresses[0]?.value,
                    password: userInfo.etag,
                    googleId: userGoogleId,
                    refreshToken: refresh_token,
                });
                if (!newUser) {
                    throw new Error('error create user');
                }
                console.log('newUser', newUser);

                const newCustomer = await Customer.create({
                    firstName: userInfo.names[0]?.givenName,
                    lastName: userInfo.names[0]?.familyName,
                    uId: newUser?._id,
                });

                if (!newCustomer) {
                    throw new Error('error create customer');
                }

                // save refreshToken in cookie
                res.cookie('refreshToken', refresh_token, {
                    httpOnly: false,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });

                // Suy xét url
                return res
                    .redirect(
                        `http://localhost:3000/book/?name=${userInfo.names[0]?.displayName}&email=${userInfo.emailAddresses[0]?.value}`,
                    )
                    .status(200)
                    .json({
                        success: newUser ? true : false,
                        mes: newUser ? 'Register is successfully' : 'Something went wrong',
                        newUser,
                    });
            } else {
                return res
                    .redirect(
                        `http://localhost:3000/book/?name=${userInfo.names[0]?.displayName}&email=${userInfo.emailAddresses[0]?.value}`,
                    )
                    .status(200)
                    .json({
                        success: false,
                        mes: 'Account already exists!',
                        userInfo,
                    });
            }
        }
    });
}

module.exports = new AuthController();
