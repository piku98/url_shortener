"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const dbinit_1 = require("./config/dbinit");
const redirect_1 = require("./controllers/redirect");
const registerurl_1 = require("./controllers/registerurl");
dotenv_1.default.config();
(0, dbinit_1.connectDB)();
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.get('/:code', redirect_1.redirectController);
app.post('/register', registerurl_1.registerURL);
//if no endpoint hits then it comes here and 404 is generated.
app.use((req, res, next) => {
    let err = new Error('404 page not found.');
    next(err);
});
//error management.
app.use((err, req, res, next) => {
    if (err.message === '404 page not found.') {
        console.log(err.message);
        res.status(404).json({ success: false, error: 'Page not found' });
    }
    else if (err instanceof SyntaxError) {
        console.log(err.message);
        res.status(400).json({ success: false, error: err.message });
    }
    else {
        console.log(err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
    next();
});
const PORT = process.env.PORT || '3000';
app.listen(PORT, () => console.log(`listening at ${PORT}.`));
