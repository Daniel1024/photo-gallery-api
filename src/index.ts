import App from './app';

class Server {
    app: App;

    constructor() {
        this.app = new App();
    }

    start() {
        this.app.start();
    }
}

const server = new Server();
server.start();
