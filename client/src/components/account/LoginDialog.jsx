import { Dialog, Typography, List, ListItem, Box, Button, styled } from '@mui/material';
// import { Dialog, Typography, List, ListItem, Box, Button, styled, Divider } from '@mui/material';
import { Google } from '@mui/icons-material';
import { qrCodeImage } from '../../assets/data.mjs';
import { useContext, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { AccountContext } from '../../context/AccountProvider';
import { addUser } from '../../service/api.mjs';
import { useTheme } from '@mui/material/styles';

const Component = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  height: '100%',
  flexWrap: 'nowrap',
  
  [theme.breakpoints.down('md')]: { // 900px
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: '1rem',
      // alignItems: 'center',
  },
  [theme.breakpoints.down('sm')]: { // 600px
      padding: '0.5rem',
  },
}));

const Container = styled(Box)(({ theme }) => ({
  padding: '3.5rem 0 5rem 2.8rem',
  // flex: '1 1 auto',
  [theme.breakpoints.down('md')]: { // 900px
      // padding: '1rem 0',
      textAlign: 'center',
      
  },
  [theme.breakpoints.down('sm')]: { // 900px
      textAlign: 'center',
      padding: '1rem 0',
  },
}));

const QRCodeContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

  alignItems: 'center',
  margin: '3rem 2rem 0 6rem',
  [theme.breakpoints.down('md')]: { // 900px
      margin: '0 auto',
  },
}));

const QRCode = styled('img')(({ theme }) => ({
  height: 280,
  width: 280,
  [theme.breakpoints.down('md')]: { // 900px
      // height: 200,
      // width: 200,
      // margin: '0 auto',
  },
  [theme.breakpoints.down('sm')]: { // 600px
      height: 250,
      width: 250,
  }
}));

const LoginButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f2f5',
  color: '#2aa884',
  position: 'absolute',
  top: '23%',
  '&:hover': {
      backgroundColor: '#f0f2f5',
      boxShadow: '0.8rem 0.5rem 1rem #2aa884ae',
  },
  [theme.breakpoints.down('md')]: { // 960px
    top: '65%',
    
      // position: 'static',
      // transform: 'none',
      // marginTop: '1rem',
  },
  [theme.breakpoints.down('sm')]: { // 600px
    // top: '65%',
    // height: 25,
    // width: 130,
}
}));

const LoginButtonText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif',
  paddingLeft: '0.5rem',
  fontWeight: 500,
  fontSize: '1rem',
  // flexGrow: 1, // Ensure text takes up available space
  [theme.breakpoints.down('md')]: { // 960px and below
      fontSize: '0.9rem',
      whiteSpace: 'nowrap',
      // paddingLeft: '0.1rem',
  },
  [theme.breakpoints.down('sm')]: { // 600px and below
      // fontSize: '0.5rem',
      whiteSpace: 'nowrap',
      paddingLeft: '0.2rem',
      
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  display: 'flex',
  
  fontSize: '1.7rem',
  marginBottom: '1.5rem',
  color: '#525252',
  fontFamily: 'Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif',
  fontWeight: 400,
  paddingLeft: '0.8rem',

  [theme.breakpoints.down('sm')]: { // 600px
      fontSize: '1.1rem',
      textAlign: 'left',
      fontWeight: 500,
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  '& > li': {
      fontSize: '1.2rem',
      fontFamily: 'Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif',
      lineHeight: '2.2rem',
      color: '#4a4a4a',
      [theme.breakpoints.down('md')]: { // 900px
          
          
      },    
      [theme.breakpoints.down('sm')]: { // 600px
          fontSize: '1rem',
          lineHeight: '1.4rem',
          
      },    
    },
})); 

const dialogStyle = (theme) => ({
  marginTop: '1%',
  height: '77%',
  // width: '58%',
  maxWidth: '100vw',
  maxHeight: '100vh',
  borderRadius: 1,
  boxShadow: 20,
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: { // 900px
    // marginTop: '0',
      // width: '90vw',
      // width: '95%',
  },
  [theme.breakpoints.down('sm')]: { // 600px
      // width: '95%',
      // marginBottom: '50%',
      height: '90%',
      
  },
});

// const StyledDivider = styled(Divider)`
// width: 90%;
// margin: 0 auto;
// opacity: 0.8;
// `;

