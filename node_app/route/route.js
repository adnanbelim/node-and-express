const express = require('express');
const route = express.Router();
const con = require('../config/connection');

const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../controllers/jwt');
const { sessionMiddleware, checkSession } = require('../controllers/session');
const path = require('path');
const { profile } = require('console');
const folderPath = 'C:/Users/Dell/OneDrive/Desktop/node_app/upload';

route.get('/', (req, res) => {
    const admin = req.session.admin;
    const user = req.session.user;

    // Always pass `user` and `admin` to the template
    res.render('home', { user: user ? user.name : undefined, admin: admin ? admin.name : undefined });
});
route.get('/details', verifyToken, (req, res) => {
    con.query("SELECT * FROM user", (err, result) => {
        if (err) {
            res.status(500).send('Server error or query not performed', err.message);
            res.send({ message: 'Query not performed' });
        } else {
            const admin = req.session.admin;
            const user = req.session.user; // Renamed to avoid conflict
            res.render('details', { profile: result, user : user ? user.name : undefined, admin: admin ? admin.name : undefined });
        }
    });
});



route.get('/delete', (req, res) => {
    // console.log('DELETE request received with ID:', req.query.id);
    let id = req.query.id;
    if (!id) {
        return res.status(400).send('ID parameter is missing');
    }

    con.query("DELETE FROM user WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('An error occurred while deleting the data');
        }
        res.redirect('/details');
    });
});





route.get('/profile', verifyToken, (req, res) => {
    con.query("SELECT * FROM user", (err, result) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return res.status(500).send('Server error or query not performed');
        }

        const admin = req.session.admin;
        const user = req.session.user;

        res.render('profile', {
            user: user ? [user]: undefined,
            admin: admin ? admin.name : undefined
        });
    });
});


route.get('/update', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const user = req.session.user;
    const admin = req.session.admin;

    res.render('update', {
        user: user ? [user] : undefined,
        admin: admin ? admin.name : null
    });
});


route.post('/update', verifyToken, (req, res) => {
    let sampleFile;

    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send('No file uploaded.');
    // }

    if (!req.files || Object.keys(req.files).length === 0) {
        const name = req.body.name;
        const post = req.body.post;
        const desc = req.body.desc;
        const id = req.body.id;

        if (!id) {
            return res.status(400).send('User ID is missing.');
        }

        const query = 'UPDATE user SET name = ?, post = ?, `desc` = ? WHERE id = ?';
        con.query(query, [name, post, desc, id], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Error updating profile.');
            }

            if (result.affectedRows === 0) {
                return res.status(404).send('User not found.');
            }

            res.send(`<script>
                        alert('Profile Updated Successfully');
                        window.location.href = '/profile';
                      </script>`);
        });
    } else {
        sampleFile = req.files.samplefile;
        const uploadPath = path.join(folderPath, sampleFile.name);

        sampleFile.mv(uploadPath, (err) => {
            if (err) {
                console.error('Error moving file:', err);
                return res.status(500).send('Error uploading file.');
            }

            const name = req.body.name;
            const post = req.body.post;
            const desc = req.body.desc;
            const filePath = sampleFile.name; // Full path for storing in database
            const id = req.body.id;

            if (!id) {
                return res.status(400).send('User ID is missing.');
            }

            const query = 'UPDATE user SET name = ?, post = ?, `desc` = ?, file = ? WHERE id = ?';
            con.query(query, [name, post, desc, filePath, id], (err, result) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return res.status(500).send('Error updating profile.');
                }

                if (result.affectedRows === 0) {
                    return res.status(404).send('User not found.');
                }

                res.redirect(`/profile`);
            });
        });
    }
});



route.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const passwordCycle = 10;
    try {

        // bcrypt of password
        const hashPassword = await bcrypt.hash(password, passwordCycle);

        con.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
            if (err) {
                throw err;
            }
            else if (result.length > 0) {
                res.send(`<script>
                        alert('email is already registered');
                        window.location.href = '/register';
                  </script>
                `);
            } else {
                con.query("INSERT INTO user(name, email, password) VALUES(?, ?, ?)", [name, email, hashPassword], (err) => {
                    if (err) throw err;
                    res.send(`<script>
                        alert('user added successfully');
                        window.location.href = '/login';
                  </script>
                `);
                })
            }
        })
    } catch (err) {
        console.error("Error in hashing password" + err.message);
        res.status(500).send({ message: 'Error hashing password' })
    }


});
route.post('/login', (req, res) => {
    const { email, password } = req.body;
    try {
        con.query("SELECT * FROM user WHERE email = ? LIMIT 1", [email], async (err, results) => {
            if (err) {
                throw err;
            }
            if (results.length > 0) {
                const user = results[0];
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    // Generate JWT token
                    const token = generateToken(user);
                    // Store token in session
                    req.session.token = token;
                    // console.log('User set in session:', req.session.user);
                    req.session.user = user;
                    res.redirect('/profile');
                } else {
                    res.send(
                        `<script>
                            alert('Invalid credentials');
                            window.location.href = '/login';
                        </script>`
                    );
                }
            } else {
                res.send(
                    `<script>
                        alert('Invalid credentials');
                        window.location.href = '/login';
                    </script>`
                );
            }
        });
    } catch (err) {
        console.log('error in comparing password' + err.message);
        res.status(500).send({ message: 'Error Comparing Password' });
    }
});
route.post('/admin_login', (req, res) => {
    const { email, password } = req.body;
    try {
        con.query("SELECT * FROM admin WHERE email = ? AND password = ? LIMIT 1", [email, password], (err, results) => {
            if (err) {
                throw err;
            }
            if (results.length > 0) {
                const admin = results[0];
                if (admin) {
                    // Generate JWT token
                    const token = generateToken(admin);
                    // Store token in session
                    req.session.token = token;
                    // console.log('User set in session:', req.session.user);
                    req.session.admin = admin;
                    res.redirect('/');
                } else {
                    res.send(
                        `<script>
                            alert('Invalid credentials');
                            window.location.href = '/admin_login';
                        </script>`
                    );
                }
            }
        });
    } catch (err) {
        console.log('error in comparing password' + err.message);
        res.status(500).send({ message: 'Error Comparing Password' });
    }
});



route.get('/register', (req, res) => {
    const admin = req.session.admin;
    const user = req.session.user;

    // Always pass `user` and `admin` to the template
    res.render('register', { user: user ? user.name : undefined, admin: admin ? admin.name : undefined });

});
route.get('/login', (req, res) => {
    const user = req.session.user;
    const admin = req.session.admin;
    res.render('login', { user: user ? user.name : undefined, admin: admin ? admin.name : undefined });
});
route.get('/admin_login', (req, res) => {
    const user = req.session.user;
    const admin = req.session.admin;
    res.render('admin_login', { user: user ? user.name : undefined, admin: admin ? admin.name : undefined });
});
route.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/');
    })
});
route.get('*', (req, res) => {
    const user = req.session.user;
    const admin = req.session.admin;
    res.render("page404", { user: user ? user.name : undefined, admin: admin ? admin.name : undefined });
});


module.exports = route;
