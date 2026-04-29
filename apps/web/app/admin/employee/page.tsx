"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDeleteEmployeeMutation, useGetEmployeeQuery, useRegisterEmployeeMutation, useRestoreEmployeeMutation, useUpdateEmployeeMutation } from "@/redux/apis/admin.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Employee, REGISTER_EMPLOYEE_REQUEST } from "@repo/types"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z, { string } from "zod"
import { format } from "date-fns";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export default function DialogDemo() {

    const [show, setShow] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
    const [showEditImage, setShowEditImage] = useState(true)

    const closeDialog = () => {
        setShow(false)
        setSelectedEmployee(null)
        reset({
            name: "",
            email: "",
            mobile: "",
            doj: new Date(),
            dob: new Date(),
            department: "",
            jobRole: "",
        })
    }

    const [createEmployee, { isLoading }] = useRegisterEmployeeMutation()
    const { data } = useGetEmployeeQuery()
    const [deleteEmployee] = useDeleteEmployeeMutation()
    const [restoreEmployee] = useRestoreEmployeeMutation()
    const [update] = useUpdateEmployeeMutation()

    const employeeSchema = z.object({
        name: z.string().min(3),
        mobile: z.string().min(3),
        email: z.string().min(3),
        profile: z.instanceof(FileList).optional(),
        department: z.string().min(3),
        jobRole: z.string().min(3),
        doj: z.coerce.date(),
        dob: z.coerce.date(),
    }) satisfies z.ZodType<REGISTER_EMPLOYEE_REQUEST>

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(employeeSchema)
    })

    const handleFormSubmit = async (data: REGISTER_EMPLOYEE_REQUEST) => {
        try {
            const fd = new FormData()
            fd.append("name", data.name)
            fd.append("mobile", data.mobile)
            fd.append("email", data.email)
            fd.append("department", data.department)
            fd.append("jobRole", data.jobRole)
            fd.append("doj", data.doj.toLocaleString())
            fd.append("dob", data.dob.toLocaleString())

            const f = data.profile?.item?.(0)

            if (f) {
                fd.append("profile", f)
            }

            if (selectedEmployee) {
                await update({ id: selectedEmployee.id as number, fd }).unwrap()
                setShow(false)
                toast.success("Employee Update Successfully")
            } else {
                await createEmployee(fd).unwrap()
                setShow(false)
                toast.success("Employee Register Successfully")
            }
        } catch (error) {
            console.log(error)
            toast.error("Unable Employee Register or Update")
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteEmployee({ id }).unwrap()
            toast.success("Employee Deleted Successfully")
        } catch (error) {
            console.log(error)
        }
    }

    const handleRestore = async (id: number) => {
        try {
            await restoreEmployee({ id }).unwrap()
            toast.success("Employee Restore Successfully")
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (employeeData: Employee) => {
        try {
            setShow(true)
            setSelectedEmployee(employeeData)
            reset({
                name: employeeData.name,
                email: employeeData.email,
                mobile: employeeData.mobile,
                doj: format(employeeData.doj as Date, "yyyy-MM-dd") as unknown as Date,
                dob: format(employeeData.dob as Date, "yyyy-MM-dd") as unknown as Date,
                department: employeeData.department as string,
                jobRole: employeeData.jobRole as string,
            })
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        <Dialog open={show}>
            <div className="flex justify-end">
                <DialogTrigger asChild>
                    <Button disabled={isLoading} onClick={() => setShow(true)} className="bg-blue-500 text-white hover:bg-blue-400 hover:text-white" variant="outline">Add Employee</Button>
                </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto" isLoading={isLoading} closeDialog={closeDialog}>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <DialogHeader>
                        {
                            selectedEmployee
                                ? <DialogTitle>Update Employee</DialogTitle>
                                : <DialogTitle>Register Employee</DialogTitle>
                        }

                    </DialogHeader>
                    <FieldGroup className="grid grid-cols-2 mt-10">
                        <Field>
                            <Label htmlFor="name-1">Name</Label>
                            <Input disabled={isLoading} {...register("name")} id="name-1" name="name" />
                        </Field>
                        <Field>
                            <Label htmlFor="mobile-1">Mobile</Label>
                            <Input disabled={isLoading} {...register("mobile")} id="mobile-1" name="mobile" />
                        </Field>
                        <Field>
                            <Label htmlFor="email-1">Email</Label>
                            <Input disabled={isLoading} {...register("email")} id="email-1" />
                        </Field>
                        <Field>
                            {
                                selectedEmployee && showEditImage
                                    ? <>
                                        <img src={selectedEmployee.profilePic as string} height={50} alt="" />
                                        <Button onClick={() => setShowEditImage(false)} variant="secondary">Change Image</Button>
                                    </>
                                    : <>
                                        <Label htmlFor="profile-1">Profile</Label>
                                        <Input disabled={isLoading} type="file" {...register("profile")} id="profile-1" name="profile" />
                                        {!showEditImage && <Button onClick={() => setShowEditImage(true)}>Cancel</Button>}
                                    </>
                            }
                        </Field>
                        <Field>
                            <Label htmlFor="department-1">Department</Label>
                            <Input disabled={isLoading} {...register("department")} id="department-1" name="department" />
                        </Field>
                        <Field>
                            <Label htmlFor="jobRole-1">Job Role</Label>
                            <Input disabled={isLoading} {...register("jobRole")} id="jobRole-1" name="jobRole" />
                        </Field>
                        <Field>
                            <Label htmlFor="doj-1">doj</Label>
                            <Input disabled={isLoading} {...register("doj")} type="date" id="doj-1" name="doj" />
                        </Field>
                        <Field>
                            <Label htmlFor="dob-1">dob</Label>
                            <Input disabled={isLoading} {...register("dob")} type="date" id="dob-1" name="dob" />
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="mt-5">
                        <DialogClose asChild>
                            <Button disabled={isLoading} onClick={closeDialog} type="button" className="cursor-pointer" variant="outline">Cancel</Button>
                        </DialogClose>
                        {
                            selectedEmployee
                                ? <Button type="submit" className="cursor-pointer">Update Employee</Button>
                                : <Button disabled={isLoading} type="submit" className="cursor-pointer">Save Changes</Button>
                        }

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >

        <div className="overflow-x-auto w-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>doj</TableHead>
                        <TableHead>dob</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data && data.result?.map(item => <TableRow
                            key={item.id}
                            className={`${item.isDelete ? "bg-red-300" : ""}`}
                        >
                            <TableCell>{item.id}</TableCell>
                            <TableCell className="font-medium flex gap-1 item-center">
                                <Avatar>
                                    <AvatarImage src={item.profilePic as string} className="object-top" />
                                </Avatar>
                                {item.name}
                            </TableCell>
                            <TableCell className="font-medium">{item.email}</TableCell>
                            <TableCell className="font-medium">{item.mobile}</TableCell>
                            <TableCell className="font-medium">{item.department}</TableCell>
                            <TableCell className="font-medium">{item.jobRole}</TableCell>
                            <TableCell className="font-medium">{format(item.doj as Date, "yyyy-MM-dd")}</TableCell>
                            <TableCell className="font-medium">{format(item.dob as Date, "yyyy-MM-dd")}</TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="size-8">
                                        <MoreHorizontalIcon />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEdit(item)}
                                    >Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {
                                        item.isDelete
                                            ? <DropdownMenuItem variant="destructive" onClick={() => handleRestore(item.id as number)}>
                                                Restore
                                            </DropdownMenuItem>
                                            : <DropdownMenuItem variant="destructive" onClick={() => handleDelete(item.id as number)}>
                                                Delete
                                            </DropdownMenuItem>
                                    }

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableRow>)
                    }
                </TableBody >
            </Table >
        </div >
    </>
}
