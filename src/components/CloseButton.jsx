import React from 'react'
import { Button } from './ui/button'
import { X } from 'lucide-react'

export default function CloseButton({ onClick }) {
    return (
        <Button variant='outline' onClick={onClick}
            className="absolute right-4 top-4 w-6 h-6 py-1  rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </Button>
    )
}
