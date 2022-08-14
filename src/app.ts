//DOTENV
require("dotenv").config()
//Logger
import Logger from "../config/logger"
//Middlewares
import morganMiddleware from "./middleware/morganMiddleware"

//console.log("Hello World from Node")
import express from "express"
import config from "config"

const app = express()

//Aplication level middleware
app.use(express.json())
app.use(morganMiddleware)

//Database
import db from "../config/db"

//Router
import router from './router'
app.use("/api/", router)

// Config PORT
const port = config.get<number>("port")

app.listen(port,async()=>{
    await db()
    Logger.info(`Server online on port: ${port}`)
})
