import { useContext } from "react";
import { Box, styled, Typography } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import PropTypes from "prop-types";

import { formatDate, downloadMedia } from "../../../utils/common-utils.mjs";
import { AccountContext } from "../../../context/AccountProvider";
import { iconPDF } from "../../../assets/data.mjs";

const Own = styled(Box)(({ theme }) => ({
  background: '#dcf8c6',
  padding: '0.5rem',
  maxWidth: '60%',
  width: 'fit-content',
  marginLeft: 'auto',
  display: 'flex',
  borderRadius: '0.8rem',
  wordBreak: 'break-word',
  position: 'relative',
  marginBottom: '1rem',
  [theme.breakpoints.down('md')]: { // 900px and below
    maxWidth: '80%',
    padding: '0.4rem',
  },
  [theme.breakpoints.down('sm')]: { // 600px and below
    flexDirection: 'column',
    flexWrap: 'nowrap',
    // alignItems: 'center',
    // justifyContent: 'center',
    // minWidth: '100%',
    minWidth: '90%',
    padding: '0.3rem',
    // textAlign: 'left',
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  background: '#ffffff',
  padding: '0.5rem',
  maxWidth: '60%',
  width: 'fit-content',
  display: 'flex',
  borderRadius: '0.8rem',
  wordBreak: 'break-word',
  position: 'relative',
  marginBottom: '1rem',
  [theme.breakpoints.down('md')]: { // 900px and below
    maxWidth: '80%',
    padding: '0.4rem',
  },
  [theme.breakpoints.down('sm')]: { // 600px and below
    flexDirection: 'column',
    flexWrap: 'nowrap',
    minWidth: '100%',
    // padding: '0.4rem',
    whiteSpace: 'normal', // Ensure text wraps correctly
    // textAlign: 'left',
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  padding: '0 2.5rem 0 0.5rem',
  [theme.breakpoints.down('md')]: { // 900px and below
    fontSize: '1.2rem',
    padding: '0 1.5rem 0 0.4rem',
  },
  [theme.breakpoints.down('sm')]: { // 600px and below
    fontSize: '0.8rem',
    padding: '0 1rem 0 0.3rem',
  },
}));

const Time = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#919191',
  // marginTop: '0.6rem',
  wordBreak: 'keep-all',
  marginTop: 'auto',
  [theme.breakpoints.down('md')]: { // 900px and below
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('sm')]: { // 600px and below
    fontSize: '0.7rem',
    textAlign: 'right',
  },
}));

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
          style={{ width: '100%', maxWidth: 300, height: 'auto', objectFit: 'cover' }}
          src={text}
          alt={text.split("/").pop()}
        />
      )}
      <Time style={{ position: "absolute", bottom: 0, right: 0 }}>
        <GetAppIcon
          onClick={(e) => downloadMedia(e, text)}
          style={{
            cursor: 'pointer',
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

//without responsive 08/06/24:
// import { useContext } from "react";

// import { Box, styled, Typography } from "@mui/material";
// import GetAppIcon from "@mui/icons-material/GetApp";

// import { formatDate, downloadMedia } from "../../../utils/common-utils.mjs";
// import { AccountContext } from "../../../context/AccountProvider";
// import { iconPDF } from "../../../assets/data.mjs";

// import PropTypes from "prop-types";

// const Own = styled(Box)`
//   background: #dcf8c6;
//   padding: 0.5rem;
//   max-width: 60%;
//   width: fit-content;
//   margin-left: auto;
//   display: flex;
//   border-radius: 0.8rem;
//   word-break: break-word;
//   position: relative;
//   margin-bottom: 1rem;
//   /* &:after {
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
//   background: #ffffff;
//   padding: 0.5rem;
//   max-width: 60%;
//   width: fit-content;
//   display: flex;
//   border-radius: 0.8rem;
//   word-break: break-word;
//   position: relative;
//   margin-bottom: 1rem;
//   /* &:after {
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
//   font-size: 1.4rem;
//   padding: 0 2.5rem 0 0.5rem;
// `;

// const Time = styled(Typography)`
//   font-size: 1rem;
//   color: #919191;
//   margin-top: 0.6rem;
//   word-break: keep-all;
//   margin-top: auto;
// `;

// const ImageMessage = ({ message }) => {
//   const text = message.text || ""; // Fallback to an empty string if text is undefined

//   return (
//     <Box style={{ position: "relative" }}>
//       {text.includes(".pdf") ? (
//         <Box style={{ display: "flex" }}>
//           <img src={iconPDF} alt="pdf" style={{ width: 80 }} />
//           <Typography style={{ fontSize: 14 }}>
//             {text.split("/").pop()}
//           </Typography>
//         </Box>
//       ) : (
//         <img
//           style={{ width: 300, height: "100%", objectFit: "cover" }}
//           src={text}
//           alt={text.split("/").pop()}
//         />
//       )}
//       <Time style={{ position: "absolute", bottom: 0, right: 0 }}>
//         <GetAppIcon
//           onClick={(e) => downloadMedia(e, text)}
//           style={{
//             marginRight: 10,
//             border: "0.1rem solid grey",
//             borderRadius: "50%",
//           }}
//           fontSize="small"
//         />
//         {formatDate(message.createdAt)}
//       </Time>
//     </Box>
//   );
// };

// ImageMessage.propTypes = {
//   message: PropTypes.shape({
//     text: PropTypes.string,
//     createdAt: PropTypes.string.isRequired,
//   }).isRequired,
// };

// const TextMessage = ({ message }) => {
//   const text = message.text || "No text available";

//   return (
//     <>
//       <Text>{text}</Text>
//       <Time>{formatDate(message.createdAt)}</Time>
//     </>
//   );
// };

// TextMessage.propTypes = {
//   message: PropTypes.shape({
//     text: PropTypes.string,
//     createdAt: PropTypes.string.isRequired,
//   }).isRequired,
// };

// const Message = ({ message }) => {
//   const { account } = useContext(AccountContext);
//   const isOwnMessage = message.senderId === account.sub;

//   const MessageBox = isOwnMessage ? Own : Wrapper;

//   return (
//     <MessageBox>
//       {message.type === "file" ? (
//         <ImageMessage message={message} />
//       ) : (
//         <TextMessage message={message} />
//       )}
//     </MessageBox>
//   );
// };

// Message.propTypes = {
//   message: PropTypes.shape({
//     senderId: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     text: PropTypes.string,
//     createdAt: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default Message;