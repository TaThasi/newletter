'use client'

import { Button } from "@nextui-org/react"
import Link from "next/link"


export default function Toolbar() {
    return (
        <>
            <Button color="primary" className="text-lg">
                Start trial
            </Button>
            
            <Link href="/sign-up">
                Login
            </Link>
        </>            

    )
}