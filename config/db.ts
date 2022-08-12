import mongoose from "mongoose"
import config from "config"

async function connect(){
    const url = config.get<string>("dbUrl")
    try {
        await mongoose.connect(url)
        console.log("Successful connection to database!")
    } catch (err) {
        console.log("Error to connect to database")
        console.log(`Error: ${err}`)
    }
}

export default connect