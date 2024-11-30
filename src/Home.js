import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Audience");
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  const navigateToRoom = () => {
    navigate(`/room/${roomId}`, {
      state: { name: name, role: role },
    });
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Welcome to Live Stream</h1>
        <p className="home-description">
          Enter a Room ID and join your live stream experience
        </p>

        <div className="form-container">
          <input
            type="text"
            placeholder="Enter Your Name"
            className="form-input"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Room ID"
            className="form-input"
            onChange={(e) => setRoomId(e.target.value)}
            required
          />

          <div className="role-selection">
            <label>
              <input
                type="radio"
                value="Host"
                checked={role === "Host"}
                onChange={(e) => setRole(e.target.value)}
              />
              Host
            </label>
            <label>
              <input
                type="radio"
                value="Audience"
                checked={role === "Audience"}
                onChange={(e) => setRole(e.target.value)}
              />
              Audience
            </label>
          </div>

          <button className="join-btn" onClick={navigateToRoom}>
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
