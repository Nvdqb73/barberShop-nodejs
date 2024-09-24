const asyncHandler = require('express-async-handler');
const OAuth2Client = require('../../utils/oAuth2Client');
const google = require('@googleapis/calendar');
const Booking = require('../models/Booking');
const DetailService = require('../models/DetailService');
const Branch = require('../models/Branch');
const Servicer = require('../models/Service');
const Employee = require('../models/Employee');

class CalenderController {
    createEvent = asyncHandler(async (req, res, next) => {
        if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
        // const cookie = req.cookies;
        // if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookie');
        const { branchId, serviceId, employeeId, description, startDate, endDate, customerId, myCookie } = req.body;

        const branch = await Branch.findById(branchId);
        const service = await Servicer.findById(serviceId);
        const employee = await Employee.findById(employeeId);
        if (!branch && service && employee) {
            throw new Error('Error branch && service && employee');
        }

        await OAuth2Client.setCredentials({ refresh_token: myCookie });
        const calender = google.calendar('v3');
        const response = await calender.events.insert({
            auth: OAuth2Client,
            calendarId: 'primary',
            requestBody: {
                summary: 'Đặt lịch BarberShop',
                description: `
                Chi nhánh: ${branch?.branchName}
                Dịch vụ: ${service?.serviceName}
                Nhân viên: ${employee?.firstName} ${employee?.lastName} 
                Mô tả:${description}`,
                guestsCanModify: true,
                color: '6',
                start: {
                    dateTime: new Date(startDate),
                },
                end: {
                    dateTime: new Date(endDate),
                },
            },
        });
        if (!response?.status === 200) {
            throw new Error('Error create event');
        }
        const newBooking = await Booking.create({ startDate, endDate, description, customerId, branchId, employeeId });
        if (!newBooking) throw new Error('Cannot create new booking');
        const newDetailService = await DetailService.create({ bookingId: newBooking?._id, serviceId: serviceId });
        if (!newDetailService) throw new Error('Cannot create new detailService ');
        return res.status(200).json({
            success: newDetailService ? true : false,
            createdDetailService: newDetailService ? newDetailService : 'Cannot create new booking',
        });
    });

    getAll = asyncHandler(async (req, res, next) => {
        const { myCookie } = req.body;
        console.log('cookie', myCookie);
        if (!myCookie) throw new Error('No refresh token in cookie');
        await OAuth2Client.setCredentials({ refresh_token: myCookie });
        const calender = google.calendar('v3');
        const eventList = await calender.events.list({
            auth: OAuth2Client,
            calendarId: 'primary',
            maxResults: 5,
        });

        res.status(200).json({
            success: eventList ? true : false,
            eventList: eventList?.data?.items,
        });
    });
}

module.exports = new CalenderController();
