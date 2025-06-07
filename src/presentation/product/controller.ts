import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateProductDto } from "../../domain";

export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) {}
    private handleError(res: Response, error: unknown) {

        if( error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message
            });
        }
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
    
    /* CRUD PRODUCTS */
    getProducts = async (req: Request, res: Response) => {
        const { page=1, limit=10 } = req.query;
        try {
            const products = await this.productService.getProducts(page, limit);
            return res.status(200).json(products);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    createProduct = async (req: Request, res: Response) => {
        console.log('--------------------------------');
        console.log(req.body.user.id);
        console.log('--------------------------------');
        const [errorMessage, createProductDto] = CreateProductDto.create(
            {...req.body, user: req.body.user.id});
        if( errorMessage ) return res.status(400).json({
            message: errorMessage
        });

        try {
            const product = await this.productService.createProduct(createProductDto!);
            return res.status(201).json(product);
        } catch (error) {
            return this.handleError(res, error);
        }
    }


}