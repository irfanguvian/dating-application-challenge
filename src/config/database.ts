import { Sequelize } from "sequelize";

export default () => {
    const db = process.env.DATABSE_NAME ?? 'default';
    const username = process.env.DATABASE_USERNAME ?? 'default';
    const password = process.env.DATABASE_PASSWORD ?? 'default';
    const host = process.env.DATABSE_HOST ?? 'localhost';
    const port = process.env.DATABSE_PORT ? +process.env.DATABSE_PORT : 5432;

    const connection = new Sequelize(db, username, password, {
        host: host,
        dialect: 'postgres',
        port: port,
        dialectOptions: { decimalNumbers: true },
        define: {
          timestamps: false, // true by default
        },
        timezone: "+07:00",
        pool: {
          max: 100,
          min: 0,
          idle: 100,
          acquire: 1000,
        },
    });
    
    return connection
}