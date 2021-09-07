import React,{useState} from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [password,setPassword] = useState('');
  const [title,setTitle] = useState('');
  const addPassword  = (e) => {
    Axios.post("http://localhost:3001/addpassword",{password:password, title:title}).then( (response)=> {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("ERROR");
    });;
    
   
  }

  return (
    <div className="App">
      <div className="input__password">
      
        <input type = "text" placeholder="Ex. password123" onChange={(e)=>{
          setPassword(e.target.value);
        }}/>
        <input type = "text" placeholder="Ex. Facebook" onChange={(e)=>{
          setTitle(e.target.value);
        }}/>
        <button onClick={addPassword}>Add Password</button>
      </div>
    </div>
  );
}

export default App;