const LoginDialog = () => {
const { setAccount } = useContext(AccountContext);
const location = useLocation();
const theme = useTheme();

useEffect(() => {
    const params = new URLSearchParams(location.search);
    const profile = params.get('profile');
  
    if (profile) {
        const userProfile = JSON.parse(decodeURIComponent(profile));
        const user = {
            name: userProfile.displayName || 'Anonymous',
            email: userProfile.email || '',
            picture: userProfile.picture || '',
            sub: userProfile.googleId || ''
        };

        setAccount(user);
      
        addUser(user).then(response => {
          if (response?.msg === 'User already exists') {
              console.info('User already exists in the database.');
          }
      });

        window.history.replaceState(null, '', window.location.pathname);
    }
}, [setAccount, location.search]);

const handleLogin = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
};

return (
  <Dialog
    open={true}
    slotProps={{ backdrop: { style: { backgroundColor: 'unset' } } }}
    maxWidth={'md'}
    PaperProps={{ sx: dialogStyle(theme) }}
  >
    <Component>
      <Container>
        <Title>Use WhatsApp on your computer</Title>
        <StyledList>
          <ListItem>1. Open WhatsApp on your phone</ListItem>
          <ListItem>2. Tap Menu on Android, or Settings on iPhone</ListItem>
          <ListItem>3. Tap Linked devices and then Link a device</ListItem>
          <ListItem>4. Point your phone at this screen to capture the QR code</ListItem>
        </StyledList>
      </Container>
      <QRCodeContainer>
        <LoginButton onClick={handleLogin} variant="contained">
          <Google fontSize="small" />
          <LoginButtonText>Log in with Google</LoginButtonText>
        </LoginButton>
        <QRCode src={qrCodeImage} alt="QR Code" />
      </QRCodeContainer>
    </Component>
    {/* <StyledDivider /> */}
  </Dialog>
);
};

export default LoginDialog;



//perfect style without not responsive 07/06/24:
// import { Dialog, Typography, List, ListItem, Box, Button, styled, Divider } from '@mui/material';
// import { Google } from '@mui/icons-material';
// import { qrCodeImage } from '../../assets/data.mjs';
// // import { useNavigate } from 'react-router-dom';
// import { useContext, useEffect } from 'react'; // Import useContext
// import { useLocation } from "react-router-dom";
// import { AccountContext } from '../../context/AccountProvider'; // Import AccountContext
// // import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
// import { addUser } from '../../service/api.mjs';
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";



// const Component = styled(Box)`
//     display: flex;
    
// `;

// const Container = styled(Box)`
//     padding: 3.5rem 0 5rem 2.8rem;
// `;

// const QRCode = styled('img')({
//     margin: '3.5rem 0 0 6rem',
//     height: 280,
//     width: 280
// });

// const LoginButton = styled(Button)`
//   position: absolute;
//   top: 55%;
//   transform: translateX(50%) translateY(50%);
//   background-color: #f0f2f5;
//   color: #2aa884;
//   &:hover {
//     background-color: #f0f2f5;
//     box-shadow: 0.8rem 0.5rem 1rem #2aa884ae;
//   }
// `
// const LoginButtonText = styled(Typography)`
// font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif;
// padding-left: 0.5rem;
// font-weight: 500;
// font-size: 1rem;
// `

// const Title = styled(Typography)`
//     font-size: 1.7rem;
//     margin-bottom: 1.5rem;
//     color: #525252;
//     font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif;
//     font-weight: 400;
//     padding-left: 0.8rem;
// `;

// const StyledList = styled(List)`
//     &  > li {
//         font-size: 1.2rem;
//         font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif;
//         line-height: 2.2rem;
//         color: #4a4a4a;
//     }
// `;

// const dialogStyle = {
//     marginTop: '1%',
//     height: '77%',
//     width: '58%',
//     maxWidth: '100%',
//     maxHeight: '100%',
//     borderRadius: 1,
//     boxShadow: 20,
//     overflow: 'hidden'
// };

// const StyledDivider = styled(Divider)`
//     width: 90%;
//     margin: 0 auto;
//     opacity: 0.8;
// `;
// // These changes ensure your application handles Google OAuth flow correctly, creates and stores the JWT securely, 
// // and manages the user state effectively without directly using res and req in the client-side code.
// //Frontend (React Component)
// // On the frontend, handle the redirect, 
// // extract the user profile from the URL, and set the user account context.
// // Frontend:

// // Use useEffect to handle user profile extraction from the URL.
// // Parse the user profile and update the user account context.
// // Add the user to the database using the addUser function.
// // Clear the query parameters from the URL after extraction.
// const LoginDialog = () => {
//   const { setAccount } = useContext(AccountContext);
//   const location = useLocation();

//   useEffect(() => {
//       const params = new URLSearchParams(location.search);
//       const profile = params.get('profile');
    
