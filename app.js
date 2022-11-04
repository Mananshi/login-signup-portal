import express, { Router } from 'express'
import dotenv from 'dotenv'

const app = express()

const port = process.env.PORT || 3000

const server = app.listen(port, function() {
    console.log(`Express server listening on http://localhost:${port}`)
});

app.get('/', function (req, res) {
    res.status(200).send('Hello World!')
})
