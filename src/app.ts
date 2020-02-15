import express, { Application } from 'express';
import path from 'path';
import morgan from 'morgan';

import indexRoutes from './routes/IndexRoutes';
// import helmet from 'helmet';

export default class App {
    app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        // Settings
        this.app.set('port', process.env.PORT || 3000);
        // Middleware
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(helmet());
        // this.app.use(compression());
        // this.app.use(cors());

        // folder upload
        this.app.use('/uploads', express.static(path.resolve('uploads')));
    }

    routes() {
        this.app.use('/api', indexRoutes)
    }

    start() {
        const port = this.app.get('port');
        return new Promise(resolve => {
            this.app.listen(port, () => {
                resolve(port);
            });
        });
    }

}
