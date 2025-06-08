import path from "path";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import { UuidAdapter } from "../../config";

export class FileUploadService {
    constructor(
        private readonly uuid = UuidAdapter.generateV4()
    ) {}

    /**
     * Checks if the specified directory exists, and creates it if it doesn't exist.
     * This ensures that the destination folder is available before uploading files.
     * @param folder - Path of the directory to check/create
     */
    private checkFolder(folder: string) {
        if( !fs.existsSync(folder) ) {
            fs.mkdirSync(folder);
        }
    }


    
    /* UPLOAD FILE */
    uploadFile = async (
        file: UploadedFile,
        folder: string = 'uploads', 
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
    ) => {
        const { name, mimetype} = file;
        
        try {
        const extension = name.split('.').pop() || '';

        //* Check if the extension is allowed
        if( !validExtensions.includes(extension!) ) {
            throw new Error(`Extension ${extension} not allowed`);
        }

        //* Check if the file is an image
        if( !mimetype.includes('image') ) {
            throw new Error(`File ${name} is not an image`);
        }

        const destination = path.resolve( __dirname, '../../../', folder, `${name}.${extension}` );

        this.checkFolder(destination);



        //* Generate a new name for the file
        const newName = `${this.uuid}.${extension}`;
        file.mv(`${destination}/${newName}`, (err) => {
            if(err) {
                throw new Error(`Error moving file ${name} - ${err}`);
            }
        });

        return {fileName: newName, path: destination};
        } catch (error) {
            throw new Error(`Error uploading file ${name} - ${error}`);
        }

    
    }

    uploadMultipleFiles = async (files:any, type: string) => {
        return 'Files uploaded';
    }
}