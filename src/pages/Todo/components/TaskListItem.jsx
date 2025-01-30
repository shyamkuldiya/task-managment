import { taskStatus } from '@/lib/helper'
import React from 'react'

export default function TaskListItem({ task }) {
    return (
        <div className='p-3 rounded-lg bg-gray-200 dark:bg-zinc-800 mb-3 '>
            <div className='flex items-start justify-between mb-2 gap-1'>
                <p className='font-medium capitalize dark:text-white text-zinc-900 text-sm sm:text-base'>
                    {task.task.length > 40 ? task.task.slice(0, 40) + '...' : task.task}
                </p>
                <p className={`${taskStatus(task.status)?.class} text-white px-3 py-0.5 rounded-md max-w-max text-[10px] sm:text-xs font-medium min-w-max`}>
                    {taskStatus(task.status)?.status}
                </p>
            </div>
            <p className='text-xs sm:text-sm font-normal text-zinc-600 dark:text-zinc-500'>
                {
                    task.description.length > 100 ?
                        task.description.slice(0, 300) + '...' :
                        task.description
                }
            </p>
        </div>)
}
