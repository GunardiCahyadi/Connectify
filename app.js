const express = require('express')
const app = express()
const port = 3000
const router = require('./routers/router')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

app.set('view engine','ejs')
app.use(express.static('images'))
app.use(express.urlencoded({extended: true}))
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})