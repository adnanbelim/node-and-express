const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// Function to generate JWT token

function generateToken(user) {
    return jwt.sign({ userId: user.id, userEmail: user.email }, SECRET_KEY, { expiresIn: '1h' });
};

// Middleware to verify JWT

function verifyToken(req, res, next) {
    const token = req.session.token;
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }
        req.user = decoded; // Attach decoded user information to request object
        next();
    });
}

module.exports = {generateToken, verifyToken};