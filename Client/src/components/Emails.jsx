import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DeleteForeverOutlined, Refresh } from '@mui/icons-material';
import { Checkbox, Box, List, IconButton } from '@mui/material';
import axios from 'axios';
import Email from './Email';
import ViewEmail from './ViewEmails';
import Header from './Header';
import Login from './Login';
const Emails = ({ openDrawer }) => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null); 
  const location = useLocation();

  const fetchEmails = async () => {
    try {
      const res = await axios.get('http://localhost:4000/emails');
      setEmails(res.data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  useEffect(() => {
    fetchEmails();

    const interval = setInterval(() => {
      fetchEmails();
    }, 5000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  const filteredEmails = emails.filter(email => {
    if (location.pathname === '/inbox') return !email.bin && !email.draft;
    if (location.pathname === '/starred') return email.starred;
    if (location.pathname === '/snoozed') return email.snoozed;
    if (location.pathname === '/sent') return email.from === 'singhanukalp465@gmail.com';
    if (location.pathname === '/draft') return email.draft;
    if (location.pathname === '/bin') return email.bin;
    if (location.pathname === '/all-mail') return true;
    return false;
  });

  const selectAllEmails = (e) => {
    if (e.target.checked) {
      const allEmailIds = filteredEmails.map(email => email._id);
      setSelectedEmails(allEmailIds);
    } else {
      setSelectedEmails([]);
    }
  };

  const toggleSelectEmail = (emailId) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId) 
        : [...prev, emailId]
    );
  };

  const handleSelectedDelete = async () => {
    try {
      if (location.pathname === '/bin') {
        await axios.delete('http://localhost:4000/emails/delete', { data: { ids: selectedEmails } });
        setEmails(prevEmails => prevEmails.filter(email => !selectedEmails.includes(email._id)));
      } else {
        await axios.put('http://localhost:4000/emails/bin', { ids: selectedEmails });
        setEmails(prevEmails => prevEmails.map(email => selectedEmails.includes(email._id) ? { ...email, bin: true } : email));
      }
      setSelectedEmails([]);
    } catch (error) {
      console.error('Error deleting emails:', error);
    }
  };

  return (
    <Box style={openDrawer ? { marginLeft: '250px', marginTop: '64px' } : { marginTop: '64px', width: '100%' }}>
      {location.pathname !== '/view-email' && (
        <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' }}>
          <Checkbox 
            size='small' 
            onChange={selectAllEmails}
            checked={selectedEmails.length === filteredEmails.length && filteredEmails.length > 0}
          />
          <IconButton onClick={handleSelectedDelete}>
            <DeleteForeverOutlined />
          </IconButton>
          <IconButton onClick={fetchEmails}>
            <Refresh />
          </IconButton>
        </Box>
      )}
      <List>
        {filteredEmails.map(email => (
          <Box key={email._id} onClick={() => setSelectedEmail(email)}>
            <Email 
              email={email} 
              selectedEmails={selectedEmails} 
              setEmails={setEmails}
              openDrawer={openDrawer}
              toggleSelectEmail={toggleSelectEmail}
            />
          </Box>
        ))}
      </List>
      {selectedEmail && <ViewEmail openDrawer={openDrawer} email={selectedEmail} setEmails={setEmails} />}
      {/* <Header toggleDrawer={openDrawer} setEmails={setSelectedEmail}/> */}
    </Box>
  );
};
export default Emails;