import { BsChatText } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Friend({name,status,online,user_id,profile_image}) {
    const { t } = useTranslation();
    const navigate = useNavigate()

    const handleFriendClick = () => {
        navigate(`/profile/${user_id}`);
      }

    const handleChatRedirect = ()=> {
        navigate("/chat",{
            state: {
                navigatedUser: name
            }
        })    
    }
    return (
        <div className="flex items-center self-center xl:self-auto justify-between">
            <div className="flex  items-center  lg:gap-4">
                <div   className=" xsm:h-[2rem] xsm:w-[2rem] sm:w-[4rem] sm:h-[4rem]  relative rounded-full" 
                        onClick={handleFriendClick}>
                    <div className="w-full h-full overflow-hidden  rounded-full">
                        <img src={profile_image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <span className={`xsm:w-1 xsm:h-1 sm:w-2 sm:h-2 ${online ? "bg-green-500" :"bg-red-500"} right-1 top-2 absolute rounded-full`}></span>
                </div>
                <div className="xsm:hidden xl:block">
                    <h1 className="font-semibold">{name}</h1>
                    <p className="font-thin">{status ? t("In Game"):t("Lobby")}</p>
                </div>
            </div>
            <div className='xsm:hidden xl:block'>
                <BsChatText onClick= {handleChatRedirect}  className="text-xl cursor-pointer" />
            </div>
        </div>
    )
}