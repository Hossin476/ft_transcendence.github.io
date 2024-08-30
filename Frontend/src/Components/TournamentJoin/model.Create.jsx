import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ModelCreate({ setTournaments, setIsmodel }) {
    const [value, setValue] = useState(1)
    const [valuePlayers, setValuePlayers] = useState(4)
    const optionGame = [
        { label: 'ONLINE', value: 1 },
        { label: 'OFFLINE', value: 2 },
    ]
    const optionPlayers = [
        { label: '4', value: 4 },
        { label: '8', value: 8 },
    ]
    const handlechange = (e) => {
        setValue(parseInt(e.target.value, 10))
    }
    const handlechangePlayer = (e) => {
        setValuePlayers(parseInt(e.target.value, 10))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const fd = new FormData(e.target)
        const data = Object.fromEntries(fd.entries())
        const players = []
        for(let item in data)
        {
            const name = data[item].trim()
            if(name.length == 0)
                return toast.error('the name of the players should not be empty or contain only spaces', {theme:'dark'})
            players.push(name)
        }
        players.splice(1,1)
        for(let i  = 0 ; i < players.length ; i++)
            {
                if(players.includes(players[i],i+1))
                {
                    toast.error('the name of the players should be deferent', {theme:'dark'})
                    return
                }
            }
            console.log(players)
        const dataSend = {mode: value == 1 ? "ONLINE" : "OFFLINE" , users:players}
        fetch('/api/tournament',{method: 'POST', body: JSON.stringify(dataSend)})
        setTournaments({ mode: value == 1 ? "ONLINE" : "OFFLINE", players: valuePlayers, number: 0, users: players  });
        setIsmodel(false)
    }
    return (<div className='absolute top-0 bottom-0 left-0 right-0 bg-opacity-60  z-10  flex justify-center items-center blurHelp'>
        <form className='opacity-100 bg-secondaryColor  py-5 px-5 flex flex-col justify-center items-center gap-8 border-2  border-forthColor rounded-lg max-w-[800px] min-w-[320px]'  onSubmit={handleSubmit}>
            <h1 className="font-Valorax xsm:text-lg md:text-xl">CREATE NOW TOURNAMENT</h1>
            <div className='flex  h-[100%] w-[100%] gap-4 items-center flex-wrap justify-center'>
                <div className='flex flex-col  w-[40%]  min-w-[250px] items-center '>
                    <label className='text-xl font-bold'>Game Mode:</label>
                    <select value={value} onChange={handlechange} name="hamza" className='text-forthColor w-[80%] h-[30px] text-xl font-bold px-4 border-2 border-forthColor rounded-lg focus:outline-none'>
                        {optionGame.map((item, index) => (
                            <option value={item.value} key={index} className='text-forthColor   text-xl font-bold '>{item.label}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col w-[40%]  min-w-[250px] items-center'>
                    <label className='text-xl font-bold' >number of players:</label>
                    <select value={valuePlayers} onChange={handlechangePlayer} className='text-forthColor w-[80%] h-[30px] text-xl font-bold px-4 border-2 border-forthColor rounded-lg border-solid focus:outline-none'>
                        {optionPlayers.map((item, index) => (
                            <option value={item.value} key={index} className='text-forthColor w-[80%] h-[30px] text-xl font-bold'>{item.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            {value == 2 &&
                <div className="flex flex-wrap w-[100%] gap-3 items-center justify-evenly min-w-[320px]">
                    {[...Array(valuePlayers)].map((item, index) => (
                    <div className='flex flex-col w-[80px] min-w-[150px] items-center' key={index}>
                        <label className='text-xl font-bold'>Player {index + 1} :</label>
                        <input type='text' placeholder='player name' className='text-forthColor w-[100%] h-[30px] text-xl font-bold px-4 border-2 border-forthColor rounded-lg border-solid focus:outline-none' name={"player-"+(index + 1)}/>
                    </div>
                    ))}
                </div>}
            <div className='flex justify-evenly h-[100%] w-[100%]'>
                <button className='border-2 h-[30px] w-[30%] rounded-lg border-forthColor font-bold hover:opacity-70' type='submit' >CREATE</button>
                <button className='border-2 w-[30%] h-[30px] rounded-lg border-forthColor font-bold hover:opacity-70' onClick={() => setIsmodel(false)}>CLOSE</button>
                <ToastContainer autoClose={3000}/>
            </div>
        </form>
    </div>)
}