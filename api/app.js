const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const {login, protect} = require( './utils/utils.js')
const {
    created,
    error,
    unauthorized,
    ok,
    conflict,
    forbidden
} = require('./utils/express-helper.js')
const { signup } = require('./services/user/user.controller.js')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(morgan('dev'))

// security guard
app.use(helmet())

const router= express.Router()
router.use(created, error, unauthorized, ok, conflict, forbidden)
app.use(created, error, unauthorized, ok, conflict, forbidden)

app.post('/api/login', login)
app.post('/api/signup', signup)

app.get('/', (req, res) => {
    res.send('Hello World! Anyone without signup or login can see this')
})
app.use('',protect)
app.get("/intro", (req, res) => {
    res.send("This is a secured url. Only authenticated users can see this.")
    }
)   

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
