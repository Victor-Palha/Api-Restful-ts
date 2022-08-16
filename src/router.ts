//Importing the functionalities
import {Router, Request, Response} from "express"
import { createMovie, findMovieById } from "./controllers/movieControllers"
import { validate } from "./middleware/handleValidation"
import { movieCreateValidation } from "./middleware/movieValidation"

//instantiating object
const router = Router()

//exporting routers
export default router
    .get("/test", (req:Request, res:Response)=>{
        res.status(200).send("API is working!")
    })
    .post("/movie", movieCreateValidation(),validate, createMovie)
    .get("/movie/:id", findMovieById)