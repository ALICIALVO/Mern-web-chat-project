import { useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Search, MoreVert } from '@mui/icons-material';
import PropTypes from 'prop-types'; 

import { AccountContext } from '../../../context/AccountProvider';


const ChatHeader = ({ person }) => {

    const { activeUsers } = useContext(AccountContext);

    return (
        <Header>
            <Image src={person.picture} alt="dp" />
            <Box>
                <Name>{ person.name }</Name>
                <Status>{activeUsers?.find(user => user.sub === person.sub) ? 'Online' : 'Offline'}</Status>
            </Box>
            <RightContainer>
                <Search />
                <MoreVert />
            </RightContainer>
        </Header>
    )
}

export default ChatHeader;

ChatHeader.propTypes = {
    person: PropTypes.shape({
        picture: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        sub: PropTypes.string.isRequired
    }).isRequired
};

//styles:

const Header = styled(Box)`
    background: #f0f2f5;
    display: flex;
    padding: 0.2rem 1.6rem;
    align-items: center;
`;

const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
});

const Name = styled(Typography)`
    margin-left: 1.2rem !important;
`;

const Status = styled(Typography)`
    font-size: 1rem !important;
    color: rgb(0, 0, 0, 0.6);
    margin-left: 1.2rem !important;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        padding: 0.8rem;
        font-size: 2rem;
        color: #000;
    }
`;