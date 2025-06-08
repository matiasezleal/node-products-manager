import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";


export class FileRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new FileUploadController(new FileUploadService() );
        
        router.post('/upload/:type', controller.uploadFile);
        router.post('/upload-multiple/:type', controller.uploadMultipleFiles);
        return router;
    }
}