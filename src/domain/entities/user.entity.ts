import { CustomError } from "../errors/custom.error";


export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailVerified: boolean,
        public password: string,
        public role: string[],
        public img?: string,       
    ) {}

    static fromObject(object: {[key: string]: any}) {
        const { id,_id, name, email, emailVerified, password, role, img } = object;

        if( !_id && !id ) {
            throw CustomError.badRequest('Id is required');
        }

        if( !name ) throw CustomError.badRequest('Name is required');

        if( !email ) throw CustomError.badRequest('Email is required');

        if( emailVerified === undefined ) throw CustomError.badRequest('Email verified is required');

        if( !password ) throw CustomError.badRequest('Password is required');

        if( !role ) throw CustomError.badRequest('Role is required');

        if( role.length === 0 ) throw CustomError.badRequest('Role is required');
        
        return new UserEntity(id || _id.toString(), name, email, emailVerified, password, role, img);
    }


    toObject() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            emailVerified: this.emailVerified,
            password: this.password,
            role: this.role,
            img: this.img,
        }
    }
}