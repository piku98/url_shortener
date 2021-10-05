import { Connection, Schema, model, Document } from 'mongoose'


export interface IURL extends Document {
    originalURL: string,
    uniqueCode: string,
    expiry: Date
}

export const URLSchema = new Schema({
    originalURL: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (urlstring: string) => {
                let pattern = new RegExp("((http|https)://)(www.)?" +
                    "[a-zA-Z0-9@:%._\\+~#?&//=]" +
                    "{2,256}\\.[a-z]" +
                    "{2,6}\\b([-a-zA-Z0-9@:%" +
                    "._\\+~#?&//=]*)")
                return pattern.test(urlstring)
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
})

export const URL = model<IURL>('url', URLSchema)