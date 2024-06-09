import { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { MoreVert } from '@mui/icons-material';
import { Menu, MenuItem, styled } from '@mui/material';

import { AccountContext } from '../../../context/AccountProvider'; 

import { useNavigate } from 'react-router-dom';



const MenuOption = styled(MenuItem)`
    font-size: 1.4rem;
    padding: 1.5rem 6rem 0.5rem 2.4rem;
    color: #4A4A4A;
`;

const HeaderMenu = ({ setOpenDrawer }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { logout } = useContext(AccountContext);
    const navigate = useNavigate(); 

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    //logout::::
    const handleLogout = () => {
        handleClose();
        logout();
        navigate('/'); // redirect to login page
    };

    return (
        <>
            <MoreVert onClick={handleClick} style={{ cursor: 'pointer' }}/>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuOption onClick={() => { handleClose(); setOpenDrawer(true); }}>Profile</MenuOption>
                
                <MenuOption onClick={handleLogout}>Log out</MenuOption>
            </Menu>
        </>
    );
};


HeaderMenu.propTypes = {
    setOpenDrawer: PropTypes.func.isRequired,
};

export default HeaderMenu;