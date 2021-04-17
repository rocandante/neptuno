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
  },
  pagination: {
    limit: 10,
    skip: 0,
    page: 1
  },
  sortDefault: { 'createdAt':'desc' },
  token: {
    secret: process.env.TOKEN_SECRET,
    expires: process.env.TOKEN_EXPIRES
  }
}

module.exports = config
