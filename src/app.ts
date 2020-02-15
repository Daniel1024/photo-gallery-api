import express, { Application } from 'express';
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
    }

    routes() {
        this.app.use('/api', indexRoutes)
    }

    start() {
        const port = this.app.get('port');

        this.app.listen(port, () => {
            console.log('Server on port', port);
        });
    }

}
