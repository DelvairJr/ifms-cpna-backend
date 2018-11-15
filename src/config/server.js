const port = 80

const bodyparser = require('body-parser')
const express = require('express')
const server = express()
const queryParser = require('express-query-int')
const allowCors = require('./cors')

server.use(bodyparser.urlencoded({ extended: true }))
server.use(bodyparser.json())
server.use(queryParser())
server.use(allowCors)

server.listen(port, function () {
    console.log(`BACKEND is running on port ${port}`);

})

module.exports = server