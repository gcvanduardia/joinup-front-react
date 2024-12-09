import { useState, ChangeEvent, FormEvent } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { useHistory } from "react-router-dom"; // Importa useHistory

function JoinForm() {
  const hmsActions = useHMSActions();
  const history = useHistory(); // Usa useHistory
  const [inputValues, setInputValues] = useState({
    userName: "",
    roomCode: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      userName = '',
      roomCode = '',
    } = inputValues

    console.log(`Fetching auth token for room code: ${roomCode}`);
    // use room code to fetch auth token
    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })
    console.log(`Auth token received: ${authToken}`);

    try {
      // Solicitar permisos de cámara y micrófono
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      await hmsActions.join({
        userName,
        authToken,
        settings: {
          isAudioMuted: false,
          isVideoMuted: false
        }
      });
      console.log(`User ${userName} has joined the room successfully.`);
      history.push("/conference"); // Redirige al componente Conference
    } catch (e) {
      console.error(`Error joining the room: ${e}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Join Room</h2>
      <div className="input-container">
        <input
          required
          value={inputValues.userName}
          onChange={handleInputChange}
          id="userName"
          type="text"
          name="userName"
          placeholder="Your name"
          style={{ color: 'red' }} // Cambia 'red' por el color que prefieras
        />
      </div>
      <div className="input-container">
        <input
          id="room-code"
          type="text"
          name="roomCode"
          placeholder="Room code"
          onChange={handleInputChange}
          style={{ color: 'red' }} // Cambia 'red' por el color que prefieras
        />
      </div>
      <button className="btn-primary">Join</button>
    </form>
  );
}

export default JoinForm;