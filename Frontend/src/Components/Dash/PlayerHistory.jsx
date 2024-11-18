
import Matches from "./Matches"
import { useTranslation } from "react-i18next";
import Tournaments from "./Tournaments";
export default function PlayerHistory() {
    const { t } = useTranslation();
    return (
        <div className=" block md:flex w-full  overflow-scroll  h-[40rem] mt-4 md:gap-x-4  ">
            <Matches />
            <Tournaments />
        </div>
    )
}