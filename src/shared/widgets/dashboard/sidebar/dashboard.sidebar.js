'use client'

import { useUser } from "@clerk/nextjs"
import ICONS from "../../../utils/icons";
import DashboardItems from "./dashboard.items";
import UserPlan from "./user.plan";

export default function DashboardSidebar() {
    const {user} = useUser();
    return (
        <div className="p-2">
            <div className=" p-2 flex items-center bg-[#f5f5f5f5] rounded">
                <span className="text-2xl">{ICONS.home}</span>
                <h5 className="pl-2 pt-1 capitalize">
                    {user?.firstName} Newsletter
                </h5>
            </div>
            <div>
                <DashboardItems />
                <UserPlan />
                <DashboardItems bottomContent={true}/>

            </div>
        </div>
    )
}