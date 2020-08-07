const express = require('express')
const next = require('next')
const cors = require('cors')
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

// const optionCors = {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }
// app.use(cors(optionCors))

nextApp.prepare().then(() => {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  
  app.all('*', (req, res) => {
    return handle(req, res)
  })
  app.get("*", (req, res) => handle(req, res));
  app.post("*", (req, res) => handle(req, res));
  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

