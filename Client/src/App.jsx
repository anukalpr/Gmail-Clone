import './App.css';
import Index from './myApp';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Inbox from './Routes/inbox';  
import Starred from './Routes/starred'; 
import Snoozed from './Routes/snoozed';
import Sent from './Routes/sent'; 
import Draft from './Routes/draft'; 
import Bin from './Routes/bin'; 
import AllMail from './Routes/allMail';
import ViewEmail from './Components/ViewEmails'; 
const router = createBrowserRouter([
  {
    path: '/',
    element:<><Inbox /> 
      <Index/>
    </> 
  },
  {
    path: '/inbox',
    element: <><Inbox /> 
      <Index/>
    </> 
  },
  {
    path: '/starred',
    element: <><Starred /> 
      <Index/>
    </> 
  },
  {
    path: '/snoozed',
    element: <><Snoozed /> 
      <Index/>
    </> 
  },
  {
    path: '/sent',
    element: <><Sent /> 
      <Index/>
    </> 
  },
  {
    path: '/draft',
    element:<> <Draft /> 
      <Index/>
    </> 
  },
  {
    path: '/bin',
    element: <><Bin /> 
      <Index/>
    </> 
  },
  {
    path: '/all-mail',
    element: <><AllMail /> 
      <Index/>
    </> 
  },
  {
    path:'/view-email',
    element:<>
    <ViewEmail />
    <Index/>
    </>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
