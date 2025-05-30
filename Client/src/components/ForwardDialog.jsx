import { Dialog, Box, Typography, styled, InputBase, TextField, Button } from "@mui/material";
import { DeleteOutline, Shortcut } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from 'axios';

const dialogStyle = {
    height: 'fit-content',
    width: '50%',
    marginTop: '200px',
    marginLeft: '260px',
    maxHeight: '100%',
    maxWidth: '100%',
    borderRadius: '10px 10px 0 0',
};

const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    background: '#f2f6fc'
});

const RecipientsWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 15px',
});

const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '40px',
});

const SendButton = styled(Button)({
    borderRadius: 20,
    background: 'blue',
    width: 100,
    color: 'white'
});

const ForwardDialog = ({ openDialog, setOpenDialog, email }) => {
    const [recipients, setRecipients] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (email) {
            setSubject(`Fwd: ${email.subject}`);
            setBody(`\n\n---------- Forwarded message ----------\nFrom: ${email.from}\nDate: ${new Date(email.date).toLocaleString()}\nTo: ${email.to}\n\n${email.text}`);
        }
    }, [email]);

    const sendMail = async (e) => {
        e.preventDefault();
    

        try {
            await axios.post('http://localhost:4000/send-email', {
                to: recipients.trim(),
                subject: subject,
                text: body
            });
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        }
        setOpenDialog(false);
    };

    return (
        <Dialog
            open={openDialog}
            hideBackdrop={true}
            PaperProps={{ sx: dialogStyle }}
        >
            <RecipientsWrapper>
                <Shortcut />
                <InputBase
                    placeholder="Recipients"
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    style={{ borderBottom: '1px solid #F5F5F5', height: '5px', marginTop: '10px' }}
                />
                <InputBase
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{ borderBottom: '1px solid #F5F5F5', marginTop: '10px' }}
                />
                <InputBase
                    multiline
                    rows={10}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    sx={{ marginTop: '10px' }}
                />
            </RecipientsWrapper>
            <Footer>
                <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
                <DeleteOutline onClick={() => setOpenDialog(false)} />
            </Footer>
        </Dialog>
    );
};

export default ForwardDialog;
