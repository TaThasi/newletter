
'use client'
import Emaileditor from "@/shared/components/editor/email.editor";
import ICONS from "@/shared/utils/icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation"

export default function Page() {
    const searchParams = useSearchParams();
    const subject = searchParams.get("subject");
    const subjectTitle = subject.replace(/-/g," ");
    return (
        <div className=" w-full flex bg-[#F7F7F7]">
            <div className=" w-full p-5 bg-white rounded-r-xl">
                {/* {Back arrow} */}
                <Link href={"/dashboard/write"} className=" opacity-[.7] w-min flex text-xl items-center">
                    <span>{ICONS.backArrow}</span>
                    <span>Exit</span>
                </Link>
                {/* {email editor} */}
                <div className="my-5">
                    <Emaileditor subjectTitle={subjectTitle} />
                </div>
            </div>
        </div>
    )
}