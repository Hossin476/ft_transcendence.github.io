import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import TournamentProvider from "./context/TournamentContext";
import { GameProvider } from "./context/gameContext";
import { ChatProvider } from "./context/ChatContext";

import LayoutOne from "./Layouts/LayoutOne";
import ManageFriends from "./Pages/ManageFriends";
import PingPongGame from "./Pages/pingpongGame";
import PvpGame from "./Components/Game/Pvpgame";
import Game from "./Pages/Game";
import TicTacToe from "./Pages/TicTacToe";
import Tournament from "./Pages/Tournament";
import Settings from "./Pages/Settings";
import Leaderboard from "./Pages/Leaderboard";
import ChatPage from "./Pages/ChatPage";
import Login from "./Pages/Login";
import Tour from "./Pages/tour";
import Dash from "./Pages/dash";
import Profile from "./Pages/Profile";
import { Signup, ForgetPassword, VerifyEmail, ResetPassword, MailSent } from "./Components/Authentication";

import "./utils/i18n";
import PrivateRoute from "./utils/privateRoute";


// import './server.js'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/password-reset-confirm/:uid/:token" element={<ResetPassword />} />
          <Route path="/otp/verify" element={<VerifyEmail />} />
          <Route path="/mail-sent" element={<MailSent />} />
          <Route element={<PrivateRoute />}>
            <Route element={<LayoutOne />}>
              <Route index element={<Dash />} />
              <Route path="dashboard" element={<Dash />} />
              <Route path="managefriends" element={<ManageFriends />} />
              <Route path="settings" element={<Settings />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="chat" element={<ChatProvider><ChatPage /></ChatProvider>} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path="game">
                <Route index element={<Game />} />
                <Route path="tictactoe">
                  <Route path="pvpgame">
                    <Route index element={<PvpGame title="TIC TAC TOE" />} />
                    <Route path="match/" element={<TicTacToe />} />
                  </Route>
                  <Route path="tournament">
                    <Route
                      index
                      element={<Tournament title={"TIC TAC TOE"} />}
                    />
                  </Route>
                </Route>
                <Route path="pingpong">
                  <Route path="pvpgame">
                    <Route index element={<PvpGame title="PING PONG" />} />
                    <Route path="match" element={<GameProvider><PingPongGame /></GameProvider>} />
                  </Route>
                  <Route path="tournament">
                    <Route index element={ <Tournament/>} />
                      <Route path="tour" element={<TournamentProvider><Tour /></TournamentProvider> } />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;