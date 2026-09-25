const jwt = require('jsonwebtoken')
// const { error } = require('node:console')

function auth(req, res, next) {
    const token = req.headers.authorization
    

    if (!token) {
    return res.status(401).json({ error: 'no token provided'})
    }

    const header = token.split(' ')[1]
    console.log('Received token:', header)

    try {
        const decoded = jwt.verify(header, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
    console.error('JWT verify error:', error.name, error.message)
    return res.status(401).json({ error: 'invalid or token has expired' })
    }
}

module.exports = auth