// require ('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})
 

// First, connect to the MongoDB database.
// connectDB() returns a Promise, so we use .then() to run the code below
// only after the database connection succeeds.
connectDB()
    .then(() => {

        // Start the Express server only after MongoDB is connected.
        // process.env.PORT is provided by the deployment platform;
        // if it's unavailable, use port 8000 as the fallback.
        app.listen(process.env.PORT || 8000, () => {

            // Log a message when the server starts listening for requests.
            console.log(`Server is running at port: ${process.env.PORT}`)
        })
    })

    // If the database connection fails, this .catch() block handles the error.
    .catch((err) => {
        console.log("MONGO db connection failed !!!", err);
    });

/* (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/ ${DB_NAME}`)
        app.on("error", (error) => {
        console.log("ERR:", error);
        throw error    
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
        } catch (error) {
        console.error("Error:", error)
        throw error
    }
})
    */