const express = require("express");
const bodyParser = require("body-parser"); //解析請求資料(body)
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const profileRoutes = require("./routes/profile");
const { register } = require("./controllers/auth");
const { createPost } = require("./controllers/posts");
const { changeAvatar } = require("./controllers/users");
const { verifyToken } = require("./middleware/auth");
const User = require("./models/User");
const Post = require("./models/Post");
const { users, posts } = require("./data/index");
const { ImgurClient } = require("imgur");
/* CONFIGURATIONS */

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* TEST */
app.get("/test", (req, res) => {
  res.json({
    message: "test work",
  });
});

/*FileStorage */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/assets');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

/* Imgur */
const upload = multer({
  filename: function (req, file, cb) {
    const uniquename = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquename + path.extname(file.originalname));
  },
});

/* ROUTES WITH FILES TO LOCAL */
// app.post('/auth/register', upload.single('picture'), register);
// app.post('/posts', verifyToken, upload.single('picture'), createPost);
// app.patch(
//   '/profile/:id/avatar',
//   verifyToken,
//   upload.single('picture'),
//   changeAvatar
// );

/* ROUTES WITH FILES TO IMGUR */
const uploadToImgur = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }
    const client = new ImgurClient({
      clientId: process.env.IMGUR_CLIENT_ID,
      clientSecret: process.env.IMGUR_CLIENT_SECRET,
      refreshToken: process.env.IMGUR_REFRESH_TOKEN,
    });
    const imageBase64 = req.file.buffer.toString("base64");
    const response = await client.upload({
      image: imageBase64,
      type: "base64",
      album: process.env.IMGUR_ALBUM_ID,
    });
    // res.send({ url: response.data.link });
    console.log(response.data);
    req.imagePath = response.data.link;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
app.post("/avatar", upload.single("picture"), uploadToImgur);

app.post("/auth/register", upload.single("picture"), uploadToImgur, register);
app.post(
  "/posts",
  verifyToken,
  upload.single("picture"),
  uploadToImgur,
  createPost
);
app.patch(
  "/profile/:id/avatar",
  verifyToken,
  upload.single("picture"),
  uploadToImgur,
  changeAvatar
);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/profile", profileRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port:${PORT}`));
    /*ADD DATE */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
