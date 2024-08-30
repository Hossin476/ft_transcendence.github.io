

import icon from  '/public/achievement.png'

export default function Achievement()
{
    return (
        <div className="  h-16 xl:border-forthColor xl:border-2 my-4  rounded-3xl flex items-center gap-x-4 justify-center ">
            <div className="w-8 h-8">
                <img  className="w-full" src={icon} alt="" />
            </div>
            <p className='hidden xl:block text-forthColor'>perfect match</p>
        </div>
    )
}