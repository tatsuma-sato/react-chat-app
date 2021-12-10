import './App.css';
import React, {useState ,useEffect} from 'react';
import { onAuthStateChanged } from '@firebase/auth';

import Login from './components/Login';
import { auth } from './firebase/firebase.util';
import Main from './components/Main';

function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if(authUser){
        // console.log(authUser);
        setUser(authUser)
        // Login
      }else{
        // Logout
      }
    })
  }, [])

  return (
    <div className="App">
      {/* main or login */}
      {user ? <Main user={user}/> : <Login />}
      {/* <Login /> */}
    </div>
  );
}

export default App;
