import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function ReconnectNotification() {
  const [show, setShow] = useState(true);
  const { socket } = useAuth();

  function reconnect() {
    if (socket) {
      const message = JSON.stringify({
        type: "reconnect_game",
        game: props.gameType
      })
      socket.send(message);
    }
  }

  return show ? (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg flex items-start hover:bg-gray-200 transition duration-300">
      <div className="flex-grow ml-4">
        <h3 className="text-black text-lg mt-1 max-w-[15rem] flex-wrap">
          Disconnected from game. Reconnect?
        </h3>
      </div>
      <div className="flex items-center ml-4 my-auto space-x-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300" onClick={reconnect}>
          Reconnect
        </button>
      </div>
    </div>
  ) : null;
}

export default ReconnectNotification;