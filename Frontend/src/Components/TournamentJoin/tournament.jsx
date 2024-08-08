export  default function Tournament({players, mode})
{
    return (<div className='flex  justify-between font-inter text-[1.5vw] xl:text-[20px]'>
        <div className='border-2 flex justify-between w-[60%] h-[40px]  items-center rounded-xl px-2'>
            <h3>{mode.toUpperCase() + " TOURNAMENT"}</h3>
            <p>{ players== 4 ? 'FULL':players + '/4'}</p>
        </div>
        <button className={`border-2  px-4 rounded-xl  h-[40px] ${players == 4 ? "cursor-default opacity-50":'hover:opacity-75'}`}>JOIN NOW</button>
    </div>)
}