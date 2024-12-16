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
    origin: 'https://filmder.fr',  // Remplacez par l'URL de votre client
    credentials: true  // Autoriser les cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
});


AppDataSource.initialize()
    .then(() => {
        console.log("Connected to MariaDB!");
        app.use(routes);
        app.use(errorHandler);
        app.listen(PORT, () => {
            console.log(`Server is running`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MariaDB:", error);
    });


