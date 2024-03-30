class UserController {
    // [GET] /api/v1/users
    index(req, res) {
        res.send('CONNER USER');
    }
}

module.exports = new UserController();
