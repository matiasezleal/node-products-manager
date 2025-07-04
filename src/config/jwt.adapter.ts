import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {

    static generateToken(payload: Object, duration: string | number = '2h'): Promise<string> {
        return new Promise((resolve, reject) => {
            const options: any = {
                expiresIn: duration
            };

            jwt.sign(payload, envs.JWT_SECRET_SEED as Secret, options, (err, token) => {
                if (err || !token) return null;
                resolve(token);
            });
        });
    }

    static validateToken<T extends JwtPayload>(token: string): T | null {
        try {
            const decoded = jwt.verify(token, envs.JWT_SECRET_SEED as Secret);
            return decoded as T;
        } catch (error) {
           return null;
        }
    }

}