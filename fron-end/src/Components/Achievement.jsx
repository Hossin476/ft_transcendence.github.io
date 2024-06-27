

import icon from  '/public/achievement.png'

export default function Achievement()
{
    return (
        <div className=" xl:border-forthColor xl:border-2 rounded-md xl:flex xl:gap-4  ">
            <div className="w-8 h-8">
                <img  className="w-full" src={icon} alt="" />
            </div>
            <p className='hidden xl:block'>perfect match</p>
        </div>
    )
}