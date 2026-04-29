import express from "express"
import cors from "cors"
import authRouts from './routes/auth.routes'
import adminRouts from './routes/admin.routes'
import employeeRouts from './routes/employee.routes'
import { FRONTEND_URL } from "./config/env"
import cookieParser from "cookie-parser"
import { protect } from "./middleware/auth.middleware"


const app = express()

app.use(cookieParser())

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))

app.use(express.json())

app.use("/api/auth", authRouts)
app.use("/api/admin", protect("admin"), adminRouts)
app.use("/api/employee", protect("employee"), employeeRouts)

app.get("/", (req, res) => {
    res.json({ message: "API running successfully" })
})
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})