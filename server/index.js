import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import multer from 'multer';
import usersRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import path from 'path';
const router = express.Router();


const app = express();

dotenv.config();
/*const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = path.resolve(); */

const __dirname = (() => {let x = path.dirname(decodeURI(new URL(import.meta.url).pathname)); return path.resolve( (process.platform == "win32") ? x.substr(1) : x ); })();



app.use(bodyParser.json({limit:"30mb", extende:"true"}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:"true"}));
app.use(helmet());
app.use(morgan("common"));
app.use(cors());





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb)=>{
    cb(null, req.body.name);
  }
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res)=>{
  try{
     return res.status(200).json("File uploaded successfully")
  }
  catch(err){
    console.log(err);
  }
});

app.use('/api/users', usersRoutes);
app.use('/api/posts', postRoutes);
app.use("/images", express.static(path.join(__dirname, "public/images")));

const CONNECTION_URL = "mongodb+srv://myl772ng:myl772ng@cluster0.ivg6j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser :true, useUnifiedTopology: true})
  .then(()=> app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)))
  .catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify', false);
