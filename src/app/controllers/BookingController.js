const Booking = require('../models/Booking');
const asyncHandler = require('express-async-handler');

class BookingController {
    // [POST] /api/v1/bookings/create
    create = asyncHandler(async (req, res, next) => {
        const newBooking = await Booking.create(req.body);
        return res.status(200).json({
            success: newBooking ? true : false,
            createdBooking: newBooking ? newBooking : 'Cannot create new booking',
        });
    });

    // [GET] /api/v1/bookings/
    getAll = asyncHandler(async (req, res, next) => {
        const bookings = await Booking.find();
        return res.status(bookings ? 200 : 404).json({
            success: bookings ? true : false,
            bookingsData: bookings ? bookings : 'Cannot get bookings',
        });
    });

    // [GET] /api/v1/bookings/trash
    getTrash = asyncHandler(async (req, res, next) => {
        const trashBookings = await Booking.findWithDeleted({ deleted: true });
        return res.status(trashBookings ? 200 : 404).json({
            success: trashBookings ? true : false,
            trashBookingsData: trashBookings ? trashBookings : 'Cannot get trashBookings',
        });
    });

    // [GET] /api/v1/bookings/:bId
    getById = asyncHandler(async (req, res, next) => {
        const { bId } = req.params;
        const booking = await Booking.findById(bId);
        return res.status(booking ? 200 : 404).json({
            success: booking ? true : false,
            bookingData: booking ? booking : 'Cannot get booking',
        });
    });

    // [UPDATE] /api/v1/bookings/:bId
    update = asyncHandler(async (req, res, next) => {
        const { bId } = req.params;
        const updatedBooking = await Booking.findByIdAndUpdate(bId, req.body, { new: true });
        return res.status(updatedBooking ? 200 : 404).json({
            success: updatedBooking ? true : false,
            bookingData: updatedBooking ? updatedBooking : 'Cannot update booking',
        });
    });

    // [DELETE] /api/v1/bookings/:bId
    softDelete = asyncHandler(async (req, res, next) => {
        const { bId } = req.params;
        const softDeletedBooking = await Booking.deleteById(bId);
        return res.status(softDeletedBooking ? 200 : 404).json({
            success: softDeletedBooking ? true : false,
            bookingData: softDeletedBooking ? softDeletedBooking : 'Cannot soft delete booking',
        });
    });

    // [DELETE] /api/v1/bookings/:bId/force
    forceDestroy = asyncHandler(async (req, res, next) => {
        const { bId } = req.params;
        const deletedBooking = await Booking.findByIdAndDelete(bId);
        return res.status(deletedBooking ? 200 : 404).json({
            success: deletedBooking ? true : false,
            bookingData: deletedBooking ? deletedBooking : 'Cannot force destroy booking',
        });
    });

    // [PATCH] /api/v1/bookings/:bId/restore
    restore = asyncHandler(async (req, res, next) => {
        const { bId } = req.params;
        const restoreBooking = await Booking.restore({ _id: bId });
        return res.status(restoreBooking ? 200 : 404).json({
            success: restoreBooking ? true : false,
            bookingData: restoreBooking ? restoreBooking : 'Cannot restore booking',
        });
    });
}

module.exports = new BookingController();
