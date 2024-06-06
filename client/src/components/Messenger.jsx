import { useContext, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, styled, Box } from '@mui/material';
import { AccountContext } from '../context/AccountProvider';
import LoginDialog from './account/LoginDialog';
import ChatDialog from './chat/ChatDialog';


const Component = styled(Box)`
  height: 100vh;
  background: #ebeae6;
`;
//login f0f2f5 color backgorund after login: e2e1dd

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

const Messenger = () => {
  const { account } = useContext(AccountContext);

  // const location = useLocation();
 
 
  // yariv console logs:
  // console.log('Current route:', location.pathname); // Log the current route

  useEffect(() => {
    // console.log('Account changed:', account);
  }, [account]); // This useEffect hook will run whenever `account` changes

    // useEffect(() => {
    //   console.log(`location search: ${location.search}`); 


    // },[location]);









    // yariv example:
    // useEffect(() => {
    //   const params = new URL(window.location.toString()).searchParams;
    //   const profile = params.get("profile");
    //   const token = params.get("token");
    //   console.log('profile - ',profile)
    //   console.log('token - ',token)
    //   if (profile && token) {
    //     // set_authenticated(true)
    //     // set_user(JSON.parse(profile))
        
    //     localStorage.setItem('token',token);
  
    //     //remove query string and path from url...
    //     window.history.replaceState({}, document.title, "/");
    //   }
    // }, [])


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









//working code no passport.js or jwt:
// import { useContext } from 'react';

// import { AppBar, Toolbar, styled, Box } from '@mui/material';
// import { AccountContext } from '../context/AccountProvider';

// // Components
// import LoginDialog from './account/LoginDialog';
// import ChatDialog from './chat/ChatDialog';


// // Create styled versions of AppBar and Toolbar
// const Component = styled(Box)`
//   height: 100vh;
//   background: #DCDCDC;
// `
// const Header = styled(AppBar)`
// height: 125px;
//   background-color: #00A884;  // Change background color
//   box-shadow: none;            // Remove default shadow
//   padding: 4rem;            // Add padding: ;
// `;
// const LoginHeader = styled(AppBar)`
// height: 22rem;
//   background-color: #00bfa5;  // Change background color
//   box-shadow: none;            // Remove default shadow
//   padding: 4rem;            // Add padding: ;
// `;



// const Messenger = () => {

//   const { account } = useContext(AccountContext);

//   return(
  
//   <Component>
//     {
//       account ? 
//       <>
//             <Header>
//               <Toolbar>
               
//               </Toolbar>
//             </Header>
//             <ChatDialog />
//             </>
//             : 
//             <>
//             <LoginHeader>
//             <Toolbar>

//               </Toolbar>
//             </LoginHeader>
//             <LoginDialog /> 
//             </>
//       }
//       </Component>
//     );
// }

// export default Messenger;
