import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {

    static generateToken(payload: Object, duration: number = 2): Promise<string> {
        return new Promise((resolve, reject) => {
            const options: SignOptions = {
                expiresIn: duration
            };

            jwt.sign(payload, envs.JWT_SECRET as Secret, options, (err, token) => {
                if (err || !token) return null;
                resolve(token);
            });
        });
    }

    static validateToken<T extends JwtPayload>(token: string): T {
        try {
            const decoded = jwt.verify(token, envs.JWT_SECRET as Secret);
            return decoded as T;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

}