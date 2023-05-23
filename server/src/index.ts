import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import user from './routes/user'
import post from './routes/post'


const app = express()
dotenv.config()
app.use(cors())

const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: '3mb' }))
app.use(bodyParser.urlencoded({ limit: '3mb', extended: true }))

app.use('/user', user)
app.use('/posts', post)

mongoose.connect(process.env.CONNECTION_URL as string)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message))