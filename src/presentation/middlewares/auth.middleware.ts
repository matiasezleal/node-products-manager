import { Request, Response, NextFunction } from "express";
import { envs } from "../../config/envs";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware {


    static async validateJWT (req: Request, res: Response, next: NextFunction) {
        
        const isBearer = req.headers.authorization?.toLowerCase().startsWith('bearer');
        const tokenAuthorization  = isBearer ? req.headers.authorization?.split(' ')[1] : null;
        if( !tokenAuthorization  ) return res.status(401).json({
            message: 'No Authorization token provided'
        });

        try {
            const payload = JwtAdapter.validateToken(tokenAuthorization);
            if( !payload ) return res.status(401).json({
                message: 'Invalid token'
            });

            const user = await UserModel.findById(payload.id);
            if( !user ) return res.status(401).json({
                message: 'Unauthorized',
                error: 'invalid_user'
            });

            req.body.user = UserEntity.fromObject(user);
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
        next();
    }
}