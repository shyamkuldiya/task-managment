import spraySound from '@/assets/deodorant-spray-2.mp3';
import React from 'react'
import { Link } from 'react-router';

export default function ErrorPage() {
    return (
        <div className="min-h-screen text-center flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold mb-4">Oops! You’ve come to the wrong place.</p>
            <div className="grid items-center gap-4">
                <Link
                    onClick={() => {
                        const audio = new Audio(spraySound);
                        audio.play();
                        setTimeout(() => window.location.href = '/', 3000);
                    }}
                    className="px-4 py-1  bg-red-500 rounded-full text-white"
                >
                    Teach me the error of my ways!
                </Link>
                <Link to='/' className="px-4 py-1  max-w-max mx-auto bg-blue-500 rounded-full text-white">Go to Home</Link>
            </div>
        </div>)
}
