"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = exports.URLSchema = void 0;
const mongoose_1 = require("mongoose");
exports.URLSchema = new mongoose_1.Schema({
    originalURL: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (urlstring) => {
                let pattern = new RegExp("((http|https)://)(www.)?" +
                    "[a-zA-Z0-9@:%._\\+~#?&//=]" +
                    "{2,256}\\.[a-z]" +
                    "{2,6}\\b([-a-zA-Z0-9@:%" +
                    "._\\+~#?&//=]*)");
                return pattern.test(urlstring);
            },
            message: 'invalid url'
        }
    },
    uniqueCode: {
        type: String,
        required: true,
        unique: true
    },
    expiry: {
        type: Date,
        required: true
    }
});
exports.URL = (0, mongoose_1.model)('url', exports.URLSchema);
