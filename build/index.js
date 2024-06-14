"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
// import { sequelize } from './config/database';
// import authRoutes from './routes/authRoutes';
// import swipeRoutes from './routes/swipeRoutes';
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const swipe_router_1 = __importDefault(require("./routes/swipe.router"));
const subcription_router_1 = __importDefault(require("./routes/subcription.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const connection = (0, database_1.default)();
exports.connection = connection;
connection.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error.message);
    throw new Error('Unable to connect to the database');
});
app.use('/auth', auth_router_1.default);
app.use('/user', auth_middleware_1.verifyTokenMiddleware, user_router_1.default);
app.use('/swipe', auth_middleware_1.verifyTokenMiddleware, swipe_router_1.default);
app.use('/subcription', auth_middleware_1.verifyTokenMiddleware, subcription_router_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map