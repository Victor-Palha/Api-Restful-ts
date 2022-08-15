//Importing the functionalities
import {Router, Request, Response} from "express"
import { createMovie } from "./controllers/movieControllers"
import { validate } from "./middleware/handleValidation"

//instantiating object
const router = Router()

//exporting routers
export default router
    .get("/test", (req:Request, res:Response)=>{
        res.status(200).send("API is working!")
    })
    .post("/movie", validate, createMovie)