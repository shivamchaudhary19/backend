import mongoose , {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema (
    {
        videoFile: {
            type: String, //cloudinary url 
            required: true 
        },
        
        thumbnails: {
            type: String, //cloudinary url
            required: true 
        },

        title: {
            type: String,  //cloudinary url
            required: true 
        }, 

        description: {
            type: String, 
            required: true 
        },

        duration: {
            type: Number, 
            required: true 
        },
         
        views: {
            type: Number, 
            required: 0 
        },
        
        isPublished: {
            type: Boolean, 
            required: true 
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    },
    {
        timestamps: true
    }
)

videoSchema.plugins(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)