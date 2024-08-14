const express = require('express');
const session = require('express-session');
const SECRET_KEY = process.env.SECRET_KEY;

const sessionMiddleware = session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Note: secure: true requires HTTPS and false (going req with HTTP)
});

const checkSession = (req, res, next) => {
    if(req.session.user){
        const user = req.session.user;
        res.locals.user = user; // if user-login hai to locals me data send karega otherwise next se middleware ke bahar aa jayega
        next();
    }else{
        const admin = req.session.admin;
        res.locals.admin = admin; // if user-login hai to locals me data send karega otherwise next se middleware ke bahar aa jayega
        next();
    }
};

module.exports = { sessionMiddleware, checkSession };
