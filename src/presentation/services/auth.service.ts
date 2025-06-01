import { bcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {

    constructor(
       private readonly emailService: EmailService
    ) {}

    async registerUser(registerDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({ email: registerDto.email });

        if( existUser ) throw CustomError.badRequest('User already exists');

        try {
            const newUser = await UserModel.create(registerDto);
            
            //Encrypt password -- TODO: should catch error?
            newUser.password = await bcryptAdapter.encrypt(registerDto.password);
        
            newUser.save();
            //TODO: JWT

            //TODO: Send email verification
            await this.sendEmailVerification(newUser.email);
            const {password, ...userCreated} = UserEntity.fromObject(newUser);
            return {userCreated, token: 'JWT'};
        } catch (error) {
            throw CustomError.internalServerError('Error creating user');
        }
    }

    async loginUser(loginDto: LoginUserDto) {
        const {email, password} = loginDto;

        const user = await UserModel.findOne({email});
        /* I can use a generic message like 'Invalid credentials' */
        if( !user ) throw CustomError.badRequest('User not found');

        const isPasswordValid = await bcryptAdapter.compare(password, user.password);
        /* I can use a generic message like 'Invalid credentials' */
        if( !isPasswordValid ) throw CustomError.badRequest('Invalid password');

        const {password: _, ...userData} = UserEntity.fromObject(user);
        const token = await JwtAdapter.generateToken({id:user.id});
        if( !token ) throw CustomError.internalServerError('Error generating token');
        return {user: userData, token};
    }
    static async verifyEmail(token: string) {
        const payload = await JwtAdapter.validateToken(token);
        if (!payload?.email) throw CustomError.badRequest('Invalid token');
        const user = await UserModel.findOne({email: payload.email});
        if (!user) throw CustomError.badRequest('User not found');
        user.emailVerified= true;
        await user.save();
        return true;
    }

    private async sendEmailVerification(email: string) {
        const token = await JwtAdapter.generateToken({email});
        if( !token ) throw CustomError.internalServerError('Error generating token');
        
        const url = `${process.env.FRONTEND_URL}/auth/velidate-email?token=${token}`;
        
        const htmlBody = `
        <h1>Verify your email</h1>
        <p>Click <a href="${url}">here</a> to verify your email</p>
        `;
        const isSent = await this.emailService.sendEmail({to: email, subject: 'Verify your email', htmlBody});
        if( !isSent ) throw CustomError.internalServerError('Error sending email');
    }
}