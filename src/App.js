import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import React, { useEffect, useState } from 'react';

function App() {
  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

const logout = () => {
  liff.logout();
  window.location.reload();
}
const initLine = () => {
  liff.init({ liffId: '1657452401-nWzyM0jP' }, () => {
    if (liff.isLoggedIn()) {
      runApp();
    } else {
      liff.login();
    }
  }, err => console.error(err));
}
const runApp = () => {
  const idToken = liff.getIDToken();
  setIdToken(idToken);
  liff.getProfile().then(profile => {
    console.log(profile);
    setDisplayName(profile.displayName);
    setPictureUrl(profile.pictureUrl);
    setStatusMessage(profile.statusMessage);
    setUserId(profile.userId);
  }).catch(err => console.error(err));
}

useEffect(() => {
  initLine();
}, []);

return (
  <div className="App">
    <header className="App-header">
    <div className=' text-center top left right bottom'>
      <h1>Line-login</h1>
      <hr/>
      <img src={pictureUrl} width="100px" height="100px"/>
      <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all", fontSize: "30px" }}><b>id token: </b> {idToken}</p>
      <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all", fontSize: "30px" }}><b>display name: </b> {displayName}</p>
      <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all", fontSize: "30px"}}><b>status message: </b> {statusMessage}</p>
      <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all", fontSize: "30px" }}><b>user id: </b> {userId}</p>

      <button onClick={() => logout()} style={{ width: "100%", height: 30 }}>Logout</button>
    </div>
    </header>
  </div>
);
}
export default App;
