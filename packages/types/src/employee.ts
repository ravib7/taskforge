import type admin = require("./admin")

export type Communication = {
    id: number,
    message: string,
    userId: number,
    taskId: number
}

export type GET_TASK_REQUEST = void

export type GET_TASK_RESPONSE = {
    message: string,
    result?: admin.Task[]
}

export type CREATE_MESSAGE_REQUEST = {
    message: string,
    userId: number,
    taskId: number
}

export type CREATE_MESSAGE_RESPONSE = {
    message: string,
    result?: Communication[]
}


export type GET_MESSAGE_REQUEST = {
    taskId: number
}

export type GET_MESSAGE_RESPONSE = {
    message: string,
    result?: Communication[]
}