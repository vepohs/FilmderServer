import cors from 'cors';
import express from 'express';
import userRoutes from './user/routes/userRoutes';
import AppDataSource from "./dataBase/dataSource";
import {errorHandler} from "./middlewares/errorHandler";
import authRoutes from "./authentification/routes/authRoutes";

const app = express();
const PORT = process.env.SERVEUR_PORT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppDataSource.initialize()
    .then(() => {
        console.log("Connected to MariaDB!");
        app.use('/api/users', userRoutes);
        app.use('/api/auth',authRoutes);
        app.use(errorHandler);
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MariaDB:", error);
    });


