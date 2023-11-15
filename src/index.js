const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongo");
const port = process.env.PORT || 3000;
const session = require('express-session');

const webPath = path.join(__dirname, '../views');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

app.use(express.json());
app.use(express.static('views/images'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
}));

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.render('login');
    }
};

app.set('view engine', 'hbs');
app.set('views', webPath);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });

        if (check && check.password === req.body.password) {
            req.session.user = req.body.name;
            res.redirect('/home');
        } else {
            res.send("Incorrect password");
        }
    } catch (e) {
        res.send("Wrong details");
    }
});

app.use(isAuthenticated); // Middleware to check if the user is authenticated

app.get('/home', (request, response) => {
    response.render('home');
});

app.get('/purchase', (request, response) => {
    response.render('purchase');
});

app.get('/updateEmail', (request, response) => {
    response.render('updateEmail');
    const { exec } = require("child_process");
    exec("./updateInfo: ", (error, stdout, stderr) => console.log(stdout));
});

app.listen(port, () => {
    console.log('Port connected');
});
