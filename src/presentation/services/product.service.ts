import { ProductModel } from "../../data/mongo/models/product.model";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";

export class ProductService {   

    constructor() {}

    async getProducts(page: any, limit: any): Promise<PaginationDto | []> {
        const [errorMessage, paginationDto] = PaginationDto.create({ page, limit });
        if( errorMessage ) throw CustomError.badRequest(errorMessage);
        try {
            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                .skip((paginationDto!.page - 1) * paginationDto!.limit)
                .limit(paginationDto!.limit)
                .populate('category')
                .populate('user')
            ]);
            paginationDto!.setData(products);
            paginationDto!.setTotalPages(total);
            return paginationDto!;
        } catch (error) {
            throw CustomError.badRequest('Error getting products');
        }
    }

    async createProduct(product: CreateProductDto): Promise<any> {

        const findProduct = await ProductModel.findOne({ name: product.name });
        if( findProduct ) throw CustomError.badRequest('Product already exists');
        console.log(product);
        try {
            const newProduct = await ProductModel.create(product);
            
            return newProduct;
        } catch (error) {
            console.log(error);
            throw CustomError.badRequest('Error creating product');
        }
    }


}