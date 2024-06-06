import { useContext } from "react";

import { Box, styled, Typography } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";

import { formatDate, downloadMedia } from "../../../utils/common-utils.mjs";
import { AccountContext } from "../../../context/AccountProvider";
import { iconPDF } from "../../../assets/data.mjs";

import PropTypes from "prop-types";

const Own = styled(Box)`
  background: #dcf8c6;
  padding: 0.5rem;
  max-width: 60%;
  width: fit-content;
  margin-left: auto;
  display: flex;
  border-radius: 0.8rem;
  word-break: break-word;
  position: relative;
  margin-bottom: 1rem;
  /* &:after {
        content: '';
        position: absolute;
        top: 0.3rem;
        right: -0.7rem;
        width: 1rem;
        height: 1rem;
        background: #dcf8c6;
        transform: rotate(45deg);
        border-top-right-radius: 0.2rem;
    } */
`;
const Wrapper = styled(Box)`
  background: #ffffff;
  padding: 0.5rem;
  max-width: 60%;
  width: fit-content;
  display: flex;
  border-radius: 0.8rem;
  word-break: break-word;
  position: relative;
  margin-bottom: 1rem;
  /* &:after {
        content: '';
        position: absolute;
        top: -0.1rem;
        left: 0.1rem;
        width: 1rem;
        height: 1rem;
        background: #FFFFFF;
        transform: rotate(85deg);
        border-top-left-radius: 8rem;
    } */
`;

const Text = styled(Typography)`
  font-size: 1.4rem;
  padding: 0 2.5rem 0 0.5rem;
`;

const Time = styled(Typography)`
  font-size: 1rem;
  color: #919191;
  margin-top: 0.6rem;
  word-break: keep-all;
  margin-top: auto;
`;

const ImageMessage = ({ message }) => {
  const text = message.text || ""; // Fallback to an empty string if text is undefined

  return (
    <Box style={{ position: "relative" }}>
      {text.includes(".pdf") ? (
        <Box style={{ display: "flex" }}>
          <img src={iconPDF} alt="pdf" style={{ width: 80 }} />
          <Typography style={{ fontSize: 14 }}>
            {text.split("/").pop()}
          </Typography>
        </Box>
      ) : (
        <img
          style={{ width: 300, height: "100%", objectFit: "cover" }}
          src={text}
          alt={text.split("/").pop()}
        />
      )}
      <Time style={{ position: "absolute", bottom: 0, right: 0 }}>
        <GetAppIcon
          onClick={(e) => downloadMedia(e, text)}
          style={{
            marginRight: 10,
            border: "0.1rem solid grey",
            borderRadius: "50%",
          }}
          fontSize="small"
        />
        {formatDate(message.createdAt)}
      </Time>
    </Box>
  );
};

ImageMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

const TextMessage = ({ message }) => {
  const text = message.text || "No text available";

  return (
    <>
      <Text>{text}</Text>
      <Time>{formatDate(message.createdAt)}</Time>
    </>
  );
};

TextMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

