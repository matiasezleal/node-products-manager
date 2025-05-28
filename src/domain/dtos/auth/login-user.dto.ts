import { regularExpsValidation } from "../../../config";

export class LoginUserDto { 
    constructor(
        public email: string,
        public password: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, LoginUserDto?] {
        const {email, password} = object;

        if( !email ) return ['Email is required', undefined];

        if( !password ) return ['Password is required', undefined];

        if( !regularExpsValidation.email.test(email) ) return ['Email is not valid', undefined];

        return [undefined, new LoginUserDto(email, password)];
    }
}   