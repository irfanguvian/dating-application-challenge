"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const index_1 = __importDefault(require("./index"));
const PORT = process.env.PORT || 1234;
index_1.default.listen(PORT, () => console.log(`User service running on port ${PORT}`));
//# sourceMappingURL=server.js.map