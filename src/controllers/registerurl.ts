import express, { Request, Response, NextFunction } from 'express'
import { URL, IURL } from '../models/urls'


export const registerURL = async (req: Request, res: Response, next: NextFunction) => {


    if (!req.body.url) {
        res.status(400).json({ success: false, error: 'missing url.' })
        return
    }


    try {

        let urlInfo: IURL;

        try {
            urlInfo = <IURL>{
                originalURL: req.body.url,
                uniqueCode: '',
                expiry: new Date(Date.now() + 10 * 86400000) // days * 86400000 (miliseconds)
            }
        } catch (reqBodyErr) {
            res.status(400).json({ success: false, error: reqBodyErr })
            return
        }

        while (true) {
            try {
                urlInfo.uniqueCode = randomAlphaNumeric(4)
                let urlDoc = new URL(urlInfo)
                await urlDoc.save()
                res.json({ success: true, shortened_url: `${req.protocol}://${req.get('host')}/${urlDoc.uniqueCode}`, expiry: urlDoc.expiry })
                return
            } catch (saveErr: any) {

                if (saveErr.code == 11000) {
                    if (saveErr.message.search('uniqueCode') != -1) continue;
                    else if (saveErr.message.search('originalURL') != -1) {
                        let urlDoc = await URL.findOne({ originalURL: req.body.url })
                        res.json({ success: true, shortened_url: `${req.protocol}://${req.get('host')}/${urlDoc?.uniqueCode}`, expiry: urlDoc?.expiry })

                    }
                    return
                }
            }


        }

    } catch (err) {

        next(err)

    }



}


const randomAlphaNumeric = (length: number): string => {
    let result: string = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}