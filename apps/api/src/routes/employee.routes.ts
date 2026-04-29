import { Router } from "express"
import { addMessage, employeeTasks, getMessage } from "../controllers/employee.controller"
const router = Router()

router
    .get("/employee-task", employeeTasks)
    .get("/get-message", getMessage)
    .post("/add-message", addMessage)

export default router