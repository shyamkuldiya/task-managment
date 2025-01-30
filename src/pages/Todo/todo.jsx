import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AppLayout from '../../Layout/AppLayout';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, LoaderIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import TaskCard from './components/TaskCard';
import { taskData } from '@/data';
import { statusOptions } from '@/constants/todo';
import { taskSchema } from '@/schema/todo';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Loader from '@/components/Loader';

export default function Todo() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newTaskSaveLoading, setNewTaskSaveLoading] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);

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
            task: '',
            description: '',
            status: '',
            dueDate: '',
            assignedOnDate: format(new Date(), 'yyyy-MM-dd'),
        },
    });


    function removeTask(task) {
        setTasks((prev) => prev.filter((t) => t !== task));
    }

    const onSubmit = (data) => {
        const newTask = {
            ...data,
            assignedOnDate: format(new Date(), 'yyyy-MM-dd'),
            id: tasks.length + 1,
        };
        setNewTaskSaveLoading(true);
        setTimeout(() => {
            setTasks((prev) => [...prev, newTask]);
            reset();
            setNewTaskSaveLoading(false);
            toast.success('Task added successfully');
        }, 1000);
    };

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setTasks(taskData);
            setLoading(false)
        }, 1000);
    }, []);


    return (
        <AppLayout>
            <Loader loading={newTaskSaveLoading} />
            <div className="md:flex gap-6 mt-6 md:max-h-[calc(100vh-7rem)] ">
                <div className="w-full max-w-md mx-auto md:mx-0 ">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full max-w-md mr-auto grid gap-4 bg-gray-200 dark:bg-zinc-800 px-4 py-6 rounded-2xl"
                    >
                        <div>
                            <p>Create a new Task</p>
                            <p className="text-sm dark:text-zinc-500 text-zinc-600 ">
                                Fill the below fields to create a new task.
                            </p>
                        </div>
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
                                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full border-zinc-700 pl-3 text-left font-medium",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? format(new Date(field.value), 'MMM d, yyyy') : (
                                                    <span>Pick due date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : null}
                                                onSelect={(date) => {
                                                    setValue('dueDate', format(date, 'yyyy-MM-dd'));
                                                    setPopoverOpen(false);

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
                                        placeholder="Task Description..."
                                        {...field}
                                    />
                                )}
                            />
                        </div>

                        <button
                            type="submit"
                            className="border-none bg-green-500 px-6 py-1 rounded-md cursor-pointer active:ring-1 ring-green-400"
                        >
                            Add
                        </button>
                    </form>
                </div>
                <div className="border-l mt-6 md:mt-0 border-zinc-700 w-full pl-4 overflow-hidden">
                    <h2 className="text-xl font-medium text-start mb-4">User Tasks</h2>
                    <div className="overflow-auto md:max-h-[calc(100vh-10rem)] h-full pr-2 custom-scrollbar">
                        {loading ? <LoaderIcon className='w-10 h-10 mx-auto animate-spin' /> :
                            <>
                                {tasks?.slice().reverse().map((task, index) => (
                                    <TaskCard
                                        taskList={tasks} key={index} task={task} removeTodo={removeTask}
                                        setTaskList={setTasks}
                                    />
                                ))}
                            </>
                        }
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
