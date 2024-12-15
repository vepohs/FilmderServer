import cors from 'cors';
import express from 'express';
import AppDataSource from "./dataBase/dataSource";
import {errorHandler} from "./middlewares/errorHandler";
import routes from "./route/routes";
// @ts-ignore
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.SERVEUR_PORT

app.use(cookieParser());
app.use(cors({
    origin: 'http://185.172.57.167:3020',  // Remplacez par l'URL de votre client
    credentials: true  // Autoriser les cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


AppDataSource.initialize()
    .then(() => {
        console.log("Connected to MariaDB!");
        app.use(routes);
        app.use(errorHandler);
        app.listen(PORT, () => {
            console.log(`Server is running on http://185.172.57.167:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MariaDB:", error);
    });


