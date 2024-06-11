import { useContext, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Dialog, Typography, List, ListItem, Box, Button, styled } from '@mui/material';
// import { Dialog, Typography, List, ListItem, Box, Button, styled, Divider } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { qrCodeImage } from '../../assets/data.mjs';
import { addUser } from '../../service/api.mjs';

import { AccountContext } from '../../context/AccountProvider';

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

//styles:

const Component = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'nowrap',
  
  [theme.breakpoints.down('md')]: { // 900px
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: '1rem',
  },
  
  [theme.breakpoints.down('sm')]: { // 600px
      padding: '0.5rem',
  },
}));

const Container = styled(Box)(({ theme }) => ({
  padding: '3.5rem 0 5rem 2.8rem',

  [theme.breakpoints.down('md')]: { // 900px
      textAlign: 'center',
      
  },

  [theme.breakpoints.down('sm')]: { // 600px
      textAlign: 'center',
      padding: '1rem 0',
  },
}));

const QRCodeContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  margin: '3rem 2rem 0 0',

  [theme.breakpoints.down('md')]: { // 900px
    margin: '0 auto',
  },
}));

const QRCode = styled('img')(({ theme }) => ({
  height: 280,
  width: 280,

  [theme.breakpoints.down('sm')]: { // 600px
      height: 250,
      width: 250,
  }
}));

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f0f2f5',
  color: '#2aa884',
  position: 'absolute',
  top: '50%',
  '&:hover': {
      backgroundColor: '#f0f2f5',
      boxShadow: '0.8rem 0.5rem 1rem #2aa884ae',
  },

  [theme.breakpoints.down('md')]: { // 900px
    top: '65%',
  },
}));

const LoginButtonText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif',
  paddingLeft: '0.5rem',
  fontWeight: 500,
  fontSize: '1rem',

  [theme.breakpoints.down('md')]: { // 900px and below
      fontSize: '0.9rem',
      whiteSpace: 'nowrap',
  },
  [theme.breakpoints.down('sm')]: { // 600px and below
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