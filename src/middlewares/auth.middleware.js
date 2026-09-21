import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.reaplce("Bearer", "")
    
        // if there's not token
        if (!token) {
            throw new ApiError (401, "unauthorized request")
        }
    
        // if there's token
        const decodedToken = jwt.verify(token, process.env.ACCCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken") // why  _id ?, because when we created the model , we used _id
    
        // if we don't have user
        if (!user) {
            // NEXT_VIDEO: discuss about frontend
            throw new ApiError(401, "Invalid Access Token")
        }
    
        // if we have user
        req.user = user;
        next()

    } catch (error) {
        throw new ApiError(401, "Invalid Access Token")
    }
})