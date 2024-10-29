import {DataSource, DataSourceOptions} from "typeorm";
import { UserEntity } from "../user/entities/userEntity";
import dotenv from "dotenv";
import {RefreshTokenEntity} from "../authentification/entities/refreshTokenEntity";
dotenv.config({ path: '.env' });


// Permet de verif si les variables d'environnement sont bien définies mais ducoup ca plant s'il manque un truc
// a voir c'est quoi le mieux en production, le truc avec les valeurs par défaut c'est que ca me fait peur pour la secu

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_NAME) {
    throw new Error("Les variables d'environnement de configuration de la base de données ne sont pas toutes définies.");
}

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST,
    // Attetion y a un !  qui force le cast en number a voir si c est grave
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false, // Utilise les migrations en production
    logging: true,
    entities: [UserEntity,RefreshTokenEntity]
});

export default AppDataSource;
