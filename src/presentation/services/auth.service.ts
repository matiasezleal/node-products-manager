import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {

    constructor(
       
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

        return {user: userData, token: 'JWT'};
    }
}