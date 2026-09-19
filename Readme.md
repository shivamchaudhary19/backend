# Backend MegaProject 🚀

A modular backend for a video-sharing platform, built with **Node.js,
Express.js, MongoDB, and Mongoose**.

This project is being developed as a hands-on backend learning project
while implementing concepts used in real-world applications such as
authentication, database relationships, file uploads, cloud storage, API
architecture, error handling, and scalable project structure.

> **Project Status:** Actively under development

------------------------------------------------------------------------

## 📌 Project Overview

The Backend MegaProject is designed around a video-sharing platform
where users can:

-   Create accounts
-   Upload and manage videos
-   Maintain watch history
-   Comment on videos
-   Like content
-   Create playlists
-   Subscribe to other users/channels
-   Post tweets
-   Manage profile information
-   Store media using Cloudinary

The backend follows a modular architecture using:

-   Express.js for the HTTP server
-   MongoDB for database storage
-   Mongoose for data modeling
-   JWT for authentication
-   bcrypt for password hashing
-   Multer for file uploads
-   Cloudinary for media storage

> **Note:** The database model contains the foundation for the complete
> platform. Core user registration and media-upload functionality has
> been implemented, while additional modules are being developed
> incrementally.

------------------------------------------------------------------------

# 🛠️ Tech Stack

## Backend

-   Node.js
-   Express.js

## Database

-   MongoDB
-   Mongoose

## Authentication & Security

-   JSON Web Tokens (JWT)
-   bcrypt
-   Cookie Parser
-   Environment Variables

## File Upload & Media Storage

-   Multer
-   Cloudinary

## Development Tools

-   Nodemon
-   Postman
-   Git & GitHub
-   VS Code

------------------------------------------------------------------------

# 🏗️ Project Architecture

The project follows a modular backend architecture:

``` text
Client
   │
   ▼
Express Routes
   │
   ▼
Middleware
   │
   ▼
Controllers
   │
   ▼
Mongoose Models
   │
   ▼
MongoDB
```

For file uploads:

``` text
Client
   │
   ▼
Multer
   │
   ▼
Temporary Local Storage
   │
   ▼
Cloudinary
   │
   ▼
Cloudinary URL
   │
   ▼
MongoDB Document
```

------------------------------------------------------------------------

# 📁 Project Structure

``` text
Backend MegaProject/
│
├── public/
│   └── temp/
│       └── Temporary uploaded files
│
├── src/
│   │
│   ├── controllers/
│   │   └── user.controller.js
│   │
│   ├── db/
│   │   └── index.js
│   │
│   ├── middlewares/
│   │   └── multer.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── video.model.js
│   │
│   ├── routes/
│   │   └── user.routes.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   └── cloudinary.js
│   │
│   ├── app.js
│   ├── constants.js
│   └── index.js
│
├── .env
├── .env.sample
├── .gitignore
├── .prettierrc
├── package.json
├── package-lock.json
└── README.md
```

------------------------------------------------------------------------

# 🗄️ Database Design

The database is designed using MongoDB collections connected through
MongoDB ObjectId references.

The current Entity Relationship Diagram contains seven major
collections:

``` text
users
videos
comments
likes
tweets
playlists
subscriptions
```

The `users` collection acts as the central entity, while the remaining
collections represent videos, social interactions, playlists, and
subscriptions.

------------------------------------------------------------------------

# 🧩 Entity Relationship Diagram

The current data model contains the following relationships:

``` text
                         ┌───────────────┐
                         │     USERS     │
                         └───────┬───────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
        ┌───────────┐      ┌────────────┐     ┌──────────────┐
        │  VIDEOS   │      │  COMMENTS  │     │   TWEETS     │
        └───────────┘      └────────────┘     └──────────────┘
              │                  │                  │
              │                  └────────┐         │
              │                           ▼         │
              │                       ┌─────────┐   │
              └──────────────────────►│  LIKES  │◄──┘
                                      └─────────┘
              │
              ▼
        ┌────────────┐
        │ PLAYLISTS  │
        └────────────┘

                         ┌────────────────┐
                         │ SUBSCRIPTIONS  │
                         └───────┬────────┘
                                 │
                                 ▼
                               USERS
```

------------------------------------------------------------------------

# 👤 User Model

The `users` collection represents registered users and channels.

