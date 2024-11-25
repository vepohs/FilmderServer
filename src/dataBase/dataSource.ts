import {DataSource} from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import dotenv from "dotenv";
import {RefreshTokenEntity} from "../entity/refreshTokenEntity";
import {MovieEntity} from "../entity/MovieEntity";
import {ProviderEntity} from "../entity/ProviderEntity";
import {SwipeEntity} from "../entity/SwipeEntity";
import {GenreEntity} from "../entity/GenreEntity";
import {GenrePreferenceEntity} from "../entity/PreferenceGenreEntity";
import {PreferenceProviderEntity} from "../entity/PreferenceProviderEntity";
import {GroupEntity} from "../entity/GroupEntity";

dotenv.config({ path: '.env' });
//todo voir si ca a changer

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
    logging: true,
    synchronize: false,
    charset: 'utf8mb4',
    entities: [UserEntity,RefreshTokenEntity,MovieEntity,ProviderEntity,SwipeEntity,GenreEntity,GenrePreferenceEntity,PreferenceProviderEntity,GroupEntity]
});

export default AppDataSource;
