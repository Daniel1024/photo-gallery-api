import App from './app';
import database from './Database';

class Server {
    app: App;

    constructor() {
        this.app = new App();
    }

    async start(): Promise<void> {
        await database.startConnection();
        const port = await this.app.start();
        console.log('Server on port', port);
    }
}

const server = new Server();
server.start();
