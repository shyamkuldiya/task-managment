import { taskStatus } from '@/lib/helper'
import React from 'react'

export default function TaskInfo({ task }) {
    return (
        <div className='rounded-lg mb-3'>
            <div className='mb-2'>
                <p className='font-medium text-2xl dark:text-white'>
                    {task.task}
                </p>
                <p className={`${taskStatus(task.status)?.class} px-3 py-0.5 rounded-md max-w-max mt-2 text-xs font-medium min-w-max text-white`}>
                    {taskStatus(task.status)?.status}
                </p>
            </div>
            <p className='text-sm font-normal dark:text-zinc-400 text-zinc-600'>{task.description}</p>
            <div className='gap-1 max-w-max mt-2  font-medium '>
                <p className='dark:text-white'>Created on:</p>
                <p className='text-xs dark:text-zinc-400 text-zinc-600'>{task.assignedOnDate}</p>
                <p className='dark:text-white mt-2 '>Due date:</p>
                <p className='text-xs dark:text-zinc-400 text-zinc-600'>{task.dueDate}</p>
            </div>
        </div>)
}
