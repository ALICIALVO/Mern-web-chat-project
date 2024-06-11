import { useContext } from "react";
import { Box, Typography, styled } from "@mui/material";

import { AccountContext } from "../../context/AccountProvider";


const Profile = () => {

  const { account } = useContext(AccountContext);

  return (

    <>
      <ImageContainer>
        <Image src={account.picture} alt="dp" />
      </ImageContainer>
      <BoxWrapper>
        <Typography>YOUR NAME</Typography>
        <Typography>{account.name}</Typography>
      </BoxWrapper>
      <DescriptionContainer>
        <Typography>
          This is not your username or pin. This name will be visible to your
          WhatsApp contacts.
        </Typography>
      </DescriptionContainer>
      <BoxWrapper>
        <Typography>About</Typography>
        <Typography>Eat! Sleep! Code! Repeat</Typography>
      </BoxWrapper>
    </>
    
  );
};

export default Profile;

//styles:

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;

const Image = styled("img")({
  width: 200,
  height: 200,
  borderRadius: "50%",
  padding: 25,
});

const BoxWrapper = styled(Box)`
  background: #ffffff;
  padding: 1.2rem 3rem 0.2rem;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.08);
  & :first-of-type {
    font-size: 1.3rem;
    color: #009688;
    font-weight: 200;
  }
  & :last-child {
    margin: 1.4rem 0;
    color: #4a4a4a;
  }
`;

const DescriptionContainer = styled(Box)`
  padding: 1.5rem 0.2rem 2.8rem 3rem;
  & > p {
    color: #8696a0;
    font-size: 1.3rem;
  }
`;