//       if (profile) {
//           const userProfile = JSON.parse(decodeURIComponent(profile));
//           const user = {
//               name: userProfile.displayName || 'Anonymous',
//               email: userProfile.email || '',
//               picture: userProfile.picture || '',
//               sub: userProfile.googleId || ''
//           };

//           setAccount(user); // Correctly set the account
        
//           addUser(user).then(response => {
//               if (response?.msg === 'User already exists') {
//                   toast.info('User already exists in the database.');
//               }
//           });

//           window.history.replaceState(null, '', window.location.pathname);
//       }
//   }, [setAccount, location.search]);

//   const handleLogin = () => {
//       window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
//   };
  
//     return (
//             <Dialog
//                 open={true}
//                 slotProps={{ backdrop: { style: { backgroundColor: 'unset' } } }}
//                 maxWidth={'md'}
//                 PaperProps={{ sx: dialogStyle }}
//             >
//         <Component>
//         <Container>
//         <Title>Use WhatsApp on your computer</Title>
          
//           <StyledList>
//             <ListItem>1. Open WhatsApp on your phone</ListItem>
//             <ListItem>2. Tap Menu on Android, or Settings on  and iPhone</ListItem>
//             <ListItem>3. Tap Linked devices and then Link a device</ListItem>
//             <ListItem>4. Point your phone at this screen to capture the QR code</ListItem>
//           </StyledList>
//           </Container>

//           <Box style={{ position: 'relative' }}>
//           <QRCode src={qrCodeImage} alt="QR Code" />
//           <Box>             
//            <LoginButton onClick={handleLogin} variant="contained">
//            <Google fontSize="medium" />
//                 <LoginButtonText>Log in with Google</LoginButtonText>
//               </LoginButton>
//             </Box>
//           </Box>
//           </Component>
//           <StyledDivider />
//           <ToastContainer />
//       </Dialog>
      
//     );
//   };
  
//   export default LoginDialog;

