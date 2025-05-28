import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {

    constructor(
        public readonly authService: AuthService
    ) {}
    private handleError(res: Response, error: unknown) {

        if( error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message
            });
        }

        return res.status(500).json({
            message: 'Internal server error'
        });
    }

    registerUser = async (req: Request, res: Response) => {
        const [error,registerDto] = RegisterUserDto.create(req.body);

        if( error ) return res.status(400).json({
            message: error
        });

        try {
            const user = await this.authService.registerUser(registerDto!);

            res.status(201).json({
                user: user.userCreated,
                token: user.token
            })
        } catch (error) {
            return this.handleError(res, error);
        }
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