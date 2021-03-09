const app = require('express')

const port = 3000

app.get('/' (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => { 
  console.log(`Server on port ${port}`)
})

module.exports = app