import mongoose from "mongoose"
import config from "config"
//Logger
import Logger from "./logger"

async function connect(){
    const url = config.get<string>("dbUrl")
    try {
        await mongoose.connect(url)
        Logger.info("Successful connection to database!")
    } catch (err) {
        Logger.error("Error to connect to database")
        Logger.error(`Error: ${err}`)
        process.exit(1)
    }
}

export default connect