import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()


export const connectDB = () => {

    let databaseurl;

    switch (process.env.ENVIRONMENT) {
        case 'LOCAL':
            databaseurl = process.env.LOCAL_DB_URL
            break
        case 'PROD':
            databaseurl = process.env.PROD_DB_URL
            break
        case 'STAGING':
            databaseurl = process.env.STAGING_DB_URL
            break
    }

    if (!databaseurl) {
        throw new Error('invalid DB URL')
    }
    console.log(`CONNECTING TO ${databaseurl}`)
    mongoose.connect(databaseurl).then(data => { console.log(`CONNECTED`) }).catch(err => { throw err });

}

