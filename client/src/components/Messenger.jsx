import { useContext, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, styled, Box } from '@mui/material';
import { AccountContext } from '../context/AccountProvider';

// components:
import LoginDialog from './account/LoginDialog';
import ChatDialog from './chat/ChatDialog';


const Messenger = () => {

  const { account } = useContext(AccountContext);

  // const location = useLocation();
  // console.log('Current route:', location.pathname); // Log the current route

  useEffect(() => {
    // console.log('Account changed:', account);
  }, [account]); // This useEffect hook will run whenever `account` changes

    // useEffect(() => {
    //   console.log(`location search: ${location.search}`); 


    // },[location]);

    return (
    <Component>
    {
      account ? 
      <>
            <Header>
              <Toolbar>
               
              </Toolbar>
            </Header>
            <ChatDialog />
            </>
            : 
            <>
            <LoginHeader>
            <Toolbar>
          
              </Toolbar>
            </LoginHeader>
            <LoginDialog /> 
            </>
      }
      </Component>
  );
};

export default Messenger;

// styles:

const Component = styled(Box)`
  height: 100vh;
  background: #ebeae6;
`;

const Header = styled(AppBar)`
  height: 12.5rem;
  background-color: #2aa884;
  box-shadow: none;
  padding: 4rem;
`;

const LoginHeader = styled(AppBar)`
  height: 14rem;
  background-color: #2aa884;
  box-shadow: none;
  padding: 4rem;
`;