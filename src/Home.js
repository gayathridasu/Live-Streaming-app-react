import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home(){
    const [name,setName]=useState("")
    const [role,setRole]=useState("Audience")
    const [roomId,setRoomId]=useState("")
    
    const navigate=useNavigate()
    const navigateToRoom=()=>{
        navigate(`/room/${roomId}`, {
            state:{name:name, role:role},
        });
    };
    return(
        <div>
            <h1>Join a Room</h1>
            <input type="text" placeholder="Enter Your Name" onChange={e=>setName(e.target.value)}/><br/>
            <input type="text" placeholder="Enter Room Id" onChange={e=>setRoomId(e.target.value)}/>

            <div>
                <label>
                <input 
                type="Radio" 
                value={"Host"} 
                checked={role==="Host"}
                onChange={(e)=>setRole(e.target.value)}
                />Host
                </label>
                <label>
                <input 
                type="Radio" 
                value={"Audience"}
                checked={role==="Audience"}
                onChange={(e)=>setRole(e.target.value)}
                />Audience

                </label>
            </div>
            <button onClick={navigateToRoom}>Join Room</button>

        </div>
    )
}
export default Home;