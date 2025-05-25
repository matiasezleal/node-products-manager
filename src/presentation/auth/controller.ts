import { Request, Response } from "express";

export class AuthController {

    constructor(
        
    ) {}


    registerUser = (req: Request, res: Response) => {

        res.json({
            message: 'Register'
        })
    }

    loginUser = (req: Request, res: Response) => {

        res.json({
            message: 'Login'
        })
    }

    validateEmail = (req: Request, res: Response) => {

        res.json({
            message: 'ValidateEmail'
        })
    }

}