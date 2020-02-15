import { Request, Response, Router } from 'express';

class IndexRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getIndex(req: Request, res: Response): void {
        res.json({ data: 'Hola Mundo' });
    }

    routes() {
        this.router.get('/', this.getIndex);
    }
}

const indexRoutes = new IndexRoutes();

export default indexRoutes.router;
