import React,{useState,useEffect} from 'react';
import './App.css';
import Axios from 'axios';



function App() {
  const [password,setPassword] = useState('');
  const [title,setTitle] = useState('');
  const [passwordList,setPasswordList] = useState([]);
  // const [clr,setClr] = useState({bgColor:""});
  const addPassword  = (e) => {
    Axios.post("http://localhost:3001/addpassword",{password:password, title:title}).then( (response)=> {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("ERROR");
    });  }
// const boxClick = () =>{
//   setClr({bgColor:"green"})
// }
  const decryptPassword = (encryption)=>{
    Axios.post("http://localhost:3001/decryptPassword",{password: encryption.password, iv:encryption.iv})
    .then((response)=>{
      setPasswordList(passwordList.map((val)=>{
        return val.id === encryption.id ? {id:val.id,password:val.password,title:response.data,iv:val.iv}: val;
      }))
    })

  }
 useEffect(()=>{
    Axios.get("http://localhost:3001/showpasswords").then((response)=>{
      setPasswordList(response.data);
    })
 },[])
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
      <div className="Passwords">
        {
          passwordList.map((val,key)=>{
            return <div className="password" onClick = {()=>{
              // boxClick()
              decryptPassword({
                password: val.password, iv: val.iv, id: val.id, 
              })   
            }}
            key = {key}><h3>
              {val.title}
            </h3></div>
          })
        }
      </div>
        


    </div>
  );
}

export default App;
