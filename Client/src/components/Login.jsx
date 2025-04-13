// import { } from "@mui/icons-material";
import { Dialog,Box ,styled,Typography,Button} from "@mui/material";
import { Form, NavLink } from "react-router-dom";
import {icon} from '../Constant/constant';
import { useState } from "react";
import axios from 'axios';

const DialogBox={
    height:'80%',
    width:'30%',
    maxHeight:'100%',
    maxWidth:'100%',
    margin:'10px 0 10px 910px',
    borderRadius:'30px 30px 30px 30px'
}
const IconBox=styled(Box)({
    margin:'100px 0 0px 50px',
    border:'1px solid #2f2f2f',
    borderRadius:'30px',
    padding:'20px 10px 20px 20px',
    width:'300px',
    color:'#2f2f2f'
});
const LoginButton=styled(Button)({
    border:'1px solid black',
    background:'blue',
    color:'white',
    borderRadius:'10px',
    width:'100px',
    margin:'30px 0 0 100px'
})
const Login=({openDialog})=>{
    const [email,setEmails]=useState('');
    const [Password,setPassword]=useState('');

    const signIn=async()=>{
        try{
            await axios.post('http://localhost:4000/login', { 
                email: email, 
                password: Password 
            });
              
            alert('LoggedIn!');
        }
        catch(error){
            console.log(error.message);
        }
    }
  
    return(
        <Dialog open={openDialog} hideBackdrop={true} PaperProps={{sx: DialogBox}}>
            {/* <Typography style={{margin:'20px 0 0 160px',fontWeight:'bold',fontSize:'30px'}}>Login</Typography> */}
            <img src={icon} alt="" style={{ width:110, marginLeft:'140px', marginTop:'20px'}}/>

            <IconBox>
               <Form action="">
                  <Box>
                  <label>Email:
                  <input type="text" onChange={(e)=>setEmails(e.target.value)} style={{padding:'5px',margin:'0 0 10px 45px'}}/>
                  </label>
                  </Box>
                  <Box>
                  <label>Password:</label>
                  <input type="text" onChange={(e)=>setPassword(e.target.value)} style={{padding:'5px', margin:'0 0 10px 22px'}}/>
                  </Box>
                  <LoginButton onClick={signIn}>Signin</LoginButton>
                  <Box style={{marginTop:'30px'}}>
                    Not a Member?
                    <NavLink>SignUp</NavLink>
                  </Box>
               </Form>
            </IconBox>
        </Dialog>
    )
}
export default Login;