### Fields

  Field            Type           Description
  ---------------- -------------- ------------------------------
  `_id`            ObjectId       Unique user identifier
  `username`       String         Unique username
  `email`          String         User email
  `fullName`       String         User's full name
  `avatar`         String         Cloudinary avatar URL
  `coverImage`     String         Cloudinary cover image URL
  `watchHistory`   ObjectId\[\]   References to watched videos
  `password`       String         Hashed password
  `refreshToken`   String         Stored refresh token
  `createdAt`      Date           Creation timestamp
  `updatedAt`      Date           Last update timestamp

### Relationships

A user can:

-   Own videos
-   Own playlists
-   Create comments
-   Create tweets
-   Like content
-   Subscribe to other users
-   Be subscribed to by other users
-   Have videos in their watch history

------------------------------------------------------------------------

# 🎥 Video Model

The `videos` collection stores uploaded video information.

### Fields

  Field           Type              Description
  --------------- ----------------- -------------------------
  `_id`           ObjectId          Unique video identifier
  `videoFile`     String            Video/media URL
  `thumbnail`     String            Thumbnail URL
  `owner`         ObjectId → User   Video owner
  `title`         String            Video title
  `description`   String            Video description
  `duration`      Number            Video duration
  `views`         Number            Number of views
  `isPublished`   Boolean           Publication status
  `createdAt`     Date              Creation timestamp
  `updatedAt`     Date              Last update timestamp

### Relationship

``` text
User
  │
  └──── owns ────> Video
```

A video stores the `owner` as an ObjectId reference to the corresponding
user.

Videos can also be:

-   Added to playlists
-   Commented on
-   Liked
-   Added to users' watch histories

------------------------------------------------------------------------

# 💬 Comment Model

The `comments` collection stores comments made by users on videos.

### Fields

  Field         Type               Description
  ------------- ------------------ ------------------------------
  `_id`         ObjectId           Unique comment identifier
  `content`     String             Comment text
  `createdAt`   Date               Creation timestamp
  `updatedAt`   Date               Last update timestamp
  `video`       ObjectId → Video   Video being commented on
  `owner`       ObjectId → User    User who created the comment

### Relationships

``` text
User
  │
  └──── creates ────> Comment
                         │
                         ▼
                       Video
```

This allows the application to determine:

-   Who created a comment
-   Which video the comment belongs to

------------------------------------------------------------------------

# ❤️ Like Model

The `likes` collection represents user interactions with content.

### Fields

  Field         Type                 Description
  ------------- -------------------- ----------------------------
  `_id`         ObjectId             Unique like identifier
  `comment`     ObjectId → Comment   Liked comment
  `createdAt`   Date                 Like creation timestamp
  `video`       ObjectId → Video     Liked video
  `updatedAt`   Date                 Last update timestamp
  `likedBy`     ObjectId → User      User who liked the content
  `tweet`       ObjectId → Tweet     Liked tweet

The model allows likes to be associated with different content types:

``` text
User
 │
 └──> Like ──> Video

User
 │
 └──> Like ──> Comment

User
 │
 └──> Like ──> Tweet
```

------------------------------------------------------------------------

# 🐦 Tweet Model

The `tweets` collection stores text-based posts created by users.

### Fields

  Field         Type              Description
  ------------- ----------------- -------------------------
  `_id`         ObjectId          Unique tweet identifier
  `owner`       ObjectId → User   Tweet creator
  `content`     String            Tweet content
  `createdAt`   Date              Creation timestamp
  `updatedAt`   Date              Last update timestamp

### Relationship

``` text
User
  │
  └──── creates ────> Tweet
```

Tweets can also be referenced by the `likes` collection.

------------------------------------------------------------------------

# 📋 Playlist Model

The `playlists` collection allows users to organize videos into
collections.

### Fields

  Field           Type                    Description
  --------------- ----------------------- ----------------------------
  `_id`           ObjectId                Unique playlist identifier
  `name`          String                  Playlist name
  `description`   String                  Playlist description
  `createdAt`     Date                    Creation timestamp
  `updatedAt`     Date                    Last update timestamp
  `videos`        ObjectId\[\] → Videos   Videos inside the playlist
  `owner`         ObjectId → User         Playlist owner

### Relationships

``` text
User
 │
 └──── owns ──────> Playlist
                       │
                       └──── contains ────> Videos
```

A playlist can contain multiple videos.

