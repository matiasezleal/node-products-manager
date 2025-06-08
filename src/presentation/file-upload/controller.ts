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


        const file = req.body.files.at(0) as UploadedFile;

        this.fileUploadService.uploadFile(file, `uploads/${type}`).then( (url) => {
            return res.status(200).json({
                message: 'File uploaded',
                url
            });
        }).catch( (err) => {
            console.log(err);
            this.handleError(res, err);
        });
        
    }

    uploadMultipleFiles = async (req: Request, res: Response) => {
        const type = req.params.type;

        const files = req.body.files;

        this.fileUploadService.uploadMultipleFiles(files, type).then( (urls) => {
            return res.status(200).json({
                message: 'Files uploaded',
                urls
            });
        }).catch( (err) => {
            console.log(err);
            this.handleError(res, err);
        });
    }
}