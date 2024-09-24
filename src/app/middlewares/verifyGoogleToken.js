const { google } = require('googleapis');
const OAuth2Client = require('../../utils/oAuth2Client');
const asyncHandler = require('express-async-handler');

const handleGoogleLogin = asyncHandler(async (req, res, next) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }
    const { tokens } = await OAuth2Client.getToken(code);
    OAuth2Client.setCredentials({
        access_token: tokens?.access_token,
        refresh_token: tokens?.refresh_token,
        expiry_date: tokens?.expiry_date,
    });

    const people = google.people({
        version: 'v1',
        auth: OAuth2Client,
    });

    const userInfoResponse = await people.people.get({
        resourceName: 'people/me',
        personFields: 'emailAddresses,names,photos',
    });
    const userInfo = userInfoResponse.data;

    req.dataUser = {
        userInfo,
        access_token: tokens?.access_token,
        refresh_token: tokens?.refresh_token,
    };
    next();
});

module.exports = { handleGoogleLogin };
