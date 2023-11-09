const express = require("express")
const path = require("path")
const app = express()
const {exec} = require("child_process")
const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.static('views/images'))
app.use(express.urlencoded({ extended: false }))

const webPath = path.join(__dirname, '../views')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', webPath)   
app.use(express.static(publicPath))

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            exec("./myExecutable",  (error, stdout, stderr) => console.log(stdout))
            res.render('home')
        }

        else {
            res.send("incorrect password")
        }

    } 
    
    catch (e) {
        res.send("wrong details")
    }


})
app.get('/purchase', (request, response) => {
    response.render('purchase');
});
app.get('/login', (request, response) => {
    response.render('login');
});
app.get('/home', (request, response) => {
    response.render('home');
});

app.listen(port, () => {
    console.log('port connected');
})