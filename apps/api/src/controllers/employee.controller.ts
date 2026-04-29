import { and, eq } from "drizzle-orm"
import db from "../config/db"
import { Request, Response } from "express"
import { CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_RESPONSE, GET_MESSAGE_REQUEST, GET_MESSAGE_RESPONSE, GET_TASK_REQUEST, GET_TASK_RESPONSE } from "@repo/types"
import { communication, task } from "../models"

interface AuthRequest extends Request {
    user: number
}

export const employeeTasks = async (mreq: Request<{}, {}, GET_TASK_REQUEST>, res: Response<GET_TASK_RESPONSE>) => {
    try {
        const req = mreq as AuthRequest
        const result = await db.select().from(task).where(eq(task.userId, req.user))
        res.status(200).json({ message: "task fetch success", result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to fetch sucess" })
    }
}


export const addMessage = async (
    req: Request<{}, {}, CREATE_MESSAGE_REQUEST>,
    res: Response<CREATE_MESSAGE_RESPONSE>) => {
    try {
        const { message, userId, taskId } = req.body
        await db.insert(communication).values({ message, userId, taskId })
        res.status(200).json({ message: "crate message success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to create message" })
    }
}

// export const getMessage = async (
//     mreq: Request<{}, {}, GET_MESSAGE_REQUEST>,
//     res: Response<GET_MESSAGE_RESPONSE>) => {
//     try {
//         const { taskId } = mreq.query
//         const req = mreq as AuthRequest
//         await db.select().from(communication).where(eq(communication.userId, req.user))
//         await db.select().from(task).where(eq(task.id, taskId))
//         res.status(200).json({ message: "message fetch success", })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "unable to fetch message" })
//     }
// }


export const getMessage = async (
    mreq: Request,
    res: Response<GET_MESSAGE_RESPONSE>
) => {
    try {
        const { taskId } = mreq.query;
        const req = mreq as AuthRequest;

        const result = await db
            .select()
            .from(communication)
            .where(
                and(
                    eq(communication.userId, req.user),
                    eq(communication.taskId, Number(taskId))
                )
            );

        res.status(200).json({
            message: "message fetch success",
            result
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "unable to fetch message" });
    }
};