------------------------------------------------------------------------

# 🔔 Subscription Model

The `subscriptions` collection represents the relationship between users
and channels.

### Fields

  Field          Type              Description
  -------------- ----------------- ----------------------------------
  `_id`          ObjectId          Unique subscription identifier
  `subscriber`   ObjectId → User   User subscribing to a channel
  `channel`      ObjectId → User   User/channel being subscribed to
  `createdAt`    Date              Subscription creation timestamp
  `updatedAt`    Date              Last update timestamp

### Relationship

``` text
Subscriber User
      │
      │ subscribes to
      ▼
Channel User
```

Both `subscriber` and `channel` reference the `users` collection.

------------------------------------------------------------------------

# 🔗 Database Relationship Summary

  -----------------------------------------------------------------------
  Collection              References              Purpose
  ----------------------- ----------------------- -----------------------
  `users`                 `videos`                Stores user's watch
                                                  history

  `videos`                `users`                 Stores video owner

  `comments`              `users`, `videos`       Connects comments with
                                                  users and videos

  `likes`                 `users`, `videos`,      Stores content
                          `comments`, `tweets`    interactions

  `tweets`                `users`                 Stores tweet owner

  `playlists`             `users`, `videos`       Connects playlists with
                                                  owners and videos

  `subscriptions`         `users`                 Connects subscribers
                                                  with channels
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 🔐 Authentication

Authentication is implemented using **JWT (JSON Web Tokens)**.

The project uses two types of tokens:

``` text
Access Token
Refresh Token
```

The user model provides separate methods for generating both tokens.

### Access Token

Used to authenticate requests to protected resources.

### Refresh Token

Used to obtain a new access token after the access token expires.

### Authentication Flow

``` text
User
 │
 ├── Login
 │
 ▼
Server verifies credentials
 │
 ▼
JWT tokens generated
 │
 ├── Access Token
 │
 └── Refresh Token
 │
 ▼
Authenticated Requests
```

------------------------------------------------------------------------

# 🔑 Password Security

Passwords are never stored as plain text.

Before a user is saved:

``` text
Plain Password
      │
      ▼
    bcrypt
      │
      ▼
Hashed Password
      │
      ▼
    MongoDB
```

During authentication:

``` text
Login Password
      │
      ▼
bcrypt.compare()
      │
      ▼
Stored Password Hash
      │
      ▼
true / false
```

------------------------------------------------------------------------

# ☁️ Cloudinary Integration

Cloudinary is used for storing uploaded media.

The upload flow is:

``` text
Client
  │
  │ multipart/form-data
  ▼
Multer
  │
  ▼
Temporary Local File
  │
  ▼
Cloudinary
  │
  ▼
Cloud URL
  │
  ▼
MongoDB
```

For example, during user registration:

``` text
Avatar
  │
  ▼
Multer
  │
  ▼
Local temporary file
  │
  ▼
Cloudinary
  │
  ▼
Avatar URL
  │
  ▼
User Document
```

The same architecture can be extended to video files and thumbnails.

------------------------------------------------------------------------

# 📤 File Upload System

Multer is used as middleware for handling `multipart/form-data`.

For user registration, the API accepts:

``` text
avatar
coverImage
```

The route uses:

``` javascript
upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
])
```

Uploaded files can then be accessed through:

``` javascript
req.files
```

------------------------------------------------------------------------

# 🚨 Custom Error Handling

The project contains a custom `ApiError` class.

Example:

``` javascript
throw new ApiError(
    409,
    "User with email or username already exists"
)
```

This keeps API errors consistent and makes controller code easier to
maintain.

------------------------------------------------------------------------

# 📦 Standard API Responses

The project contains an `ApiResponse` utility for creating consistent
API responses.

Example:

``` json
{
    "statusCode": 201,
    "data": {},
    "message": "User registered successfully",
    "success": true
}
```

This provides a predictable response structure for API consumers.

------------------------------------------------------------------------

# ⚡ Async Handler

Asynchronous controller functions are wrapped using the `asyncHandler`
utility.

Instead of repeatedly writing:

``` javascript
try {
    // async operation
} catch (error) {
    // handle error
}
```

controllers can use:

``` javascript
const registerUser = asyncHandler(async (req, res) => {
    // controller logic
})
```

This keeps asynchronous error handling centralized.

------------------------------------------------------------------------

