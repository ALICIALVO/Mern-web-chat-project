import { useContext } from "react";
import { Box, styled, Typography } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import PropTypes from "prop-types";
import { formatDate, downloadMedia } from "../../../utils/common-utils.mjs";
import { iconPDF } from "../../../assets/data.mjs";

import { AccountContext } from "../../../context/AccountProvider";


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
              style={{
                width: "100%",
                maxWidth: 300,
                height: "auto",
                objectFit: "cover",
                }}
                src={text}
                alt={text.split("/").pop()}
                />
                )}
            <Time style={{ position: "absolute", bottom: 0, right: 0 }}>
              <GetAppIcon
                onClick={(e) => downloadMedia(e, text)}
                style={{
                  cursor: "pointer",
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
  
  
const TextMessage = ({ message }) => {
    
    const text = message.text || "No text available";
    
    return (
      <>
      <Text>{text}</Text>
      <Time>{formatDate(message.createdAt)}</Time>
    </>
  );
  };
  
  
export default Message;
  
  
Message.propTypes = {
  message: PropTypes.shape({
    senderId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

ImageMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

TextMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

//styles:

const Own = styled(Box)(({ theme }) => ({
  background: "#dcf8c6",
  padding: "0.5rem",
  maxWidth: "60%",
  width: "fit-content",
  marginLeft: "auto",
  display: "flex",
  borderRadius: "0.8rem",
  wordBreak: "break-word",
  position: "relative",
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    // 900px and below
    maxWidth: "80%",
    padding: "0.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    // 600px and below
    flexDirection: "column",
    flexWrap: "nowrap",
    minWidth: "90%",
    padding: "0.3rem",
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  background: "#ffffff",
  padding: "0.5rem",
  maxWidth: "60%",
  width: "fit-content",
  display: "flex",
  borderRadius: "0.8rem",
  wordBreak: "break-word",
  position: "relative",
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    // 900px and below
    maxWidth: "80%",
    padding: "0.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    // 600px and below
    flexDirection: "column",
    flexWrap: "nowrap",
    minWidth: "100%",
    whiteSpace: "normal", 
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  padding: "0 2.5rem 0 0.5rem",
  [theme.breakpoints.down("md")]: {
    // 900px and below
    fontSize: "1.2rem",
    padding: "0 1.5rem 0 0.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    // 600px and below
    fontSize: "0.8rem",
    padding: "0 1rem 0 0.3rem",
  },
}));

const Time = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: "#919191",
  // marginTop: '0.6rem',
  wordBreak: "keep-all",
  marginTop: "auto",
  [theme.breakpoints.down("md")]: {
    // 900px and below
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    // 600px and below
    fontSize: "0.7rem",
    textAlign: "right",
  },
}));