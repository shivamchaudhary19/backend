import { v2 as cloudinary } from "cloudinary"; // same mondatory syntax
import fs from "fs"; // this is file system

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}); // cloudinary configuration

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log(response);

        //file has been uploaded successfully
        console.log("File uploaded on cloudinary", response.url);

        // remove the locally saved temporary file
        fs.unlinkSync(localFilePath);

        return response;

    } catch (error) {
        console.log("CLOUDINARY ERROR:", error);

        fs.unlinkSync(localFilePath);

        return null;
    }
};

export { uploadOnCloudinary };