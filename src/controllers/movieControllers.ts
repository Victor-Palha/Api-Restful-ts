import {Request, Response} from "express"
//Model
import { MovieModel } from "../models/Movie"
// Logger
import Logger from "../../config/logger"

//Creation
export async function createMovie(req:Request, res:Response){
    try {
        const data = req.body
        const movie = await MovieModel.create(data)
        return res.status(201).json(movie)
    } catch (err:any) {
        Logger.error(`Error: ${err.message}`)
    }
}

export async function findMovieById(req:Request, res:Response){
    try {
        const id = req.params.id
        const movie = await MovieModel.findById(id)
        if(!movie){
            return res.status(404).json({error: "Movie not found!"})
        }
        return res.status(200).json(movie)
    } catch (err: any) {
        Logger.error(`Error: ${err.message}`)
    }
}