import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';

import Photo from '../models/Photo';

function existsFilePromise(pathImage: string) {
    return new Promise(resolve => fs.exists(pathImage, exists => resolve(exists)))
}

export async function getPhotos(req: Request, res: Response): Promise<void> {
    const photos = await Photo.find();

    res.status(200).json(photos);
}

export async function getPhoto(req: Request, res: Response): Promise<void> {
    const photo = await Photo.findById(req.params.id);

    res.status(200).json(photo);
}

export async function createPhoto(req: Request, res: Response): Promise<void> {
    const { title, description } = req.body;
    const imagePath = req.file.path;
    const newPhoto = {
        title,
        description,
        imagePath
    };
    const photo = await Photo.create(newPhoto);

    res.status(200)
        .json({
            message: 'Photo successfully saved',
            photo
        });
}

export async function deletePhoto(req: Request, res: Response): Promise<void> {
    const photo = await Photo.findByIdAndRemove(req.params.id);

    if (photo) {
        const pathImage = path.resolve(photo.imagePath);
        const existsFile = await existsFilePromise(pathImage);

        if (existsFile) {
            await fs.unlink(pathImage);
        }
    }
    res.status(200).json(photo);
}

export async function updatePhoto(req: Request, res: Response): Promise<void> {
    const { title, description } = req.body;
    const imagePath = req.file.path;
    const photoId = req.params.id;
    let photo = await Photo.findById(photoId);

    if (photo) {
        const pathImage = path.resolve(photo.imagePath);
        const existsFile = await existsFilePromise(pathImage);

        if (existsFile) {
            await fs.unlink(pathImage);
        }

        photo.overwrite({
            title,
            description,
            imagePath
        });
        await photo.save();
    }

    res.status(200).json(photo);
}
