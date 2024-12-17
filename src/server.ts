import cors from 'cors';
import express from 'express';
import AppDataSource from "./dataBase/dataSource";
import {errorHandler} from "./middlewares/errorHandler";
import routes from "./route/routes";
import './Service/inactive/inactiveService';

const app = express();
const PORT = process.env.SERVEUR_PORT

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://filmder.fr' : 'http://localhost:5173',  // Remplacez par l'URL de votre client
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
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


