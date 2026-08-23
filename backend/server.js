import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT
import CONECTDB from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import userRoute from "./router/userRoute.js"
import companyRoute from "./router/companyRoute.js"
import jobRoute from "./router/jobRoute.js"
import applicationRoute from "./router/aplicationRoute.js"
import path from "path"

const _dirname = path.resolve()
CONECTDB()
 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}

app.use(cors(corsOptions))

//api's

app.use("/api/v1/user",userRoute) 
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)


app.use(express.static(path.join(_dirname,"/frontend/dist")))

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})

