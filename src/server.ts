import express, { Request, Response } from 'express';

const app = express();
const PORT = 3003;

// Route de base
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, BINCHOdsqdqsdNNNNN!');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