# 🌐 CORS

The Express application uses CORS to control which frontend origins can
communicate with the backend.

Example:

``` javascript
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
```

This is useful when the frontend and backend run on different origins.

------------------------------------------------------------------------

# 📡 Current API

## User Registration

### Endpoint

``` http
POST /api/v1/users/register
```

### Content Type

``` text
multipart/form-data
```

### Text Fields

``` text
fullName
email
username
password
```

### File Fields

``` text
avatar
coverImage
```

`avatar` is required while `coverImage` is optional.

------------------------------------------------------------------------

# 🧪 Testing with Postman

The API can be tested using Postman.

### Register User

``` text
POST
http://localhost:8000/api/v1/users/register
```

Select:

``` text
Body
  └── form-data
```

Add:

``` text
fullName      → Text
email         → Text
username      → Text
password      → Text
avatar        → File
coverImage    → File (optional)
```

The field names must exactly match the names expected by the Multer
middleware.

------------------------------------------------------------------------

# 📊 Example Successful Registration Response

``` json
{
    "statusCode": 201,
    "data": {
        "_id": "USER_ID",
        "username": "shiva",
        "email": "shivam@gmail.com",
        "fullName": "Shivam Chaudhary",
        "avatar": "https://res.cloudinary.com/...",
        "coverImage": "",
        "watchHistory": [],
        "__v": 0
    },
    "message": "User registered successfully",
    "success": true
}
```

------------------------------------------------------------------------

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

Example:

``` env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> **Important:** Never commit the real `.env` file or API secrets to
> GitHub.

Use `.env.sample` to document required environment variables without
exposing credentials.

------------------------------------------------------------------------

# 🚀 Getting Started

## 1. Clone the Repository

``` bash
git clone https://github.com/shivamchaudhary19/backend.git
```

## 2. Enter the Project

``` bash
cd backend
```

## 3. Install Dependencies

``` bash
npm install
```

## 4. Configure Environment Variables

Create a `.env` file and add the required:

-   MongoDB connection string
-   JWT secrets
-   Cloudinary credentials
-   CORS origin
-   Port configuration

## 5. Start the Development Server

``` bash
npm run dev
```

The backend will run on:

``` text
http://localhost:8000
```

------------------------------------------------------------------------

# 🧠 Backend Concepts Covered

This project is being used to understand and implement real backend
concepts including:

-   Node.js
-   Express.js
-   REST APIs
-   HTTP methods
-   Routing
-   Controllers
-   Middleware
-   MongoDB
-   Mongoose
-   Schemas
-   Models
-   MongoDB ObjectId references
-   Database relationships
-   Password hashing
-   bcrypt
-   JWT
-   Access tokens
-   Refresh tokens
-   Authentication
-   Authorization
-   Cookies
-   CORS
-   Multer
-   Multipart form data
-   Cloudinary
-   Environment variables
-   Custom API errors
-   Standard API responses
-   Async error handling
-   MVC-style architecture
-   API testing with Postman
-   Git & GitHub

------------------------------------------------------------------------

# 🧩 Database Mental Model

The easiest way to understand the database is to think of `users` as the
central entity.

``` text
                              USERS
                                │
            ┌───────────────────┼────────────────────┐
            │                   │                    │
            ▼                   ▼                    ▼
         VIDEOS              TWEETS             PLAYLISTS
            │                   │                    │
            │                   │                    └──> VIDEOS
            │                   │
            ▼                   ▼
        COMMENTS              LIKES
            │                   ▲
            └───────────────────┘

                              USERS
                                │
                                ▼
                         SUBSCRIPTIONS
                                │
                                ▼
                              USERS
```

This model allows the platform to represent relationships between users
and the content they create, consume, and interact with.

------------------------------------------------------------------------

# 🔄 Example Data Flow

## User Registration

``` text
POST /api/v1/users/register
          │
          ▼
Express Router
          │
          ▼
Multer Middleware
          │
          ├── Avatar
          └── Cover Image
          │
          ▼
User Controller
          │
          ├── Validate input
          ├── Check existing user
          ├── Upload media
          └── Create user
          │
          ▼
Mongoose
          │
          ▼
MongoDB
          │
          ▼
