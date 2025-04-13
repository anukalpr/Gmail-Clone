import { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ArrowBack, Delete, Reply, StarBorder, Star,Shortcut } from '@mui/icons-material';
import axios from 'axios';
import ReplyDialog from './ReplyDialog';
import ForwardDialog from './ForwardDialog';

const ViewEmail = ({ openDrawer, email, setEmails }) => {
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [isStarred, setIsStarred] = useState(email?.starred || false);

  useEffect(() => {
    setIsStarred(email?.starred || false);
  }, [email]);

  const handleStarred = async () => {
    try {
      await axios.put(`http://localhost:4000/emails/${email._id}/star`);
      setIsStarred(!isStarred);
      setEmails(prevEmails => prevEmails.map(e => 
        e._id === email._id ? { ...e, starred: !e.starred } : e
      ));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleBin = async () => {
    try {
      await axios.put(`http://localhost:4000/emails/${email._id}/bin`);
      setEmails(prevEmails => prevEmails.map(e => e._id === email._id ?{...e,bin:true}:e));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleReply = () => {
    setOpenDialog(true);
  };
  const handleForward = () => {
    setOpenDialog2(true);
  };

  const drawerStyle = openDrawer 
    ? { marginLeft: '0px', marginTop: '0px' } 
    : { marginTop: '0px', width: '100%' };

  const pathnamesToHide = ['/inbox', '/sent', '/draft', '/bin', '/all-mail', '/snoozed', '/starred'];

  return (
    <Box style={drawerStyle}>
      {!pathnamesToHide.includes(location.pathname) && email && (
        <Box>
          <Box>
            <IconButton onClick={() => window.history.back()}>
              <ArrowBack color='action' fontSize='small' />
            </IconButton>
            <IconButton onClick={handleBin}>
              <Delete />
            </IconButton>
          </Box>
          <Box>
            <Typography style={{padding:'20px 0px 0px 60px', fontSize:'20px'}}>
              {email.subject}
            </Typography>
          </Box>
          <Box style={{display:'flex'}}>
            <Box>
              <img src='https://lh3.googleusercontent.com/a/default-user=s40-p' style={{borderRadius:'50px'}}/>
            </Box>
            <Box style={{display:'flex'}}>
              <Typography style={{padding:'10px 0px 0px 20px'}}>{email.from}</Typography>
              <Typography style={{ marginRight: '10px',padding:'20px 0px 0px 500px', color:'#5e5e5e', fontFamily:'sans-serif'}} >
                {new Date(email.date).toLocaleString()}
              </Typography>
            </Box>
            <Box>
              {isStarred ? 
                <Star fontSize="small" onClick={handleStarred} style={{ marginRight: '10px', padding:'5px 0px 0px 10px', color: "gold"}} /> 
                : 
                <StarBorder fontSize="small" onClick={handleStarred} style={{ marginRight: '10px', padding:'20px 0px 0px 10px' }} />
              }
              <Reply style={{ padding:'15px 0 0 10px', cursor:'pointer' }} onClick={handleReply} />
            </Box>
          </Box>
          <Box>
            <Typography style={{ marginRight: "150px", padding:' 10px 0 0 60px', fontFamily:'sans-serif', color:'#222222' }}>
              {email.text}
            </Typography>
          </Box>
          <Box>
            <Button onClick={handleReply} style={{padding:'5px 20px 0 20px', margin:'50px 0 0 60px', border:'1px solid black',borderRadius:'50px', color:'black'}}><Reply/>Reply</Button>
            <Button onClick={handleForward} style={{padding:'5px 20px 0 20px', margin:'50px 0 0 60px', border:'1px solid black',borderRadius:'50px', color:'black'}}><Shortcut/>Forward</Button>
          </Box>
        </Box>
      )}
      <ReplyDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <ForwardDialog openDialog={openDialog2} setOpenDialog={setOpenDialog2} email={email} />
    </Box>
  );
};

export default ViewEmail;
