import LayoutOne from "./Layouts/LayoutOne";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import ManageFriends from "./Pages/ManageFriends";
import PingPongGame from "./Pages/pingpongGame";
import PvpGame from "./Components/Game/Pvpgame";
import Game from "./Pages/Game";
import TicTacToe from "./Pages/TicTacToe";
import TournamentJoin from "./Pages/TournamentJoin";
import Tournament from "./Pages/Tournament";
import Settings from "./Pages/Settings";
import Leaderboard from "./Pages/Leaderboard";
// import './server.js'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutOne />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="managefriends" element={<ManageFriends />} />
          <Route path="settings" element={<Settings />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="chat" element={<></>} />
          <Route path="game">
            <Route index element={<Game />} />
            <Route path="tictactoe">
              <Route path="pvpgame">
                <Route index element={<PvpGame title="TIC TAC TOE" />} />
                <Route path="match" element={<TicTacToe />} />
              </Route>
              <Route path="tournament">
                <Route
                  index
                  element={<TournamentJoin title={"TIC TAC TOE"} />}
                />
              </Route>
            </Route>
            <Route path="pingpong">
              <Route path="pvpgame">
                <Route index element={<PvpGame title="PING PONG" />} />
                <Route path="match" element={<PingPongGame />} />
              </Route>
              <Route path="tournament">
                <Route index element={<TournamentJoin title={"PING PONG"} />} />
                <Route path="tournaments" element={<Tournament />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
