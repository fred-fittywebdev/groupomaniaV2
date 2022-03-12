require('dotenv').config()

import { routes } from './routes/routes.routes';
// IMPORTS
import express, { Request, Response } from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';

// database connection
createConnection().then(connection => {
        const app = express();

    app.use(express.json());
    app.use(cookieParser())

    app.use(cors({
        credentials: true, // Permet de rendre accessible le cookie au font end
        origin:["http://localhost: 3000"]
    }))

    app.get('/', (req: Request, res: Response): void => {
        res.send('Hello World')
    })

    routes(app)

    app.listen(8080, (): void => {
        console.log('Listenning on port 8080');
        
    })
})

