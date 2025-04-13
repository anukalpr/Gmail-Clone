import './App.css'
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import {useState} from 'react';
import Emails from './Components/Emails';
function myApp() {
  const [openDrawer, setOpenDrawer]=useState(true);
  const toggleDrawer=()=>{
    setOpenDrawer(prevState=>!prevState);
  }
  return (
    <div>
      <Header toggleDrawer={toggleDrawer}/>
      <SideBar openDrawer={openDrawer}/>
      <Emails openDrawer={openDrawer}/>
    </div>
  )
}

export default myApp;
