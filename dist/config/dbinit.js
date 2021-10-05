"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = () => {
    let databaseurl;
    switch (process.env.ENVIRONMENT) {
        case 'LOCAL':
            databaseurl = process.env.LOCAL_DB_URL;
            break;
        case 'PROD':
            databaseurl = process.env.PROD_DB_URL;
            break;
        case 'STAGING':
            databaseurl = process.env.STAGING_DB_URL;
            break;
    }
    if (!databaseurl) {
        throw new Error('invalid DB URL');
    }
    console.log(`CONNECTING TO ${databaseurl}`);
    mongoose_1.default.connect(databaseurl).then(data => { console.log(`CONNECTED`); }).catch(err => { throw err; });
};
exports.connectDB = connectDB;
