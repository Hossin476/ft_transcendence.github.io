import LayoutOne from "./Layouts/LayoutOne";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import ManageFriends from "./Pages/ManageFriends";
import PingPongGame from "./Pages/pingpongGame";
import PvpGame from "./Components/Game/Pvpgame";
import Game from "./Pages/Game";
import TicTacToe from "./Pages/TicTacToe";
import Tournament from "./Pages/Tournament";

import Settings from "./Pages/Settings";
import Leaderboard from "./Pages/Leaderboard";
import ChatPage from "./Pages/ChatPage";
import LoginPage from "./Pages/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/privateRoute";
import NotificationModal from "./Components/Notifications/NotificationModal";
import Tour from "./Pages/tour";
import { GameProvider } from "./context/gameContext";
import TournamentProvider from "./context/TournamentContext";
import { ChatProvider } from "./context/ChatContext";
import Dash from "./Pages/dash";
import { Signup, Login, ForgetPassword, VerifyEmail, Profile, ResetPassword, MailSent } from "./Components/Authentication";

// import './server.js'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="/loogin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/password-reset-confirm/:uid/:token" element={<ResetPassword />} />
          <Route path="/otp/verify" element={<VerifyEmail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mail-sent" element={<MailSent />} />
          <Route element={<PrivateRoute />}>
            <Route element={<LayoutOne />}>
              <Route index element={<Dash />} />
              <Route path="dashboard" element={<Dash />} />
              <Route path="managefriends" element={<ManageFriends />} />
              <Route path="settings" element={<Settings />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="chat" element={<ChatProvider><ChatPage /></ChatProvider>} />
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