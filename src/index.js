const express = require("express")
const path = require("path")
const app = express()

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

app.get('/', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
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

app.listen(port, () => {
    console.log('port connected');
})