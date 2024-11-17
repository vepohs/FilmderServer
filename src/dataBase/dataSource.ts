import {DataSource} from "typeorm";
import { UserEntity } from "../user/entities/UserEntity";
import dotenv from "dotenv";
import {RefreshTokenEntity} from "../authentification/entities/refreshTokenEntity";
import {MovieEntity} from "../movie/entites/MovieEntity";
import {ProviderEntity} from "../movie/entites/ProviderEntity";
import {SwipeEntity} from "../movie/entites/SwipeEntity";
import {GenreEntity} from "../movie/entites/GenreEntity";
import {GenrePreferenceEntity} from "../user/entities/PreferenceGenreEntity";
import {PreferenceProviderEntity} from "../user/entities/PreferenceProviderEntity";

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
    logging: false,
    charset: 'utf8mb4',
    entities: [UserEntity,RefreshTokenEntity,MovieEntity,ProviderEntity,SwipeEntity,GenreEntity,GenrePreferenceEntity,PreferenceProviderEntity]
});

export default AppDataSource;
