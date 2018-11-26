let admin = (req, res, next) => {
    if (req.user.role === 0) {
        return res.send('You do not have right to access this page')
    }
    next();
};

module.exports = { admin }