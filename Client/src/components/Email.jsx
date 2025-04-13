import { AccessAlarm, DeleteForeverOutlined, Star, StarBorder } from "@mui/icons-material";
import { Checkbox, Box, Typography, IconButton, styled } from "@mui/material";
import { useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

const WrapperEmail = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #e0e0e0',
  background: "#f2fcf4",
  cursor: 'pointer',
  height: '10px',
  '.& >p': {
    fontSize: 14
  }
});

const Email = ({ email, selectedEmails, setEmails, toggleSelectEmail }) => {
  const [isStarred, setIsStarred] = useState(email.Starred);
  const [isSnoozed, setIsSnoozed] = useState(email.snoozed);
  const location=useLocation();
  const navigate=useNavigate();
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

  const handleSnoozed = async () => {
    try {
      await axios.put(`http://localhost:4000/emails/${email._id}/snooze`);
      setIsSnoozed(!isSnoozed);
      setEmails(prevEmails => prevEmails.map(e => 
        e._id === email._id ? { ...e, snoozed: !e.snoozed } : e
      ));
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/emails/${email._id}/delete`);
      setEmails(prevEmails => prevEmails.filter(e => e._id !== email._id));
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

  const handleBinDelete=()=>{
    if(location.pathname=='bin'){
        handleBin();
    }
    else{
      handleDelete();
    }
  }
   const handleViewEmail=()=>{
    navigate('/view-email');
  }
  return (
    <WrapperEmail >
      <Checkbox 
        size="small" 
        checked={selectedEmails.includes(email._id)} 
        onChange={() => toggleSelectEmail(email._id)}
      />
      <IconButton onClick={handleStarred}>
        {isStarred ? <Star size="small" style={{ color: "gold" }} /> : <StarBorder size="small" />}
      </IconButton>
      <IconButton onClick={handleSnoozed}>
        <AccessAlarm size="small" style={isSnoozed ? { color: "blue" } : { color: "gray" }} />
      </IconButton>
      <Typography style={{ marginRight: '10px' }}onClick={handleViewEmail} >{email.from}</Typography>
      <Typography style={{ flex: 1, textAlign:'center' }}onClick={handleViewEmail} >{email.subject}</Typography>
      {/* <Typography style={{ marginRight: "150px" }}onClick={handleViewEmail} >{email.text}</Typography> */}
      <Typography style={{ marginRight: '10px' }} onClick={handleViewEmail}>{new Date(email.date).toLocaleString()}</Typography>
      <IconButton onClick={handleBinDelete}>
        <DeleteForeverOutlined style={{color:'red'}}/>
      </IconButton>
    </WrapperEmail>
  );
};

export default Email;