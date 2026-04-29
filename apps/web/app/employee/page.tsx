"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetMessageQuery, useGetTasksQuery } from '@/redux/apis/employee.api'
import { Task } from '@repo/types'
import { useState } from 'react'


const page = () => {
  return <>
    <TaskTable />
  </>
}

const TaskTable = () => {
  const [show, setShow] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const { data } = useGetTasksQuery()
  // const { data: messageData } = useGetMessageQuery()

  return <>
    {
      data && <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Hero</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Complete</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data.result?.map(item => <TableRow key={item.id} onClick={() => {
              setShow(true)
              setSelectedTask(item)
            }}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell className="font-medium">{item.desc}</TableCell>
              <TableCell className="font-medium">
                {item.hero && <img src={item.hero} height={100} width={100} alt="" />}
              </TableCell>
              <TableCell className="font-medium">{item.due?.toString()}</TableCell>
              <TableCell className="font-medium">{item.complete}</TableCell>
              <TableCell className="font-medium">
                <Button className='me-3 cursor-pointer'>Edit</Button>
                <Button className='cursor-pointer'>Delete</Button>
              </TableCell>
            </TableRow>)
          }
        </TableBody>
      </Table>
    }


    {/* <Sheet open={show} onOpenChange={setShow}>
      {
        messageData && messageData.result?.map(item => <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Message</SheetTitle>
            <p className='text-xl'>Title : {selectedTask?.title}</p>
            <p>{item.message}</p>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="message">Enter Message</Label>
              <Input id="message" name='message' />
            </div>
            <Button type="submit" className='cursor-pointer'>Send Message</Button>
          </div>
        </SheetContent>)
      }

    </Sheet> */}

    <Sheet open={show} onOpenChange={setShow}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Task Messages</SheetTitle>
          <p className='text-xl font-bold'>Title: {selectedTask?.title}</p>
        </SheetHeader>

        {/* Map inside the content to show all messages */}
        {/* <div className="space-y-4 my-4 max-h-[400px] overflow-y-auto border-b pb-4">
          {messageData?.result?.map((item) => (
            <div key={item.id} className="p-2 bg-muted rounded-lg">
              <p className="text-sm">{item.message}</p>
            </div>
          ))}
        </div> */}

        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="message">Enter New Message</Label>
            <Input id="message" name='message' />
          </div>
          <Button type="submit" className='cursor-pointer'>Send Message</Button>
        </div>
      </SheetContent>
    </Sheet>
  </>
}



export default page