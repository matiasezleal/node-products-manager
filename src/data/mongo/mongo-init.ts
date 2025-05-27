import mongoose from 'mongoose';

interface ConnectionOptions {
    dbName: string;
    mongoUrl: string;
}


export class MongoDatabase {

    static async connect(options: ConnectionOptions) {
        const { dbName, mongoUrl } = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName
            });

            return true;
        } catch (error) {
            console.log('Error connecting to MongoDB', error);
            throw error;
            
        }
    }
}