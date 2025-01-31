import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { statusOptions } from '@/constants/todo';
import { cn } from '@/lib/utils';
import { taskSchema } from '@/schema/todo';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Edittask({ task, setTasks, setIsEditSheetOpen }) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        handleSubmit,
        control,
        setValue,
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
        setLoading(true)
        setTimeout(() => {
            handleSubmit(onSubmit)();
        }, 1000);
    };

    const onSubmit = (data) => {
        const newTask = {
            ...data,
        };
        setTasks((prev) => {
            let currentTaskId = prev.findIndex((t) => t.id === task.id);
            prev[currentTaskId] = newTask;
            return [...prev];
        });
        setIsEditSheetOpen(false);
        setLoading(false);
        toast.success('Task updated successfully');
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full grid gap-4 rounded-2xl"
        >
            <Loader />
            <div>
                <Label>Task name</Label>
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
            <Label>Task due date</Label>
                <Controller
                    name="dueDate"
                    control={control}
                    render={({ field }) => (
                        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full  pl-3 text-left font-medium",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? format(new Date(field.value), "MMM d, yyyy") : (
                                        <span>Pick due date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 " align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : null}
                                    onSelect={(date) => {
                                        setValue('dueDate', format(date, 'yyyy-MM-dd'));
                                        setIsPopoverOpen(false);
                                    }}
                                    disabled={(date) => date < new Date()}
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
            <Label>Task status</Label>
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <SelectTrigger className={`w-full border  outline-none ring-0 ${statusOptions.find((option) => option.value === field.value)?.class}`}>
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
            <Label>Task description</Label>
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
                        Update
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
