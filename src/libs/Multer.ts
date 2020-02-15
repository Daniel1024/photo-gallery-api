import multer, { StorageEngine } from 'multer';
import { Request } from 'express'
import uuid from 'uuid/v4';
import path from 'path';

class Multer {
    storage: StorageEngine;

    constructor() {
        this.storage = this.config();
    }

    config() {
        return multer.diskStorage({
            destination: 'uploads',
            filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void): void {
                callback(null, uuid() + path.extname(file.originalname).toLowerCase());
            }
        })
    }
}

const local = new Multer();
const storage = local.storage;

export default multer({ storage });

