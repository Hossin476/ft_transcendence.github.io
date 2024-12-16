const GRID_POSITIONS = [
    [-1, 1, 0], [0, 1, 0], [1, 1, 0],
    [-1, 0, 0], [0, 0, 0], [1, 0, 0],
    [-1, -1, 0], [0, -1, 0], [1, -1, 0],
];

const handleWebSocketMessage = (
    data,
    setBoard,
    setFinalWinner,
    setDraw,
    setShowReconnectModal,
    setReconnectTimer,
    setStartCountdownValue,
    startModalShownRef,
    setShowStartModal,
    setCurrentTurn,
    setScores,
    setTimer,
    setPlayerRole,
    setWinnerLine
) => {
    if (data.state) setBoard(data.state);
    if (data.final_winner) setFinalWinner(data.final_winner);
    if (data.draw !== undefined) setDraw(data.draw);
    if (data.reconnect_countdown === undefined || data.reconnect_countdown === 0)
        setShowReconnectModal(false);
    else
    {
        setShowReconnectModal(true);
        setReconnectTimer(data.reconnect_countdown);
    }
    if (data.start_countdown_value !== undefined)
    {
        setStartCountdownValue(data.start_countdown_value);
        if (!startModalShownRef.current)
        {
            setShowStartModal(true);
            startModalShownRef.current = true;
        }
        if (data.start_countdown_value === 0) setShowStartModal(false);
    }
    if (data.current_turn) setCurrentTurn(data.current_turn);
    if (data.score_x !== undefined && data.score_o !== undefined)
    {
        const [usernameX, scoreX] = data.score_x.split(' : ');
        const [usernameO, scoreO] = data.score_o.split(' : ');
        setScores({ [usernameX]: parseInt(scoreX, 10), [usernameO]: parseInt(scoreO, 10) });
    }
    if (data.countdown !== undefined) setTimer(data.countdown);
    if (data.player_role) setPlayerRole(data.player_role);
    if (data.winner_line) setWinnerLine(data.winner_line.map(index => GRID_POSITIONS[index]));
    else setWinnerLine(false);
};

export default handleWebSocketMessage;