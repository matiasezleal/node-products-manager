import { regularExpsValidation } from "../../../config";

export class RegisterUserDto{
    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, RegisterUserDto?] {
        const { name, email, password } = object;

        if( !name ) return ['Name is required', undefined];

        if( !email ) return ['Email is required', undefined];

        if( !password ) return ['Password is required', undefined];

        if( password.length < 6 ) return ['Password must be at least 6 characters', undefined];

        if( !regularExpsValidation.email.test(email) ) return ['Email is not valid', undefined];

        //if( !regularExpsValidation.password.test(password) ) return ['Password is not valid', undefined];

        return [undefined, new RegisterUserDto(name, email, password)];
    }
}