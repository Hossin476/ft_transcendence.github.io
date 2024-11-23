import '../Components/Game/Game.css'
import Pingpic from '../../public/avatar/PingPong.png';
import TicPic from '../../public/avatar/TicTacToe.png';
import { useNavigate } from "react-router-dom";
import Challenge from '../Components/Challenge/Challenge';
import { useTranslation } from 'react-i18next';

function PingPong() {

    const navigate = useNavigate();
    const { t } = useTranslation();



    function navigateToTournament() {
        navigate('/game/pingpong/tournament');
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
                        <button onClick={navigateToTournament} className="tournament-button" >{t("TOURNAMENT")}</button>
                        <button  onClick={navigateToPvp} className="pvp-button">{t("PVP")}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TicTacToe() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    function navigateToTournament() {
        navigate('/game/tictactoe/tournament');
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
                        <button onClick={navigateToPvp} className="pvp-button2">{t("PVP")}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Game() {
    return (
        <div className='bg-primaryColor w-full flex flex-row items-center justify-center px-7 relative h-[100%] fade-in '>
            <div className="game-container flex  justify-center  flex-col items-center xsm:w-[90%] w-[80%] max-w-[1700px] min-h-[800px]">
                <PingPong />
                <TicTacToe />        
            </div>
        </div>
    );
}

export default Game;