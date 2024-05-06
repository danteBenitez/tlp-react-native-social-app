import express from "express";
import cors from 'cors';
import path, { dirname } from 'path';
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const posts = [];

app.set('trust proxy', true);
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve(__dirname, '/uploads')));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  createParentPath: true,
}))

app.get("/post", (req, res) => {
  console.log("Llegó una petición: ", req.ip, req.method, req.path);
  res.status(200).json(posts);
})

app.post("/post", (req, res) => {
  console.log("Llegó una petición: ", req.ip, req.method, req.path, req.body);
  const filename = req.files?.["profile-pic"].name;
  if (!filename) {
    const post = {
      id: posts.length+1,
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date(),
      user: {
        username: req.body.username
      }
    }
    posts.push(post);
    return res.status(200).send({
      message: "Post creado exitosamente",
      data: post
    });
  }
  req.files["profile-pic"].mv(`/uploads/${filename}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    posts.push({
      id: posts.length+1,
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date(),
      user: {
        profilePic: `/uploads/${filename}`,
        username: req.body.username
      }
    });
    res.status(200).send({
      message: "Archivo subido correctamente",
      data: req.files["profile-pic"].name
    });
  });
});

app.listen(8083, () => console.log("Servidor escuchando en puerto 8083"));