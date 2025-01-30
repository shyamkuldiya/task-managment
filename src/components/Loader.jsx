import { LoaderIcon } from 'lucide-react'
import React from 'react'

export default function Loader({ loading }) {
    return (
        <div>
            {loading &&
                <div className='h-full w-full bg-black bg-opacity-50 dark:bg-opacity-90 absolute top-0 left-0 z-40 flex items-center justify-center'>
                    <LoaderIcon className='w-10 h-10 mx-auto animate-spin relative z-40 text-white' />
                </div>}
        </div>
    )
}
