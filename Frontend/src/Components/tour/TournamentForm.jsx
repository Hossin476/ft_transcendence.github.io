import { useState } from "react"
import { useTournament } from "../../context/TournamentContext";

export default function TournamentForm() {
   const {socket} = useTournament()
    const [form,setForm] = useState({
        player1:'',
        player2:'',
        player3:'',
        player4:'',
    })
    const [errors,setErrors] = useState({
      player1:'',
      player2:'',
      player3:'',
      player4:'',
    })
    let regex = new RegExp("^[a-zA-Z][a-zA-Z0-9]*$")

    const handleForm = ()=> {
      
      const errorlog = Object.values(errors).filter(error=>error !== '')
      const names = Object.values(form).filter(names=>names !== '')

      if(errorlog.length === 0 && names.length === 0) {
         setErrors(()=> {
            return {
               ["player1"]:'empty',
               ["player2"]:'empty',
               ["player3"]:'empty',
               ["player4"]:'empty'
            }
         })
      }
      if(errorlog.length === 0 && names.length === 4) {
         const users = Object.values(form)
         socket.send(JSON.stringify({type:'start_tournament', players: users}))
      }
    }

    const handleInpute = (e)=> {

      setForm((prevform)=>({
            ...prevform,
            [e.target.name] : e.target.value
        }))
        
      if (e.target.value.length > 10 || !regex.test(e.target.value))
         setErrors(prevErrors=>({...prevErrors,[e.target.name] : 'error'}))
      else
         setErrors(prevErrors=>({...prevErrors,[e.target.name] : ''}))
      const names = Object.values(form)
      names.map(item=> {
         if (item === e.target.value)
            setErrors(prevErrors=>({...prevErrors,[e.target.name] : 'duplicate'}))
      })
    }
    return (
    <div className="w-[90%] h-[100%]  self-center p-1 ">
        <div className="flex h-[30%]  my-1 justify-between">
           <div className=" flex  mx-4 gap-1 relative flex-col w-1/2">
              <label>player1</label>
              <input onChange={handleInpute} className={`border  ${errors.player1 ? 'border-red-500' :'border-forthColor'}  rounded p-1 outline-none`} name="player1" value={ form.player1} type="text" />
              {
                  errors.player1 ==='error' ? <span className="bottom-0 text-red-500 text-xs">this field should be an alphanumirc and max 10 chars</span>
                  : errors.player1 === "duplicate" ? <span className="bottom-0 text-red-500 text-xs">this name is already taken</span>
                  : errors.player1 === 'empty' ? <span className="bottom-0 text-red-500 text-xs">this field is empty</span>:''
              }
           </div>
           <div className="flex  mx-4 gap-1 flex-col relative w-1/2">
              <label>player2</label>
              <input onChange={handleInpute} className={`border  ${errors.player2 ? 'border-red-500' :'border-forthColor'}  rounded p-1 outline-none`} name="player2" value={form.player2} type="text" />
              {
                  errors.player2 ==='error' ? <span className="bottom-0 text-red-500 text-xs">this field should be an alphanumirc and max 10 chars</span>
                  : errors.player2 === "duplicate" ? <span className="bottom-0 text-red-500 text-xs">this name is already taken</span>
                  : errors.player2 === 'empty' ? <span className="bottom-0 text-red-500 text-xs">this field is empty</span>:''
              }
           </div>
        </div>
        <div className="flex h-[30%] my-2 justify-between">
           <div className="flex  mx-4 gap-1 relative flex-col w-1/2">
              <label>player3</label>
              <input onChange={handleInpute} className={`border  ${errors.player3  ? 'border-red-500' :'border-forthColor'}  rounded p-1 outline-none`} name="player3" value={form.player3} type="text" />
              {
                  errors.player3 ==='error' ? <span className="bottom-0 text-red-500 text-xs">this field should be an alphanumirc and max 10 chars</span>
                  : errors.player3 === "duplicate" ? <span className="bottom-0 text-red-500 text-xs">this name is already taken</span>
                  : errors.player3 === 'empty' ? <span className="bottom-0 text-red-500 text-xs">this field is empty</span>:''
              }
           </div>
           <div className="flex  mx-4 gap-1 relative flex-col w-1/2">
              <label>player4</label>
              <input onChange={handleInpute} className={`border  ${errors.player4 ? 'border-red-500' :'border-forthColor'}  rounded p-1 outline-none`} name="player4" value={form.player4} type="text" />
              {
                  errors.player4 ==='error' ? <span className="bottom-0 text-red-500 text-xs">this field should be an alphanumirc and max 10 chars</span>
                  : errors.player4 === "duplicate" ? <span className="bottom-0 text-red-500 text-xs">this name is already taken</span>
                  : errors.player4 === 'empty' ? <span className="bottom-0 text-red-500 text-xs">this field is empty</span>:''
              }
           </div>
        </div>
        <div className="flex justify-center w-full">
           <button onClick={handleForm} className="border-2 mt-4 border border-forthColor  p-2 rounded">start tournament</button>
        </div>
    </div>
    )
}