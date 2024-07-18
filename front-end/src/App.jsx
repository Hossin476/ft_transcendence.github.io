import React from "react"
import LayoutOne from "./Layouts/LayoutOne"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import ManageFriends from "./Pages/ManageFriends"
import PvpGame from './Components/Game/Pvpgame';
import Game from './Pages/Game';
import Settings from './Pages/Settings';

function App() {
  
  return (
    <BrowserRouter>
		<Routes>
			<Route element={<LayoutOne/>}>
					<Route path="/example1" element={<></>}/>
					<Route path="/dashboard" element={<Dashboard/>}/>
					<Route path="/managefriends" element={<ManageFriends/>}/>
					<Route path="/game" element={<Game />}/>
					<Route path="/game/pingpong/pvpgame" element={<PvpGame title="PING PONG"/>}/>
					<Route path="/game/tictactoe/pvpgame" element={<PvpGame title="TIC TAC TOE"/>}/>
					<Route path="/settings/2fa" element={<Settings/>}/>
			</Route>
		</Routes>
    </BrowserRouter>
  )
}

export default App
