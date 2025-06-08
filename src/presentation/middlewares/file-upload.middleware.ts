import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

/**
 * Middleware for handling file upload validation and normalization
 */
export class FileUploadMiddleware {
    /**
     * Validates that files were uploaded and normalizes them into an array format.
     * This middleware ensures that req.body.files always contains an array of files,
     * regardless of whether a single file or multiple files were uploaded.
     * 
     * @param req - Express request object
     * @param res - Express response object  
     * @param next - Express next function to continue to the next middleware
     */
    static validateFile(req: Request, res: Response, next: NextFunction) {
        const files = req.files;
        
        // Check if any files were uploaded
        if (!files || Object.keys(files).length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Validate that specifically the field 'file' exists
        if (!files.file) {
            return res.status(400).json({ message: 'File field is required' });
        }

        // Normalize files into array format
        // If files.file is not an array (single file), convert it to array
        if ( !Array.isArray(files.file) ) {
            req.body.files = [files.file];
        } else {
            // If it's already an array (multiple files), use as is
            req.body.files = files.file;
        }
        
        next();
    }
}