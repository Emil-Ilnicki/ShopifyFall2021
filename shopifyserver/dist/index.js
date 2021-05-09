"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const typescript_rest_1 = require("typescript-rest");
exports.app = express_1.default();
exports.app.use(cors_1.default());
exports.app.use(body_parser_1.default.json());
typescript_rest_1.Server.buildServices(exports.app);
let PORT = 4000;
exports.app.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);
});
