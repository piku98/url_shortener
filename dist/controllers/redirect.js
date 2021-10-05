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
exports.redirectController = void 0;
const urls_1 = require("../models/urls");
const redirectController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uniqueCode = req.params.code;
        if (!uniqueCode) {
            res.status(400).json({ success: false, error: 'no uniqueCode in the url' });
            return;
        }
        let url = yield urls_1.URL.findOne({ uniqueCode: uniqueCode });
        if (!url) {
            res.status(404).json({ success: false, error: 'url not registered.' });
            return;
        }
        res.redirect(url.originalURL);
    }
    catch (err) {
        next(err);
    }
});
exports.redirectController = redirectController;
