import {emptyChatImage } from '../../../assets/data';

import { Box, Typography, styled, Divider } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';


const EmptyChat = () => {
    
    return(
        <Component>
            <Container>
            <Image src= {emptyChatImage} alt='image' />
            <Title>whatsapp web</Title>
            <SubTitle>Send and receive messages without keeping your phone online.</SubTitle>
            <SubTitle>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</SubTitle>
            <StyledDivider />
            <End2endmsg>
            Your personal messages are end-to-end encrypted
            <Lockicon />
            </End2endmsg>
            </Container>
        </Component>
    );
}

export default EmptyChat;

//styles:

const Component = styled(Box)`
    background: #f8f9fa;
    padding: 3rem 0;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const Container = styled(Box)`
    font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif;
`;

const Image = styled('img')({
    marginTop: 150,
    width: 400
});

const Title = styled(Typography)`
    font-size: 3rem;
    margin: 2.5rem 0 1rem 0;
    font-weight: 300;
    color: #41525d;
`;

const SubTitle = styled(Typography)`
    font-size: 1rem;
    color: #667781;
    font-weight: 400;
    text-align: center;

`;

const StyledDivider = styled(Divider)`
    margin: 4rem 0;
    opacity: 0.4;
`;

const End2endmsg = styled(Typography)`
    display: flex;
    flex-direction: row-reverse;
    width: fit-content;
    margin: 0 auto;
    opacity: 0.5;
`;

const Lockicon = styled(LockIcon)`
    width: 1.5rem;
    height: 1rem;
    opacity: 0.5;
`;