import express, { Router } from "express"
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import {login, protect} from './utils/auth'
import {
    created,
    error,
    unauthorized,
    ok,
    conflict,
    forbidden
} from './utils/express-helper'
import { signup } from './services/user/user.controller'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(morgan('dev'))

// security guard
app.use(helmet())

const router= Router()
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
