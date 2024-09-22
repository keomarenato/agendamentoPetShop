import express from 'express'
import cors from 'cors'
 

import { router } from './routes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/images', express.static('public/images'));


app.use(router)

app.listen(3333, () => console.log("Conectado com sucesso"))