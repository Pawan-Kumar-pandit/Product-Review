import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reviewpage from './components/Reviewpage';
import Navbar from './components/Navbar'
import Home from './components/Home';
import Resgisterlogin from './components/Resgisterlogin';
import Registration from './components/Registration';
import Initialpage from './components/Initialpage';
import Myreviews from './components/Myreviews';
import Notify from './components/Notify';
import socket from './socket';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
function App() {
  
  let [names , setNames] = useState('')
  const [log, setLog]= useState(true);


  socket.on( "Notification",user=>{
    setNames(user);
    console.log(user);
    console.log(log);
    if(log===true){
      displaymes(user);
    }
    console.log(200000)
  })
let displaymes=(name)=>{
  if(name!="" ){
  toast(`New review is Posted by ${name}`,{
 position:toast.POSITION.TOP_CENTER

  });
   setLog(false);  
}
}

useEffect(()=>{
setLog(true);
  },[])




console.log("count");
  return (
    <>
    {names==""?"": <ToastContainer/> 
    } 
     
    <BrowserRouter>
    <Navbar/>  
    <Routes>
      <Route path="/" element={<Initialpage/>} />
      <Route path="/register" element={<Registration/>}/>
      <Route path="/login" element={<Resgisterlogin/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/createReview" element={<Reviewpage/>}/>
      <Route path="/Myreview"  element={<Myreviews/>}/>
   
    </Routes>
    </BrowserRouter>

    {/* <Home/> */}
    </>
  );
}

export default App;
