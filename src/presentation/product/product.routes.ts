import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services/product.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ProductRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new ProductController(new ProductService());
        router.get('/', controller.getProducts);
        router.post('/', AuthMiddleware.validateJWT, controller.createProduct);

        return router;
    }
}