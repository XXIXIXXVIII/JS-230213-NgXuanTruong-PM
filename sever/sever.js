import express from 'express'
import bodyParser from 'body-parser'
import routers from './router/index.js'
import cors from 'cors'


const app = express()
const port = 8080||8081
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/",routers)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})