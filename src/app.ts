//console.log("Hello World from Node")
import express from "express"
import config from "config"

const app = express()

//JSON middleware
app.use(express.json())

// Config PORT
const port = config.get<number>("port")

app.listen(port,async()=>{
    console.log(`Server online on port: ${port}`)
})