API Response
```

------------------------------------------------------------------------

# 🏛️ Why This Architecture?

The project separates responsibilities into different layers.

### Routes

Responsible for:

``` text
Which endpoint?
Which HTTP method?
Which middleware?
Which controller?
```

### Middleware

Responsible for operations that happen between the request and
controller.

Examples:

``` text
Authentication
File Upload
Request Processing
```

### Controllers

Responsible for application and business logic.

Example:

``` text
Register user
Check duplicate user
Upload avatar
Create database entry
Return response
```

### Models

Responsible for defining database structure and relationships.

### Utils

Contains reusable functionality such as:

``` text
ApiError
ApiResponse
asyncHandler
Cloudinary utilities
```

------------------------------------------------------------------------

# 📈 Development Roadmap

## Authentication

-   [x] User registration
-   [x] Password hashing
-   [x] JWT access token generation
-   [x] JWT refresh token generation
-   [ ] Login
-   [ ] Logout
-   [ ] Refresh access token
-   [ ] Protected routes
-   [ ] Change password

## User Features

-   [x] User model
-   [x] Avatar upload
-   [x] Cover image upload
-   [ ] Update profile
-   [ ] Channel profile
-   [ ] Watch history APIs

## Video Features

-   [x] Video model
-   [ ] Video upload
-   [ ] Video listing
-   [ ] Get video by ID
-   [ ] Update video
-   [ ] Delete video
-   [ ] Publish/unpublish video
-   [ ] View counting

## Comment Features

-   [x] Comment model
-   [ ] Add comment
-   [ ] Update comment
-   [ ] Delete comment
-   [ ] Get video comments

## Like Features

-   [x] Like model
-   [ ] Like/unlike video
-   [ ] Like/unlike comment
-   [ ] Like/unlike tweet

## Playlist Features

-   [x] Playlist model
-   [ ] Create playlist
-   [ ] Update playlist
-   [ ] Delete playlist
-   [ ] Add video to playlist
-   [ ] Remove video from playlist

## Subscription Features

-   [x] Subscription model
-   [ ] Subscribe to channel
-   [ ] Unsubscribe from channel
-   [ ] Get subscribed channels
-   [ ] Get channel subscribers

## Tweet Features

-   [x] Tweet model
-   [ ] Create tweet
-   [ ] Update tweet
-   [ ] Delete tweet
-   [ ] Get tweets

------------------------------------------------------------------------

# 🔒 Security Considerations

The project follows several important backend security practices:

-   Passwords are hashed using bcrypt.
-   JWT secrets are stored in environment variables.
-   Cloudinary credentials are stored in environment variables.
-   `.env` should not be committed to Git.
-   Sensitive credentials should never be hardcoded.
-   Authentication should be applied to protected routes.
-   User input should be validated before database operations.
-   API errors should not expose sensitive internal information.

------------------------------------------------------------------------

# 📚 Learning Journey

This project is also a practical backend learning journey.

Instead of building isolated examples, concepts are implemented together
in one evolving backend.

The development process follows:

``` text
Concept
   ↓
Implementation
   ↓
Error
   ↓
Debugging
   ↓
Understanding
   ↓
Better Implementation
```

Through this project, the goal is to understand how individual backend
concepts connect together to form a real application.

------------------------------------------------------------------------

# 🧪 Current Project Status

### Implemented

-   Express server setup
-   MongoDB connection
-   Mongoose models
-   User registration
-   User validation
-   Duplicate user checking
-   bcrypt password hashing
-   JWT token generation methods
-   Multer file uploads
-   Avatar upload
-   Cover image upload
-   Cloudinary integration
-   Custom API errors
-   Standard API responses
-   Async handler
-   CORS configuration
-   Postman testing

### In Development

-   Login
-   Logout
-   Authentication middleware
-   Protected routes
-   Video APIs
-   Comment APIs
-   Like APIs
-   Playlist APIs
-   Subscription APIs
-   Tweet APIs
-   Watch history APIs

------------------------------------------------------------------------

# 🎯 Project Goal

The long-term goal is to build a complete, modular video-sharing backend
while developing strong practical backend development skills.

The project focuses on understanding **why** backend systems are
structured in a particular way, rather than simply memorizing syntax.

------------------------------------------------------------------------

# 👨‍💻 Author

**Shivam Chaudhary**

B.Tech CSE

GitHub:\
https://github.com/shivamchaudhary19

------------------------------------------------------------------------

# 📄 License

This project is currently being developed as a learning and portfolio
project.