//=========================================================
//responsive ui:
// import { Dialog, Typography, List, ListItem, Box, Button, styled, useTheme } from '@mui/material';
// import { qrCodeImage } from '../../assets/data.mjs';
// import { useContext, useEffect } from 'react';
// import { useLocation } from "react-router-dom";
// import { AccountContext } from '../../context/AccountProvider';
// import { addUser } from '../../service/api.mjs';
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Component = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   [theme.breakpoints.up('md')]: {
//     flexDirection: 'row',
//   },
//   [theme.breakpoints.up('lg')]: {
//     flexWrap: 'nowrap',
//   },
//   [theme.breakpoints.up('xl')]: {
//     flexWrap: 'nowrap',
//   },
// }));

// const Container = styled(Box)(({ theme }) => ({
//   padding: '2rem 1rem',
//   [theme.breakpoints.up('sm')]: {
//     padding: '4rem 0 4rem 4rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     padding: '5.6rem 0 5.6rem 5.6rem',
//   },
//   [theme.breakpoints.up('lg')]: {
//     padding: '7.6rem 0 7.6rem 7.6rem',
//   },
//   [theme.breakpoints.up('xl')]: {
//     padding: '4rem 0 4rem 4rem',
//   },
// }));

// const QRCode = styled('img')(({ theme }) => ({
//   margin: '2rem auto',
//   height: '13rem',
//   width: '13rem',
//   [theme.breakpoints.up('sm')]: {
//     margin: '3rem 0 0 5rem',
//     height: '15rem',
//     width: '15rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     margin: '1rem auto',
//   },
//   [theme.breakpoints.up('lg')]: {
//     margin: '6rem 0 0 10rem',
//     height: '400px',
//     width: '400px',
//   },
//   [theme.breakpoints.up('xl')]: {
//     margin: '1rem 0 0.5rem 4rem',
//     height: '23rem',
//     width: '23rem',
//   },
// }));

// const Title = styled(Typography)(({ theme }) => ({
//   fontSize: '1.8rem',
//   marginBottom: '1.5rem',
//   color: '#525252',
// fontFamily: 'Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif',
//   fontWeight: 400,
//   [theme.breakpoints.up('sm')]: {
//     fontSize: '1.8rem',
//     marginBottom: '2rem',
//   },
//   [theme.breakpoints.up('md')]: {
    
//     marginBottom: '0 auto',
//   },
//   [theme.breakpoints.up('lg')]: {
//     marginBottom: '3.5rem',
//   },
//   [theme.breakpoints.up('xl')]: {
//     marginTop: '1rem',
//     marginBottom: '0.5rem',
//   },
// }));

// const StyledList = styled(List)(({ theme }) => ({
//   '& > li': {
//     padding: '0',
//     marginTop: '1rem',
//     fontFamily: 'Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif',
//     fontSize: '1rem',
//     lineHeight: '1.5rem',
//     color: '#4a4a4a',
//     textAlign: 'center',
//     [theme.breakpoints.up('sm')]: {
//       fontSize: '1.2rem',
//       marginTop: '1.2rem',
//       lineHeight: '1.8rem',
//       textAlign: 'left',
//     },
//     [theme.breakpoints.up('md')]: {
//       fontSize: '1.3rem',
//     },
//     [theme.breakpoints.up('lg')]: {
//       fontSize: '1.6rem',
//       marginTop: '2rem',
//       lineHeight: '2.5rem',
//     },
//     [theme.breakpoints.up('xl')]: {
//       fontSize: '1.4rem',
//       marginTop: '2.5rem',
//       lineHeight: '2rem',
//     },
//   },
// }));

// const dialogStyle = (theme) => ({
//     // xs (extra-small): 0px and up
//   marginTop: '2%',
//   height: '75%',
//   width: '80%',
//   maxWidth: '100%',
//   maxHeight: '100%',
//   borderRadius: 1,
//   boxShadow: '1rem',
//   overflow: 'hidden',
// //   sm (small): 600px and up
//   [theme.breakpoints.up('sm')]: {
//     height: '80%',
//     width: '100%',
//   },
// //   md (medium): 900px and up
//   [theme.breakpoints.up('md')]: {
//     height: '80%',
//     width: '80%',
//   },
// //   lg (large): 1200px and up
//   [theme.breakpoints.up('lg')]: {
//     height: '85%',
//     width: '100%',
//   },
// //   xl (extra-large): 1536px and up
//   [theme.breakpoints.up('xl')]: {
//     height: '90%',
//     width: '52%',
//   },
// });
// // These changes ensure your application handles Google OAuth flow correctly, creates and stores the JWT securely, 
// // and manages the user state effectively without directly using res and req in the client-side code.
// //Frontend (React Component)
// // On the frontend, handle the redirect, 
// // extract the user profile from the URL, and set the user account context.
// // Frontend:

// // Use useEffect to handle user profile extraction from the URL.
// // Parse the user profile and update the user account context.
// // Add the user to the database using the addUser function.
// // Clear the query parameters from the URL after extraction.
// const LoginDialog = () => {
//     const { setAccount } = useContext(AccountContext);
//     const location = useLocation();
  
//     useEffect(() => {
//       const params = new URLSearchParams(location.search);
//       const profile = params.get('profile');
      
//       if (profile) {
//         const userProfile = JSON.parse(decodeURIComponent(profile));
//         const user = {
//           name: userProfile.displayName || 'Anonymous',
//           email: userProfile.email || '',
//           picture: userProfile.picture || '',
//           sub: userProfile.googleId || ''
//         };
  
//         setAccount(user); // Correctly set the account
          
//         addUser(user).then(response => {
//           if (response?.msg === 'User already exists') {
//             toast.info('User already exists in the database.');
//           }
//         });
  
//         window.history.replaceState(null, '', window.location.pathname);
//       }
//     }, [setAccount, location.search]);
  
//     const handleLogin = () => {
//       window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
//     };
    
//     const theme = useTheme();

//   return (
//     <Dialog
//       open={true}
//       slotProps={{ backdrop: { style: { backgroundColor: 'unset' } } }}
//       maxWidth={'md'}
//       PaperProps={{ sx: dialogStyle(theme) }}
//     >
//       <Component>
//         <Container>
//           <Title>Use WhatsApp on your computer:</Title>
          
//           <StyledList>
//             <ListItem>1. Open WhatsApp on your phone</ListItem>
//             <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
//             <ListItem>3. Tap Linked devices and then Link a device</ListItem>
//             <ListItem>4. Point your phone at this screen to capture the QR code</ListItem>
//           </StyledList>
//           </Container>

//           <Box style={{ position: 'relative' }}>
//             <QRCode src={qrCodeImage} alt="QR Code" />
//             <Box style={{ position: 'absolute', top: '50%', transform: 'translateX(110%) translateY(-25%)' }}>             
//               <Button onClick={handleLogin} variant="contained" color="primary">
//                 Log in with Google
//               </Button>
//             </Box>
//           </Box>
//         </Component>
//         <ToastContainer />
//       </Dialog>
//   );
// };

// export default LoginDialog;
  //================================================================================================
 

//=========================================================before using redirects:

// const LoginDialog = () => {
//     const { setAccount } = useContext(AccountContext);

//     // we dont work with res,req, we work with redirects!! need to be fixed:because we work with 3 party authentication
//     const onLoginSuccess = async (res) => {
//         // Redirect to Google authentication route
//         window.location.href = 'http://localhost:8000/auth/google';

//         // Decode the JWT token
//         const decoded = jwtDecode(res.credential);
        
//         // Set account in context
//         setAccount(decoded);
        
//         // Add user to the database
//         await addUser(decoded);
        
//         // Log decoded token
//         console.log(decoded);
//     };

//     return (
//         <Dialog
//             open={true}
//             PaperProps={{ sx: dialogStyle }}
//             hideBackdrop={true}
//         >
//             <Component>
//                 <Container>
//                     <Title>To use WhatsApp on your computer:</Title>
//                     <StyledList>
//                         <ListItem>1. Open WhatsApp on your phone</ListItem>
//                         <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
//                         <ListItem>3. Point your phone to this screen to capture the code</ListItem>
//                     </StyledList>
//                 </Container>
//                 <Box style={{ position: 'relative' }}>
//                     <QRCode src={qrCodeImage} alt="QR Code" />
//                     <Box style={{ position: 'absolute', top: '50%', transform: 'translateX(25%) translateY(-25%)' }}>
//                         <Button onClick={onLoginSuccess} variant="contained" color="primary">
//                             Log in with Google
//                         </Button>
//                     </Box>
//                 </Box>
//             </Component>
//         </Dialog>
//     );
// };

// export default LoginDialog;

//=========================================================21/05/24





// ==========================================
// WORKING CODE NO PASSPORT.JS:

// import { useContext } from 'react';

// import { Dialog, Typography, List, ListItem, Box, styled } from '@mui/material';
// import { qrCodeImage } from '../../constants/data';
// import { AccountContext } from '../../context/AccountProvider';

// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
// import { addUser } from '../../service/api';




// const Component = styled(Box)`
//     display: flex; 
//         /* background-color: red; */

// `;

// const Container = styled(Box)`
//     padding: 56px 0 56px 56px;
//     /* background-color: red; */
// `;

// const QRCOde = styled('img')({
//     margin: '50px 0 0 50px',
//     height: 264,
//     width: 264
// });

// const Title = styled(Typography)`
//     font-size: 26px;
//     margin-bottom: 25px;
//     color: #525252;
//     font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;
//     font-weight: 300;
// `;

// const StyledList = styled(List)`
//     &  > li {
//         padding: 0;
//         margin-top: 15px;
//         font-size: 18px;
//         line-height: 28px;
//         color: #4a4a4a;

//     }
// `;

// const dialogStyle = {
//     marginTop: '12%',
//     height: '95%',
//     width: '60%',
//     maxWidth: '100',
//     maxHeight: '100%',
//     borderRadius: 0,
//     boxShadow: 'none',
//     overflow: 'hidden'
// }

// const LoginDialog = () => {

//     const { setAccount } = useContext(AccountContext);

//     const onLoginSuccess = async (res) => {
    
//           const decoded = jwtDecode(res.credential);
//         //   console.log('Decoded Token:', decoded);
//           setAccount(decoded);
//           await addUser(decoded);
        
       
     
// //        const token = "eyJ0eXAiO.../// jwt token"; ((DONT START IT))
// // const decoded = jwtDecode(token);

// // console.log(decoded);

//     };

//     const onLoginError = (res) => {
//         console.log('Login Failed:', res);
//     };

//     // const onSignoutSuccess = () => { ((DONT START IT))
//     //     alert("You have been logged out successfully");
//     //     console.clear();
//     //     setShowloginButton(true);
//     //     setShowlogoutButton(false);
//     // };

//     return (
//         <Dialog
//             open={true}
//             PaperProps={{ sx: dialogStyle }}
//             // hide back shadow/opacity:
//             hideBackdrop={true}
//         >
//             <Component>
//                 <Container>
//                     <Title>To use WhatsApp on your computer:</Title>
//                     <StyledList>
//                         <ListItem>1. Open WhatsApp on your phone</ListItem>
//                         <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
//                         <ListItem>3. Point your phone to this screen to capture the code</ListItem>
//                     </StyledList>
//                 </Container>
//                 <Box style={{position:'relative'}}>
//                     <QRCOde src={qrCodeImage} alt="QR Code" />
//                     <Box style={{position: 'absolute', top: '50%', transform: 'translateX(25%) translateY(-25%)'}}>
//                             <GoogleLogin
//                                 onSuccess={onLoginSuccess}
//                                 onError={onLoginError}
//                             /> 
//                     </Box>
//                 </Box>
//             </Component>
//         </Dialog>
//     )
// }

// export default LoginDialog;