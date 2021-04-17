const http = require('http')

const app = require('./app')
const config = require('./config/config')
const database = require('./config/database')

// Connect to database
database.connect(config.database, {})

const { port } = config.server

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server running at port: ${port}`)
})
