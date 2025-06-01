import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),

  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),

  JWT_SECRET_SEED: get('JWT_SECRET_SEED').required().asString(),
  JWT_EXPIRES_IN: get('JWT_EXPIRES_IN').required().asString(),

  // Mailer
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_SECRET_KEY: get('MAILER_PASSWORD').required().asString(),  

}



