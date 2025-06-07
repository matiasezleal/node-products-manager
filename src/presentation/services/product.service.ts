import { ProductModel } from "../../data/mongo/models/product.model";
import { CustomError, PaginationDto } from "../../domain";

export class ProductService {   

    constructor() {}

    async getProducts(page: any, limit: any): Promise<PaginationDto | []> {
        const [errorMessage, paginationDto] = PaginationDto.create({ page, limit });
        if( errorMessage ) throw CustomError.badRequest(errorMessage);
        return [];
    }


}