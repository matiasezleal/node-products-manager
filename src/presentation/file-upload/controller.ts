import { Request, Response } from "express";
import { FileUploadService } from "../services/file-upload.service";
import { CustomError } from "../../domain/errors/custom.error";
import { UploadedFile } from "express-fileupload";


export class FileUploadController {
    constructor(
        private readonly fileUploadService: FileUploadService
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




    /* UPLOAD FILE */
    uploadFile = async (req: Request, res: Response) => {
        const type = req.params.type;
        

        const validTypes = ['user', 'product', 'category'];
        if( !validTypes.includes(type) ) {
            return res.status(400).json({
                message: 'Invalid type'
            });
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: 'No files were uploaded.'
            });
        }
        const file = req.files.file as UploadedFile;
            this.fileUploadService.uploadFile(file, `uploads/${type}`).then( (url) => {
            return res.status(200).json({
                message: 'File uploaded',
                url
            });
        }).catch( (err) => {
            this.handleError(err, res);
        });
        
    }

    uploadMultipleFiles = async (req: Request, res: Response) => {
        return res.status(200).json({
            message: 'Files uploaded'
        });
    }
}