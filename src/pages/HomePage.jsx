import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useNavigate } from 'react-router'

export default function HomePage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);


    function proceed() {
        if (userName) {
            localStorage.setItem('userName', userName);
            navigate('/todo')
        } else {
            setUserName('')
        }
    }
    function checkName() {
        if (localStorage.getItem('userName')) {
            navigate('/todo')
        }
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-between py-4 text-center">
            <div className='flex items-center flex-col justify-center flex-1'>
                <h1 className="text-4xl font-medium mb-3">Welcome to Task Management App</h1>
                <p className="text-lg mb-6 max-w-lg">
                    A simple, frontend-only task management app built with React, TailwindCSS, React Hook Form, Zod for validation, and ShadCN for UI components. Tasks are stored locally and can be filtered based on different criteria.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Dialog>
                        <DialogTrigger>
                            <Button onClick={checkName} >
                                Start managing your tasks
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Enter you name to proceed</DialogTitle>
                            <div>
                                <Input
                                    placeholder='Enter your name'
                                    type='te'
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                {userName === '' && (
                                    <p className="text-red-500 text-sm pl-2 mt-1">Name is required to proceed further</p>
                                )}
                            </div>
                            <Button onClick={proceed}>Proceed</Button>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="mt-8 text-sm text-gray-500">
                    <p>Built with:</p>
                    <ul className="flex gap-4 flex-wrap justify-center mt-2">
                        {techStack?.map((tech, index) => {
                            return (<Badge className='min-w-max' key={index}>{tech}</Badge>)
                        })}
                    </ul>
                </div>

            </div>
            <a
                href='https://github.com/shyamchoudharyy'
                target="_blank"
                className="block mt-2 justify-self-end ">
                Made with ❤️ by @shyamchoudharyy
            </a>
        </div>
    )
}

let techStack = ['React', 'Tailwind CSS', 'React Hook Form', 'Zod', 'ShadCN UI']