import React from 'react'

export default function Icon({ children }) {
    return (
        <div className='bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md border-0 outline-none group hover:bg-zinc-200 dark:hover:bg-zinc-800/90 transition-all duration-300 ease-in-out flex items-center justify-center cursor-pointer '>
            {children}
        </div>
    )
}
