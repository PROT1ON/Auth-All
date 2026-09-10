import "dotenv/config";
import express from "express"
import authRoutes from './routes/authRoutes'
const app = express()
const port = 5000

//parse josn
app.use(express.json())
//routes
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`App is Listening on PORT :, ${port}`)
})