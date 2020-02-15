import { Router } from 'express';
import {
    createPhoto, deletePhoto, getPhoto, getPhotos, updatePhoto
} from '../controllers/photo.controller';
import multer from '../libs/Multer';

class IndexRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/photos', getPhotos);
        this.router.route('/photo/:id')
            .get(getPhoto)
            .put(multer.single('image'), updatePhoto)
            .delete(deletePhoto);
        this.router.post('/photo', multer.single('image'), createPhoto);
    }
}

const indexRoutes = new IndexRoutes();

export default indexRoutes.router;
