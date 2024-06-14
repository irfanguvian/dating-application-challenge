import express from 'express';
import dotenv from 'dotenv';
import sequelizeConnection from './config/database';
// import { sequelize } from './config/database';
// import authRoutes from './routes/authRoutes';
// import swipeRoutes from './routes/swipeRoutes';
import authRouter from './routes/auth.router';
import userRouter from './routes/user.router';
import { verifyTokenMiddleware } from './middlewares/auth.middleware';
import swipeRouter from './routes/swipe.router';
import subcriptionRouter from './routes/subcription.router';

dotenv.config();

const app = express();

app.use(express.json());

const connection = sequelizeConnection()

connection.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch((error) => {
    console.error('Unable to connect to the database:', error.message);
    throw new Error('Unable to connect to the database');
})

export { connection }
  
app.use('/auth', authRouter)
app.use('/user', verifyTokenMiddleware , userRouter)
app.use('/swipe', verifyTokenMiddleware , swipeRouter)
app.use('/subcription', verifyTokenMiddleware , subcriptionRouter)

export default app;