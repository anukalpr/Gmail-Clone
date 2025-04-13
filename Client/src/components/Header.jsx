import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Menu as MenuIcon,Search,Tune,HelpOutline,SettingsOutlined,Try,AppsOutlined,AccountCircleOutlined} from '@mui/icons-material';
import {styled} from '@mui/system';
import {icon} from '../Constant/constant';
import {Box,InputBase} from '@mui/material';
import Login from "./Login";
const StyledAppBar=styled(AppBar)({
    background:'#F5F5F5',
    boxShadow: 'none'
})
const SearchWrapper=styled(Box)({
    background: '#EAF1FB',
    marginLeft:80,
    width:710,
    height:48,
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 50
})
const InputBox=styled(InputBase)({
    border:'none',
    background:'#EAF1FB', 
    width:'inherit',
    height:'inherit',
    color:'black'
})
const IconBox=styled(Box)({
    width:'100%',
    display:'flex',
    justifyContent:'end',
    cursor:'pointer',
    '& > svg':{
        marginLeft:20
    }
})
const Header=({toggleDrawer,setEmails, emails})=>{
    const [openDialog, setOpenDialog] = useState(false);
    const handlingDialog = () => {
      setOpenDialog(true);
    };
    const [searchQuery,setSearchQuery]=useState('');

    const handleSearch=async(e)=>{
        const query=e.target.value;
        setSearchQuery(query);
        if(query.length>2){
            try{
                const res=await fetch(`http://localhost:4000/emails?search=${query}`)
                const data=await res.json();
                setEmails(data);
            }
            catch(err){
                console.log(err.message);
            }
        }
    }
    return(
        <StyledAppBar >
           <Toolbar>
                <MenuIcon color="action" onClick={toggleDrawer}/>
                <img src={icon} alt="" style={{ width:110, marginLeft: 20}}/>
                <SearchWrapper>
                    <Search color="action" style={{marginLeft: 20}}/>
                    <InputBox type="text" placeholder="Search mail" value={searchQuery} onChange={handleSearch}/>
                    <Tune color="action" style={{marginRight: 20}}/>
                </SearchWrapper>
                <IconBox>
                    <HelpOutline style={{color:'Gray'}}/>
                    <SettingsOutlined color="action" />
                    <AppsOutlined color="action"/>
                    <AccountCircleOutlined color="action" onClick={handlingDialog}/>
                </IconBox>
           </Toolbar>
           <Login openDialog={openDialog} setOpenDialog={setOpenDialog}/>
        </StyledAppBar>
    )
}
export default Header;