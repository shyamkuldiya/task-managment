import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SheetClose } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { statusOptions } from '@/constants/todo';
import { cn } from '@/lib/utils';
import { taskSchema } from '@/schema/todo';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';

export default function Edittask({ task, setTaskList,taskList }) {
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        watch,
        formState: { errors },

    } = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            task: task.task,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate,
            assignedOnDate: format(new Date(), 'yyyy-MM-dd'),
        },
    });
    const triggerSubmit = () => {
        handleSubmit(onSubmit)();
    };
    const onSubmit = (data) => {
        const newTask = {
            ...data,
        };
        setTaskList((prev) => {
            let currentTaskId = prev.findIndex((t) => t.id === task.id);
            prev[currentTaskId] = newTask;
            console.log(prev);
            return [...prev];
        });
        reset();
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full grid gap-4 rounded-2xl"
        >
            <div>

                <Controller
                    name="task"
                    control={control}
                    render={({ field }) => (
                        <Input
                            placeholder="Task name"
                            type="text"
                            {...field}
                            className={errors.task ? 'border-red-500' : ''}

                        />
                    )}
                />
                {errors.task && (
                    <p className="text-red-500 text-sm">{errors.task.message}</p>
                )}
            </div>

            <div>

                <Controller
                    name="dueDate"
                    control={control}
                    render={({ field }) => (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full border-zinc-700 pl-3 text-left font-medium",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? format(new Date(field.value), "PPP") : (
                                        <span>Pick due date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : null}
                                    onSelect={(date) => {
                                        setValue('dueDate', format(date, 'yyyy-MM-dd'));
                                    }}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    )}
                />
                {errors.dueDate && (
                    <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
                )}
            </div>
            <div>
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <SelectTrigger className={`w-full border border-zinc-700 outline-none ring-0 ${statusOptions.find((option) => option.value === field.value)?.class}`}>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className="">
                                <SelectGroup>
                                    <SelectLabel>Select status</SelectLabel>
                                    {statusOptions.map((option, index) => (
                                        <SelectItem
                                            key={index}
                                            value={option.value}
                                            className={`text-sm ${option.class}`}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.status && (
                    <p className="text-red-500 text-sm">{errors.status.message}</p>
                )}
            </div>

            <div>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            className='min-h-36 '
                            placeholder="Task Description..."
                            {...field}
                        />
                    )}
                />
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button >
                        Add
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>
                        Are you sure you update to the task?
                    </DialogTitle>
                    <div className='flex items-center gap-4'>
                        <DialogClose asChild >
                            <Button variant='destructive' >Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild >
                            <Button
                                onClick={triggerSubmit}
                                className='bg-green-500 text-white hover:bg-green-500/90'
                            >Update
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </form >)
}
