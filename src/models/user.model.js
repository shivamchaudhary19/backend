import mongoose, { Schema } from "mongoose"

import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true, 
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String, 
            required: true, 
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String, 
            required: true,
            trim: true,
            index: true 
        },
        avatar: {
            type: String, //cloudinary url
            required: true,
            trim: true,
            index: true 
        },
        coverImage: {
            type: String, 
        },
        watchHistor: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        },
    }
)

userSchema.pre("save", async function (next) // pre runs just before saving the data, here we're adding password
    {
        if(!this.isModified("password")) return next();

        this.password = await bcrypt.hash(this.password, 10)
        next()
    } // don't write arrow function here, ,we don't have context of this in arrow function, but here we need "this"
)

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) // returns true or false
} // custom ethod , method is object in which we can add as many methods as we want

userSchema.methods.generateAccessToken = function() {
    return jwt.sign( // jwt has sign method which generates token, give payloads to it
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // time of expiry for accessToken
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
   return jwt.sign(
        {
            _id: this._id // refresh tiken is exactly same as access token , but it takes less payloads, we're only giving it "id".
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    ) 
}

export const User = mongoose.model("User", userSchema)