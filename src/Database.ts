import { connect } from 'mongoose';

class Database {
    constructor() {
    }

    public async startConnection(): Promise<void> {
        const MONGO_URI = 'mongodb://localhost/photo-gallery-db';
        await connect(process.env.MONGODB_URO || MONGO_URI, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database is connected');
    }
}

export default new Database();
