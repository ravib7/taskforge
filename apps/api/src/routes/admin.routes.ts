import { Router } from "express"
import { createTask, deleteEmployee, deleteTask, fetchTask, me, readEmployee, registerEmployee, restoreEmployee, UpdateEmployee, updateProfile, updateTask, updateTaskDetails } from "../controllers/admin.controllers"
const router = Router()

router
    .put("/update-profile/:id", updateProfile)
    .get("/me", me)
    .post("/employee-register", registerEmployee)
    .get("/employee", readEmployee)

    .delete("/employee-delete/:eid", deleteEmployee)
    .post("/employee-restore/:eid", restoreEmployee)
    .put("/employee-update/:eid", UpdateEmployee)

    .post("/create-task", createTask)
    .get("/fetch-task", fetchTask)
    .post("/update-task", updateTask)

    .put("/update-task-details/:tid", updateTaskDetails)
    .delete("/task-delete/:tid", deleteTask)


export default router