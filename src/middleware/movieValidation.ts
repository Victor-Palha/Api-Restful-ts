import { body, CustomValidator } from "express-validator"

const ratingNote: CustomValidator = (value:number)=>{
    if(value < 0 || value > 10){
        throw new Error("The rating should be between 0 to 10!")
    }
    return true
}

export const movieCreateValidation = ()=>{
    return[
        body("title").isString().withMessage("The title is mandatory"),
        body("rating").isNumeric().withMessage("The rating must be a number!").custom(ratingNote),
        body("director").isString().withMessage("The director name is mandatory!"),
        body("description").isString().withMessage("The description is mandatory"),
        body("poster").isURL().withMessage("The poster must be URL!")
    ]
}