const Message = ({ message }) => {
  const { account } = useContext(AccountContext);
  const isOwnMessage = message.senderId === account.sub;

  const MessageBox = isOwnMessage ? Own : Wrapper;

  return (
    <MessageBox>
      {message.type === "file" ? (
        <ImageMessage message={message} />
      ) : (
        <TextMessage message={message} />
      )}
    </MessageBox>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    senderId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;

//CODE WITHOUT LOCAL HOST 28/05/24

// import { useContext } from 'react';

// import { Box, styled, Typography } from '@mui/material';
// import GetAppIcon from '@mui/icons-material/GetApp';

// import { formatDate, downloadMedia, isMedia } from '../../../utils/common-utils.mjs';
// import { AccountContext } from '../../../context/AccountProvider';
// import { iconPDF } from '../../../assets/data.mjs';

// import PropTypes from 'prop-types';

// const Own = styled(Box)`
//     background: #dcf8c6;
//     padding: 0.5rem;
//     max-width: 60%;
//     width: fit-content;
//     margin-left: auto;
//     display: flex;
//     border-radius: 0.8rem;
//     word-break: break-word;
//     position: relative;
//     margin-bottom: 1rem;
//     /* &:after {
//         content: '';
//         position: absolute;
//         top: 0.3rem;
//         right: -0.7rem;
//         width: 1rem;
//         height: 1rem;
//         background: #dcf8c6;
//         transform: rotate(45deg);
//         border-top-right-radius: 0.2rem;
//     } */
// `;
// const Wrapper = styled(Box)`
//      background: #FFFFFF;
//     padding: 0.5rem;
//     max-width: 60%;
//     width: fit-content;
//     display: flex;
//     border-radius: 0.8rem;
//     word-break: break-word;
//     position: relative;
//     margin-bottom: 1rem;
//     /* &:after {
//         content: '';
//         position: absolute;
//         top: -0.1rem;
//         left: 0.1rem;
//         width: 1rem;
//         height: 1rem;
//         background: #FFFFFF;
//         transform: rotate(85deg);
//         border-top-left-radius: 8rem;
//     } */
// `;

// const Text = styled(Typography)`
//     font-size: 1.4rem;
//     padding: 0 2.5rem 0 0.5rem;
// `;

// const Time = styled(Typography)`
//     font-size: 1rem;
//     color: #919191;
//     margin-top: 0.6rem;
//     word-break: keep-all;
//     margin-top: auto;
// `;

// export const Message = ({ message }) => {
//     const { account } = useContext(AccountContext);
//     return (
//         <>
//             {account.sub === message.senderId ? (
//                 <Own>
//                     {isMedia(message.text) ? <ImageMessage message={message} /> : <TextMessage message={message} />}
//                 </Own>
//             ) : (
//                 <Wrapper>
//                     {isMedia(message.text) ? <ImageMessage message={message} /> : <TextMessage message={message} />}
//                 </Wrapper>
//             )}
//         </>
//     );
// };

// Message.propTypes = {
//     message: PropTypes.shape({
//         senderId: PropTypes.string.isRequired,
//         type: PropTypes.string.isRequired,
//         text: PropTypes.string.isRequired,
//         createdAt: PropTypes.string.isRequired,
//     }).isRequired
// };

// const ImageMessage = ({ message }) => {
//     return (
//         <Box style={{ position: 'relative' }}>
//             {message?.text?.includes('.pdf') ? (
//                 <Box style={{ display: 'flex' }}>
//                     <img src={iconPDF} alt='pdf' style={{ width: 80 }} />
//                     <Typography style={{ fontSize: 14 }}>{message.text.split('/').pop()}</Typography>
//                 </Box>
//             ) : (
//                 <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt={message.text} />
//             )}
//             <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
//                 <GetAppIcon
//                     onClick={(e) => downloadMedia(e, message.text)}
//                     style={{ marginRight: 10, border: '0.1rem solid grey', borderRadius: '50%' }}
//                     fontSize='small'
//                 />
//                 {formatDate(message.createdAt)}
//             </Time>
//         </Box>
//     );
// };

// ImageMessage.propTypes = {
//     message: PropTypes.shape({
//         text: PropTypes.string.isRequired,
//         createdAt: PropTypes.string.isRequired
//     }).isRequired
// };

// const TextMessage = ({ message }) => {
//     return (
//         <>
//             <Text>{message.text}</Text>
//             <Time>{formatDate(message.createdAt)}</Time>
//         </>
//     );
// };

// TextMessage.propTypes = {
//     message: PropTypes.shape({
//         text: PropTypes.string.isRequired,
//         createdAt: PropTypes.string.isRequired
//     }).isRequired
// };

// export default Message;

//=========================================================================================================
// with prop types:

// import { useContext } from 'react';
// import { Box, styled, Typography } from '@mui/material';
// import PropTypes from 'prop-types'; // Import PropTypes

// import { formatDate } from '../../../utils/common-utils';
// import { AccountContext } from '../../../context/AccountProvider';

// const Own = styled(Box)`
//     background: #dcf8c6;
//     padding: 5px;
//     max-width: 60%;
//     width: fit-content;
//     margin-left: auto;
//     display: flex;
//     border-radius: 10px;
//     word-break: break-word;
// `;

// const Wrapper = styled(Box)`
//     background: #FFFFFF;
//     padding: 5px;
//     max-width: 60%;
//     width: fit-content;
//     display: flex;
//     border-radius: 10px;
//     word-break: break-word;
// `;

// const Text = styled(Typography)`
//     font-size: 14px;
//     padding: 0 25px 0 5px;
// `;

// const Time = styled(Typography)`
//     font-size: 10px;
//     color: #919191;
//     margin-top: 6px;
//     word-break: keep-all;
//     margin-top: auto;
// `;

// export const Message = ({ message }) => {
//     const { account } = useContext(AccountContext);

//     return (
//         <>
//             {account.sub === message.senderId ? (
//                 <Own>
//                     <Text>{message.text}</Text>
//                     <Time>{formatDate(message.createdAt)}</Time>
//                 </Own>
//             ) : (
//                 <Wrapper>
//                     <Text>{message.text}</Text>
//                     <Time>{formatDate(message.createdAt)}</Time>
//                 </Wrapper>
//             )}
//         </>
//     );
// };

// // Define PropTypes for Message component
// Message.propTypes = {
//     message: PropTypes.shape({
//         senderId: PropTypes.string.isRequired, // `senderId` is required
//         text: PropTypes.string.isRequired, // `text` is required
//         createdAt: PropTypes.string.isRequired, // `createdAt` is required
//     }).isRequired,
// };

// export default Message;
