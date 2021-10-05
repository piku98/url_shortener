import express, { Application, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { json, urlencoded } from 'body-parser'
import { connectDB } from './config/dbinit'
import { redirectController } from './controllers/redirect'
import { registerURL } from './controllers/registerurl'

dotenv.config()

connectDB()

const app: Application = express()

app.use(json())
app.use(urlencoded({ extended: false }))


app.get('/:code', redirectController)
app.post('/register', registerURL)


//if no endpoint hits then it comes here and 404 is generated.
app.use((req: Request, res: Response, next: NextFunction) => {
    let err = new Error('404 page not found.')
    next(err)
})


//error management.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.message === '404 page not found.') {
        console.log(err.message)
        res.status(404).json({ success: false, error: 'Page not found' })
    } else if (err instanceof SyntaxError) {
        console.log(err.message)
        res.status(400).json({ success: false, error: err.message })
    } else {
        console.log(err)
        res.status(500).json({ success: false, error: 'Internal server error' })
    }
    next()
})




const PORT: string = process.env.PORT || '3000'
app.listen(PORT, () => console.log(`listening at ${PORT}.`))