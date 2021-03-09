require('dotenv').config()

const config = {
  server: {
    port: process.env.SERVER_PORT
  },
  database: {
    protocol: process.env.DB_PROTOCOL,
    url: process.env.DB_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  }
}

module.exports = config
