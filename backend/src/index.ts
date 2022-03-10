import { routes } from './routes/routes.routes';
// IMPORTS
import express, { Request, Response } from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

// database connection
createConnection().then(connection => {
        const app = express();

    app.use(express.json());

    app.use(cors({
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

