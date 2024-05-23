import { navItems } from "@/app/configs/constants";
import Link from "next/link";



export default function NavItems() {
    return (
        <div className="w-full hidden md:flex items-center">
            {navItems.map((item, index) => (
                <Link href="/" key={index} className=" px-5 text-lg">
                    {item.title}
                </Link>
            ))}
        </div>
    )
}