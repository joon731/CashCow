const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const bcrypt = require("bcrypt");
const session = require('express-session');
const LogInCollection = require("./mongo");
const rateLimit = require("express-rate-limit");

const app = express();
const port = process.env.PORT || 3000;

const webPath = path.join(__dirname, '../views');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

app.use(express.json());
app.use(express.static('views/images'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'cashcow',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
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

// Rate limit middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // limit each IP to 3 requests per windowMs
    message: 'Too many login attempts, please try again later.'
});

// Apply rate limit to the /login route
app.post('/login', limiter, async (req, res) => {
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

app.get('/home', async (req, res) => {
    try {
        const user = await LogInCollection.findOne({ name: req.session.user }).lean();
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Extract product prices from the user document
        const prices = {
            Cpu: user.Cpu,
            Dress: user.Dress,
            Iphone: user.Iphone,
            Keyboard: user.Keyboard,
            Mouse: user.Mouse,
            Nikon: user.Nikon,
            Sweatshirt: user.Sweatshirt,
            Vacuum: user.Vacuum,
        };

        // Log prices to the console
        console.log('Prices from the server:', prices);

        res.render('home', { prices });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
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
