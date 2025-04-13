import {Drawer} from '@mui/material';
import SideBarContent from './SideBarContent';
const SideBar=({openDrawer})=>{
    return(
        <Drawer
            anchor='left'
            open={openDrawer}
            hideBackdrop={true}
            ModalProps={{
                keepMounted:true
            }}
            variant='persistent'
            sx={{
                '& .MuiPaper-root':{
                    marginTop:'64px',
                    background:'#F5F5F5',
                    height:'calc(100vh-64px)',
                    width:250,
                    borderRight:'none'
                }
            }}
        >
            <SideBarContent/>
        </Drawer>
    )
}
export default SideBar;