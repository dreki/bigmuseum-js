import 'reflect-metadata'
import { DataSource } from 'typeorm'

const AppDataSource = new DataSource({
    type: 'mongodb',
    database: 'bigmuseum',
    // url: 
    // Get connection string from environment variable
    url: process.env.MONGO_URI,
    synchronize: true,
    entities: [],
    migrations: [],
    subscribers: []
})

export { AppDataSource }
