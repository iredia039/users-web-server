function authorizeAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).send('unauthorized')
    } else {
        next()
    }
}

module.exports = authorizeAdmin