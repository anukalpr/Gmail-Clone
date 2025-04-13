// SideBarContent.js
import { Box, Button, styled, List, ListItem } from '@mui/material';
import { CreateOutlined } from '@mui/icons-material';
import { SIDEBAR_DATA } from '../Config/sidebar.config';
import ComposeMail from './ComposeMail';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import Link for routing

const ComposeButton = styled(Button)({
  margin: '10px 0px 0px 20px',
  borderRadius: 10,
  background: '#C2E7FF',
  color: 'black',
  height: 50
});

const Container = styled(Box)({
  padding: 8,
  '& > ul': {
    padding: '10px,0,0,5px',
    fontSize: 16,
    fontWeight: 'bolder',
    cursor: 'pointer'
  },
  '&>ul>li:hover': {
    background: '#90D5FF',
    borderRadius: '10px',
  },
  '& > ul > li > svg': {
    marginRight: 20
  }
});

const SideBarContent = () => {
    let navigate=useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const handlingDialog = () => {
    setOpenDialog(true);
  };

  const handlingRoute=(path)=>{
    navigate(path);
  }

  return (
    <Container>
      <ComposeButton variant="contained" onClick={handlingDialog}>
        <CreateOutlined /> Compose
      </ComposeButton>
      <List>
        {SIDEBAR_DATA.map((data) => (
          <ListItem key={data.title} onClick={()=>handlingRoute(data.path)}>
              <data.icon /> {data.title}
          </ListItem>
        ))}
      </List>
      <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </Container>
  );
};

export default SideBarContent;
