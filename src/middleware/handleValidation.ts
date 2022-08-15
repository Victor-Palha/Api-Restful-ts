import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

export const validate = (req:Request, res:Response, next:NextFunction)=>{

    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }
    //Creating array empty
    const extratecErros: object[] = []
    //Push all erros into our array
    errors.array().map((err)=>{
        extratecErros.push({[err.param]: err.msg})
    })
    //Return a bad request
    return res.status(422).json({
        erros: extratecErros
    })
}