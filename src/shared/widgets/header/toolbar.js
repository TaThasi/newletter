/* eslint-disable jsx-a11y/alt-text */
'use client'

import { useUser } from "@clerk/nextjs"
import { Button } from "@nextui-org/react"
import Link from "next/link"


export default function Toolbar() {
    const {user} = useUser();
    return (
        <>
            <Button color="primary" className="text-lg">
                Start trial
            </Button>
            {
                user ? (
                    <>
                    <Link href="/dashboard">
                            <img src={user.imageUrl} alt="" width={40} height={40} className=" rounded-full"/>
                    </Link>
                    </>
                ) : (
                    <Link href="/sign-up">
                        Login
                   </Link>
                )
            }           
        </>            

    )
}