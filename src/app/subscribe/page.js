'use client'

import { useClerk, useUser } from "@clerk/nextjs"
import {FormEvent, useState} from 'react'
import toast from "react-hot-toast"
import { useSearchParams } from "next/navigation";
import { subscribe } from "@/actions/add.subscribe";
export default function Page() {
    const [value, setValue] =  useState("");
    const {user} = useUser();
    const searchParams = useSearchParams();
    const username = searchParams.get('username');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await subscribe({
            email: value,
            username
        })
        .then((data) => {
            setLoading(false);
            if(data.error) {
                toast.error(data.error);
            } else {
                toast.success("You are successfully subscribed!");
            }
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    return (
        <div className=" w-full flex flex-col items-center justify-center h-screen">
            <div>
                <h1 className=" text-7xl pb-8 capitalize">
                    {user.lastName + ' ' + username} Newsletter
                </h1>
            </div>
            <form
                className="flex w-full max-w-md border rounded overflow-hidden"
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                type="email"
                name="email"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-4 w-full text-gray-700 leading-tight focus:outline-none"
                />
                <button
                type="submit"
                disabled={loading}
                className="px-8 bg-blue-500 text-white font-bold py-4 rounded-r hover:bg-blue-600 focus:outline-none"
                >
                Subscribe
                </button>
            </form>
        </div>
    )
}
