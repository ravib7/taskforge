import { APP_URL } from "@/config/env"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_RESPONSE, GET_MESSAGE_REQUEST, GET_MESSAGE_RESPONSE, GET_TASK_RESPONSE } from "@repo/types"

export const employeeApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_URL}/api/employee`, credentials: "include" }),
    tagTypes: ["employee"],
    endpoints: (builder) => {
        return {
            getTasks: builder.query<GET_TASK_RESPONSE, void>({
                query: () => {
                    return {
                        url: "/employee-task",
                        method: "GET"
                    }
                },
                providesTags: ["employee"]
            }),

            getMessage: builder.query<GET_MESSAGE_RESPONSE, GET_MESSAGE_REQUEST>({
                query: taskId => {
                    return {
                        url: "/get-message",
                        method: "GET",
                        params: taskId
                    }
                },
                providesTags: ["employee"]
            }),

            createMessage: builder.mutation<CREATE_MESSAGE_RESPONSE, CREATE_MESSAGE_REQUEST>({
                query: messageData => {
                    return {
                        url: "/add-message",
                        method: "POST",
                        body: messageData
                    }
                },
                invalidatesTags: ["employee"]
            }),
        }
    }
})

export const {
    useGetTasksQuery,
    useGetMessageQuery,
    useCreateMessageMutation
} = employeeApi
