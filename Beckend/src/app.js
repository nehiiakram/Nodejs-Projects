
import express from "express"
import postModel from "./models/post.model.js"
import multer from "multer"
import uploadFile from "../services/storage.service.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get('/posts', async(req, res) => {
   const post = await postModel.find()

   res.status(200).json({
      message: "Posts fetched sucessfully",
      post
   })
})

app.post('/posts', upload.single("image"), async(req, res) => {
    const data = req.body
    const imgBuffer = req.file.buffer

    console.log(data, imgBuffer)

    const result = await uploadFile(imgBuffer)
    console.log(result)

    const post = await postModel.create({
       image: result.url,
       desc: data.desc
    })

    res.status(201).json({
       messgae: "Post created sucessfully",
       post
    })
})

export default app
