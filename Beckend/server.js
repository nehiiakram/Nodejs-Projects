
import app from "./src/app.js"
import connectDB from "./src/db/db.js"

const port = 3000

async function startServer() {
    try {
        await connectDB()

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log("Server start error:", error)
    }
}

startServer()
