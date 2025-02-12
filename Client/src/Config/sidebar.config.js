import InboxIcon from '@mui/icons-material/Inbox'; 
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

export const SIDEBAR_DATA = [
    {
        name: 'inbox',
        title: 'Inbox',
        icon: InboxIcon,
        path: '/inbox', 
    },
    {
        name: 'starred',
        title: 'Starred',
        icon: StarRateOutlinedIcon,
        path: '/starred',
    },
    {
        name: 'snoozed',
        title: 'Snoozed',
        icon: AccessTimeIcon,
        path: '/snoozed', 
    },
    {
        name: 'sent',
        title: 'Sent',
        icon: SendOutlinedIcon,
        path: '/sent', 
    },
    {
        name: 'draft',
        title: 'Draft',
        icon: InsertDriveFileOutlinedIcon,
        path: '/draft', 
    },
    {
        name: 'bin',
        title: 'Bin',
        icon: DeleteForeverOutlinedIcon,
        path: '/bin', 
    },
    {
        name: 'all mail',
        title: 'All Mail',
        icon: MailOutlineOutlinedIcon,
        path: '/all-mail', 
    }
];