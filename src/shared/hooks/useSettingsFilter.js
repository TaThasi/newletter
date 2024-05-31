import { settingsActiveItem } from "@/app/configs/constants";
import { useAtom } from "jotai";


export default function useSettingsFilter() {
    const [activeItem, setActiveItem] = useAtom(settingsActiveItem);

    return {
        activeItem,
        setActiveItem
    }
}