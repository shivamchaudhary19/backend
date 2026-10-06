import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))  // we can directly use cors(); , but we can give some setting too

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"})) //extended not necessary , used just for , object inside another object
app.use(express.static("public")) // giving a public folder where we store some files on the server , images , pdf etc..
app.use(cookieParser())  // to request cookie
app.use("/api/v1/users", userRouter)

//routes import 
import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter)

// http:localhost:8000/api/v1/users/register

export { app }