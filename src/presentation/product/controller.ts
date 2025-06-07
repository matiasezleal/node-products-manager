import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) {}

    getProducts = async (req: Request, res: Response) => {
        const { page=1, limit=10 } = req.query;
        const products = await this.productService.getProducts(page, limit);
        return res.status(200).json(products);
    }
}