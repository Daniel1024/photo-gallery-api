import { Schema, model, Document } from 'mongoose';

const photoSchema = new Schema({
    title: String,
    description: String,
    imagePath: String
}, { timestamps: true });

interface IPhoto extends Document {
    title: string;
    description: string;
    imagePath: string;
}

export default model<IPhoto>('Photo', photoSchema);
