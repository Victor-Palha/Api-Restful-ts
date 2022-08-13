//DOTENV
require("dotenv").config()

//console.log("Hello World from Node")
import express from "express"
import config from "config"

const app = express()

//JSON middleware
app.use(express.json())
//Database
import db from "../config/db"
//Router
import router from './router'
app.use("/api/", router)

// Config PORT
const port = config.get<number>("port")

app.listen(port,async()=>{
    await db()
    console.log(`Server online on port: ${port}`)
})
