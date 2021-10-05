import express, { Request, Response, NextFunction } from 'express'
import { URL } from '../models/urls'


export const redirectController = async (req: Request, res: Response, next: NextFunction) => {

    try {

        let uniqueCode = req.params.code


        if (!uniqueCode) {
            res.status(400).json({ success: false, error: 'no uniqueCode in the url' })
            return
        }

        let url = await URL.findOne({ uniqueCode: uniqueCode })

        if (!url) {
            res.status(404).json({ success: false, error: 'url not registered.' })
            return
        }

        res.redirect(url.originalURL)



    } catch (err) {
        next(err)
    }

}