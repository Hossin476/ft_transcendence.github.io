import './Game.css'
import Pingpic from '../../public/avatar/PingPong.png';
import TicPic from '../../public/avatar/TicTacToe.png';
import { useNavigate } from "react-router-dom";

function PingPong() {

    const navigate = useNavigate();

    function navigateToTournament() {
        navigate('/game/tournament');
    }
    function navigateToPvp() {
        navigate('/game/pingpong/pvpgame');
    }

    return (
        <div className="ping-pong">
            <div className="image-section">
                <img src={Pingpic} alt='PingPong'></img>
            </div>
            <div className='text-div'>
                <div className="text-section">
                    <h1>PING PONG</h1>
                    <div className='ping-buttons'>
                        <button onClick={navigateToTournament} className="tournament-button" >TOURNAMENT</button>
                        <button onClick={navigateToPvp} className="pvp-button">PVP</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TicTacToe() {
    const navigate = useNavigate();

    function navigateToTournament() {
        navigate('/game/tournament');
    }
    function navigateToPvp() {
        navigate('/game/tictactoe/pvpgame');
    }

    return (
        <div className="tic-tac-toe">
            <div className="image-section2">
                <img src={TicPic} alt='TicTacToe'></img>
            </div>
            <div className='text-div2'>
                <div className="text-section2">
                    <h1>TIC TAC TOE</h1>
                    <div className='tic-buttons'>
                        <button onClick={navigateToTournament} className="tournament-button2" >TOURNAMENT</button>
                        <button onClick={navigateToPvp} className="pvp-button2">PVP</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Game() {
    return (
        <div className="game-container">
            <PingPong />
            <TicTacToe />        
        </div>
    );
}

export default Game;