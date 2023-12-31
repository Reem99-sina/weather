import logo from './logo.svg';
import './App.css';
import Weather from './component/Weather.jsx';
import Nav from './component/Nav';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';
export const UserContext = createContext();

function App() {
  let [country,setcountry]=useState("")
  let [error,seterror]=useState(null)
  let [result,setresult]=useState(null)
  function onSearch(e){
    setcountry(e.target.value)
  }
 async function onSubmit(){
    // setcountry(e.target.value)
    await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=1d6b0a2b2c24425f807123243221501&q=${country}&days=3&aqi=yes&alerts=yes`).then((res)=>
   { setresult(res.data)
    seterror(null)
    }
    ).catch((err)=>{
      seterror(err.response?.data.error.message==="Parameter q is missing."?"add country name to get weather":err.response.data.error.message)
      setresult(null)
    })
  }
function keyenter(e){
if (e.key){
  onSubmit()
}
}
  return (<UserContext.Provider value={{country,onSearch,onSubmit,keyenter}}>
    
      <Weather error={error}response={result} nav={<Nav/>}/>
    </UserContext.Provider>
  );
}

export default App;
