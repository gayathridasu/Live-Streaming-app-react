import { useLocation, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect, useRef } from 'react';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

function Room() {
  const { roomId } = useParams();
  const location = useLocation();
  const { name, role } = location.state || { name: "GUEST", role: "Audience" };

  const roleCondition =
    role === 'Host' ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience;

  const sharedLinks = [
    {
      name: "Join as Audience",
      url: `${window.location.origin}/room/${roomId}`,
    },
  ];

  const appID = 1258578068;
  const serverSecret = "2912cc87f39b9a949b0f24b6a61bf84d";
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId,
    randomID(5), name);

  const myMeetingRef = useRef(null);

  useEffect(() => {
    if (myMeetingRef.current) {
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: myMeetingRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role: roleCondition,
          },
        },
        sharedLinks,
      });
    }
  }, [kitToken, roleCondition, sharedLinks]); 

  return (
    <div>
      <div
        className="myCallContainer"
        ref={myMeetingRef}
        style={{ width: '100vw', height: '100vh' }}
      ></div>
      {/* <h1>{roomId} {name} {role}</h1> */}
    </div>
  );
}

export default Room;
