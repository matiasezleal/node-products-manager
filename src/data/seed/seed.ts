import { envs } from '../../config';
import { MongoDatabase } from '../mongo/mongo-init';
import { seedData } from './data';

(async () => {
    try {
        console.log('🚀 Iniciando conexión a MongoDB...');
        
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });

        console.log('✅ Conectado a MongoDB');
        
        await seedData();
        
        console.log('🎯 Proceso completado');
        process.exit(0);
        
    } catch (error) {
        console.error('💥 Error fatal:', error);
        process.exit(1);
    }
})();