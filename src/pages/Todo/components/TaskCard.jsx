import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Icon from '@/components/ui/icon'

import { Edit, Expand, Trash2, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import TaskListItem from './TaskListItem'
import Edittask from './Edittask'
import TaskInfo from './Taskinfo'
import Loader from '@/components/Loader'
import CloseButton from '@/components/CloseButton'
import { toast } from 'sonner'

export default function TaskCard({ task, removeTodo, taskList, setTaskList }) {

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

    return (
        <div className='relative group animate-opacity rounded-lg overflow-hidden'>
            <Loader loading={deleteLoading} />
            <div
                className='absolute h-full w-full group-hover:top-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out '
            >
                <div className='absolute h-full  w-full bg-zinc-500 opacity-90 rounded-lg' />
                <div className='flex items-center justify-center w-full h-full gap-4 text-2xl font-bold text-white z-20 relative'>
                    <TaskSheet
                        sheetTitle='Task Details'
                        icon={<Expand className='text-blue-500 w-4 h-4' />}
                        content={<TaskInfo task={task} />}
                    />
                    <Sheet open={isEditSheetOpen} setOpen={setIsEditSheetOpen}>
                        <SheetTrigger onClick={() => setIsEditSheetOpen(true)}>
                            <Icon><Edit className='text-green-500 w-4 h-4' /></Icon>
                        </SheetTrigger>
                        <SheetContent>
                            <CloseButton onClick={() => setIsEditSheetOpen(false)} />
                            <SheetTitle className='mb-4'>Editing Task</SheetTitle>
                            <Edittask
                                setIsEditSheetOpen={setIsEditSheetOpen}
                                task={task} taskList={taskList} setTaskList={setTaskList}
                            />
                        </SheetContent>
                    </Sheet>

                    <Dialog>
                        <DialogTrigger>
                            <Icon>
                                <Trash2 className='text-red-500 w-4 h-4' />
                            </Icon>
                        </DialogTrigger>
                        <DialogContent className='w-full dark:bg-zinc-900'>
                            <DialogTitle>
                                <p> Are you sure you want to delete the task?</p>
                            </DialogTitle>
                            <div className='flex items-center gap-4'>
                                <DialogClose asChild>
                                    <Button>Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild className='cursor-pointer'>
                                    <Button onClick={() => {
                                        setDeleteLoading(true);
                                        setTimeout(() => {
                                            removeTodo(task);
                                            setDeleteLoading(false);
                                        }, 1000);
                                    }} variant='destructive'>
                                        Delete
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <TaskListItem task={task} />
        </div>
    )
}



const TaskSheet = ({ icon, sheetTitle, content, isEditSheetOpen, setIsEditSheetOpen }) => {
    return (
        <Sheet open={isEditSheetOpen} setOpen={setIsEditSheetOpen}>
            <SheetTrigger><Icon>{icon}</Icon></SheetTrigger>
            <SheetContent className='w-full md:w-1/2'>
                <SheetTitle className='mb-4'>{sheetTitle}</SheetTitle>
                {content}
            </SheetContent>
        </Sheet>

    )
}