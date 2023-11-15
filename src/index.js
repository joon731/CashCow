const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const bcrypt = require("bcrypt");
const session = require('express-session'); // Import express-session
const LogInCollection = require("./mongo");

const app = express();
const port = process.env.PORT || 3000;

const webPath = path.join(__dirname, '../views');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

app.use(express.json());
app.use(express.static('views/images'));
app.use(express.urlencoded({ extended: false }));

app.use(session({ // Configure express-session
    secret: 'cashcow',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set to true if using HTTPS
}));

app.set('view engine', 'hbs');
app.set('views', webPath);
app.use(express.static(publicPath));

const isAuthenticated = (req, res, next) => {
    const allowedRoutes = ['/login', '/updateEmail'];
    if (allowedRoutes.includes(req.path) || (req.session && req.session.user)) {
        return next();
    } else {
        res.redirect('/login');
    }
};

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });
        if (check && (await bcrypt.compare(req.body.password, check.password))) {
            // Passwords match
            req.session.user = req.body.name; // Set the session
            res.redirect('/home');
        } else {
            // Incorrect password
            res.send("Incorrect password");
        }
    } catch (e) {
        // Handle errors
        console.error(e);
        res.send("Error in login process");
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.use(isAuthenticated);

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/purchase', (req, res) => {
    res.render('purchase');
});

app.get('/updateEmail', (req, res) => {
    res.render('updateEmail');
    const { exec } = require("child_process");
    exec("./updateInfo: ", (error, stdout, stderr) => console.log(stdout));
});

const privateKeyPath = './certificates/cashcow.key';
const certificatePath = './certificates/cashcow.crt';

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');

const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, app);

server.listen(port, () => {
    console.log(`Server listening on port ${port} (HTTPS)`);
});
