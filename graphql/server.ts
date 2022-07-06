import { createServer } from '@graphql-yoga/node';
import { AppDataSource } from './src/data-source';

// await AppDataSource.initialize();
const initDb = async () => {
    await AppDataSource.initialize();
}
initDb();

const server = createServer({});

export { };

server.start();
