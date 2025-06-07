import { Validators } from "../../../config";

interface CreateProductProps {
    name: string;
    description?: string;
    inStock?: number;
    price: number;
    category: string;
    user: string;
    available?: boolean;
}

export class CreateProductDto {
    constructor({
        name,
        description = '',
        inStock = 0,
        price,
        category,
        user,
        available = true
    }: CreateProductProps) {
        this.name = name;
        this.description = description;
        this.inStock = inStock;
        this.price = price;
        this.category = category;
        this.user = user;
        this.available = available;
    }

    public readonly name: string;
    public readonly description: string;
    public readonly inStock: number;
    public readonly price: number;
    public readonly category: string;
    public readonly user: string;
    public readonly available: boolean;

    static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
        const { name, description, inStock, price, category, user, available } = props;
        if( !name ) return ['Name is required'];
        
        if( !price ) return ['Price is required'];
        if( !category ) return ['Category is required'];
        if( !user ) return ['User is required'];
        if( !Validators.isMongoId(user) ) return ['User is invalid'];
        if( !Validators.isMongoId(category) ) return ['Category is invalid'];

        return [undefined, 
            new CreateProductDto({
                name,
                description,
                inStock,
                price,
                category,
                user,
                available
            })
        ];
    }
}