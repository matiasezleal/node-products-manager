import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";


export class FileRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new FileUploadController(new FileUploadService() );
        
        router.use(FileUploadMiddleware.validateFile);
        router.post('/upload/:type', controller.uploadFile);
        router.post('/upload-multiple/:type', controller.uploadMultipleFiles);
        return router;
    }
}