import { APP_URL } from "@/config/env"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CREATE_TASK_REQUEST, CREATE_TASK_RESPONSE, DELETE_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_RESPONSE, DELETE_TASK_REQUEST, DELETE_TASK_RESPONSE, FETCH_TASK_REQUEST, FETCH_TASK_RESPONSE, ME_REQUEST, ME_RESPONSE, READ_EMPLOYEE_REQUEST, READ_EMPLOYEE_RESPONSE, REGISTER_EMPLOYEE_REQUEST, REGISTER_EMPLOYEE_RESPONSE, RESTORE_EMPLOYEE_REQUEST, RESTORE_EMPLOYEE_RESPONSE, UPDATE_EMPLOYEE_RESPONSE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESPONSE, UPDATE_TASK_DETAILS_REQUEST, UPDATE_TASK_DETAILS_RESPONSE, UPDATE_TASK_REQUEST, UPDATE_TASK_RESPONSE } from "@repo/types"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_URL}/api/admin`, credentials: "include" }),
    tagTypes: ["profile", "employee", "task"],
    endpoints: (builder) => {
        return {
            updateProfile: builder.mutation<UPDATE_PROFILE_RESPONSE, { id: number, fd: FormData }>({
                query: userData => {
                    return {
                        url: `/update-profile/${userData.id}`,
                        method: "PUT",
                        body: userData.fd
                    }
                },
                invalidatesTags: ["profile"]
            }),

            fetchMe: builder.query<ME_RESPONSE, ME_REQUEST>({
                query: () => {
                    return {
                        url: "/me",
                        method: "GET",
                    }
                },
                providesTags: ["profile"]
            }),

            getEmployee: builder.query<READ_EMPLOYEE_RESPONSE, READ_EMPLOYEE_REQUEST>({
                query: () => {
                    return {
                        url: "/employee",
                        method: "GET",
                    }
                },
                providesTags: ["employee"]
            }),

            registerEmployee: builder.mutation<REGISTER_EMPLOYEE_RESPONSE, FormData>({
                query: employeeData => {
                    return {
                        url: "/employee-register",
                        method: "POST",
                        body: employeeData
                    }
                },
                invalidatesTags: ["employee"]
            }),

            deleteEmployee: builder.mutation<DELETE_EMPLOYEE_RESPONSE, DELETE_EMPLOYEE_REQUEST>({
                query: employeeData => {
                    return {
                        url: "/employee-delete/" + employeeData.id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["employee"]
            }),

            restoreEmployee: builder.mutation<RESTORE_EMPLOYEE_RESPONSE, RESTORE_EMPLOYEE_REQUEST>({
                query: employeeData => {
                    return {
                        url: "/employee-restore/" + employeeData.id,
                        method: "POST",
                    }
                },
                invalidatesTags: ["employee"]
            }),

            updateEmployee: builder.mutation<UPDATE_EMPLOYEE_RESPONSE, { id: number, fd: FormData }>({
                query: employeeData => {
                    return {
                        url: "/employee-update/" + employeeData.id,
                        method: "PUT",
                        body: employeeData.fd
                    }
                },
                invalidatesTags: ["employee"]
            }),

            createTask: builder.mutation<CREATE_TASK_RESPONSE, CREATE_TASK_REQUEST>({
                query: employeeData => {
                    return {
                        url: "/create-task",
                        method: "POST",
                        body: employeeData
                    }
                },
                invalidatesTags: ["task"]
            }),

            fetchTask: builder.query<FETCH_TASK_RESPONSE, FETCH_TASK_REQUEST>({
                query: () => {
                    return {
                        url: "/fetch-task",
                        method: "GET",
                    }
                },
                providesTags: ["task"]
            }),

            updateTask: builder.mutation<UPDATE_TASK_RESPONSE, UPDATE_TASK_REQUEST>({
                query: taskData => {
                    return {
                        url: "/update-task",
                        method: "POST",
                        body: taskData
                    }
                },
                invalidatesTags: ["task"]
            }),

            taskDetailsUpdate: builder.mutation<UPDATE_TASK_DETAILS_RESPONSE, { id: number, fd: FormData }>({
                query: taskData => {
                    return {
                        url: "/update-task-details/" + taskData.id,
                        method: "PUT",
                        body: taskData.fd
                    }
                },
                invalidatesTags: ["task"]
            }),

            deleteTask: builder.mutation<DELETE_TASK_RESPONSE, DELETE_TASK_REQUEST>({
                query: taskData => {
                    return {
                        url: "/task-delete/" + taskData.id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["task"]
            }),
        }
    }
})

export const {
    useUpdateProfileMutation,
    useFetchMeQuery,
    useGetEmployeeQuery,
    useRegisterEmployeeMutation,
    useDeleteEmployeeMutation,
    useRestoreEmployeeMutation,
    useUpdateEmployeeMutation,
    useCreateTaskMutation,
    useFetchTaskQuery,
    useUpdateTaskMutation,
    useTaskDetailsUpdateMutation,
    useDeleteTaskMutation
} = adminApi
