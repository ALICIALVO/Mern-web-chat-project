import PropTypes from 'prop-types';

import { Box, Drawer, Typography, styled } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
// import zIndex from '@mui/material/styles/zIndex';

//componenets:
import Profile from './Profile';

const Header = styled(Box)`
    background: #008069;
    height: 4rem;
    color: #ededed;
    display: flex;
    & > svg, & > p {
        margin: auto 0;
        padding: 0.5rem;
        font-weight: 500;
    }
`;

const Component = styled(Box)`
    background-color: #ededed;
    height: 100%;
`;

const Text = styled(Typography)`
    font-size: 1.8rem;
`

const drawerStyle = {
    left: 20,
    top: 17, 
    height: '95%',
    width: '30%',
    boxShadow: 'none'
} 
    


const InfoDrawer = ({open, setOpen}) => { //{ {open: true, setOpen: function(), ...100} = props
    
    const handleClose = () => {
        setOpen(false);
    }
    
    
    return(
        <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{sx: drawerStyle}}
        style={{zIndex: 1500}}
        
      >
        <Header>
            <ArrowBack onClick={() => setOpen(false)} style={{cursor: 'pointer'}}/>
            <Text>Profile</Text>
        </Header>
        <Component>
        <Profile />
        </Component>
      </Drawer>
    )
}


InfoDrawer.propTypes = {
    open: PropTypes.bool.isRequired, 
    setOpen: PropTypes.func.isRequired,
  };

export default InfoDrawer;