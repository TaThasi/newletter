/* eslint-disable @next/next/no-img-element */

import { partners } from "@/app/configs/constants"
import Marquee from "react-fast-marquee"

export default function Branding() {
    return (
        <div className="border-t border-b border-[#000] py-10">
            <h3 className=" uppercase text-xl md:text-3xl text-center max-w-3xl mx-auto font-[400] z-20 relative">
                CREATED BY THE EARLY MORNING TEAM 
            </h3>
            <div className="w-full text-center pt-1">
                <h3 className=" uppercase bg-[#F091DD] rounded p-2 text-xl md:text-2xl text-center inline-block font-medium">
                    NOW POWERING THE WORLD&apos;S TOP NEWSLETTERS 
                </h3>
            </div>
            <Marquee className="w-full flex justify-around">
                {partners.map((item, index) => (
                    <>
                        <img src={item.url} key={index} width={200} height={200} alt="partner"
                        className={`md:mx-8 w-[150px] md:w-[180px] mx-3`}
                        />
                    </>
                ))}
            </Marquee>
        </div>
    )
}