import { ModeToggle } from '@/components/mode-toggle'
import React from 'react'
import { Link } from 'react-router'

const links = [
    { name: 'Todo', to: '/todo' },
]
export default function AppLayout({ children }) {
    return (
        <div className='realative'>
            <header className='w-full bg-white dark:bg-zinc-900  border-b border-zinc-200 dark:border-zinc-700 sticky z-10  top-0'>
                <div className='flex items-center  justify-between px-4 py-2 max-w-[1600px] mx-auto'>
                    <Link to='/'>TS</Link>
                    <nav className='flex gap-4 items-center'>
                        {links.map((link, index) => (
                            <Link key={index} to={link.to}>{link.name}</Link>
                        ))}
                        <ModeToggle />
                    </nav>
                </div>
            </header>
            <div className='container mx-auto max-w-[1600px] p-4'>
                {children}
            </div>
        </div>
    )
}
