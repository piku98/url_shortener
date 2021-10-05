"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerURL = void 0;
const urls_1 = require("../models/urls");
const registerURL = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.url) {
        res.status(400).json({ success: false, error: 'missing url.' });
        return;
    }
    try {
        let urlInfo;
        try {
            urlInfo = {
                originalURL: req.body.url,
                uniqueCode: '',
                expiry: new Date(Date.now() + 10 * 86400000) // days * 86400000 (miliseconds)
            };
        }
        catch (reqBodyErr) {
            res.status(400).json({ success: false, error: reqBodyErr });
            return;
        }
        while (true) {
            try {
                urlInfo.uniqueCode = randomAlphaNumeric(4);
                let urlDoc = new urls_1.URL(urlInfo);
                yield urlDoc.save();
                res.json({ success: true, shortened_url: `${req.protocol}://${req.get('host')}/${urlDoc.uniqueCode}`, expiry: urlDoc.expiry });
                return;
            }
            catch (saveErr) {
                if (saveErr.code == 11000) {
                    if (saveErr.message.search('uniqueCode') != -1)
                        continue;
                    else if (saveErr.message.search('originalURL') != -1) {
                        let urlDoc = yield urls_1.URL.findOne({ originalURL: req.body.url });
                        res.json({ success: true, shortened_url: `${req.protocol}://${req.get('host')}/${urlDoc === null || urlDoc === void 0 ? void 0 : urlDoc.uniqueCode}`, expiry: urlDoc === null || urlDoc === void 0 ? void 0 : urlDoc.expiry });
                    }
                    return;
                }
            }
        }
    }
    catch (err) {
        next(err);
    }
});
exports.registerURL = registerURL;
const randomAlphaNumeric = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
