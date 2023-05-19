import express from 'express'
import gameController from '../controller/game.controller.js'
import roundedController from '../controller/rounded.controller.js'

const routers = express.Router()

routers.get("/round/:id", roundedController.getAllUser)
routers.post("/round/:id", roundedController.postUser)

routers.get("/",gameController.getAllGame)
routers.post("/",gameController.postNewGame)


export default routers