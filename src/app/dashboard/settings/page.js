'use client'
import SettingsTabs from "@/shared/components/tabs/settings.tabs";
import useMembership from "@/shared/hooks/useMembership";
import useSettingsFilter from "@/shared/hooks/useSettingsFilter";
import { generateApiKey, regenerateApiKey } from "@/shared/utils/token.generator";
import { UserProfile } from "@clerk/nextjs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ICONS from "@/shared/utils/icons";
import toast from "react-hot-toast";
export default function Page() {

    const { activeItem } = useSettingsFilter();
    const {data} = useMembership();
    const [apiKey, setApiKey] = useState();
    useEffect(() => {
        const apiKey = Cookies.get('api_key');
        if(!apiKey) {
            GenerateApiKey();
        } else {
            setApiKey(apiKey);
        }
    }, []);

    const GenerateApiKey = async () => {
        await generateApiKey()
        .then((res) => {
            Cookies.set('api_key', res);
            setApiKey(res);
        })
        .catch((err) => {
            console.error(err)
        });
    }
    const handleCopy = () => {
        const smallText = document.querySelector(".copy-text");
        if (smallText) {
          const textToCopy = smallText.innerText;
          navigator.clipboard.writeText(textToCopy).then(() => {
            toast.success("Copied");
          });
        }
    }

    const handleRegenerateApiKey = async () => {
        await regenerateApiKey()
        .then((res) => {
            Cookies.set('api_key', res);
            setApiKey(res);
            toast.success("API Key regenerated successfully!");
        })
    }

    return (
        <div className=" w-full p-5">
            <SettingsTabs />
            {
                activeItem === "Customize Profile" && (
                    <div className="w-full flex justify-center">
                        <UserProfile />
                    </div>
                )
            }
            {
                activeItem === "API Access" && (
                    <div>
                        {data.plan === 'GROW' ? (
                            <div className="w-full h-screen flex items-center justify-center">
                                <h3>Please update your subscription plan to get access of API.</h3>
                            </div>
                        ) : (
                            <div className="p-4 w-full overflow-hidden">
                                <h3>API KEY: </h3>
                                <p className=" whitespace-pre-line overflow-hidden break-words copy-text">
                                    {apiKey}
                                </p>
                                <div className=" flex items-center">
                                    <div className="h-[38px] w-[90px] rounded my-3 bg-[#DFE7FF] flex items-center justify-center"
                                        onClick={handleCopy}
                                    >
                                        <span className=" text-lg">{ICONS.copy}</span>
                                        <span className="pl-1">copy</span>
                                    </div>

                                    <div className="h-[38px] w-[100px] ml-4 rounded my-3 bg-[#DFE7FF] flex items-center justify-center"
                                        onClick={handleRegenerateApiKey}
                                    >
                                        <span className=" text-lg">{ICONS.regenerate}</span>
                                        <span className="pl-1">Regenerate</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}




