import { useContext } from 'react';

import { Dialog, Box, styled } from "@mui/material";

import { AccountContext } from '../../context/AccountProvider';

// Components
import Menu from './menu/Menu';
import EmptyChat from './chat/EmptyChat';
import ChatBox from './chat/ChatBox';

// Styled components
const Component = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

const LeftComponent = styled(Box)(({ theme }) => ({
  width: '30%',
  minWidth: '20rem',
  backgroundColor: '#f0f0f0',
  [theme.breakpoints.down('md')]: { // 900px and below
    width: '35%',
    minWidth: '15rem',
  },
  [theme.breakpoints.down('sm')]: { // 600px and below
    width: '20%',
    minWidth: '30%',
  },
}));

const RightComponent = styled(Box)(({ theme }) => ({
  width: '70%',
  minWidth: '30rem',
  backgroundColor: '#ffffff',
  borderLeft: '0.1rem solid rgba(0,0,0,0.1)',
  [theme.breakpoints.down('md')]: { // 900px and below
    width: '65%',
    minWidth: '20rem',
  },
  [theme.breakpoints.down('sm')]: { // 600px and below
    width: '80%',
    minWidth: '70%',
    borderLeft: 'none',
  },
}));

const dialogStyle = (theme) => ({
  width: '100%',
  // height: '100%',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: 0,
  boxShadow: 'none',
  overflow: 'hidden',


  [theme.breakpoints.down('md')]: { // 900px
      height: 'auto ',
  },
  [theme.breakpoints.down('sm')]: { // 600px
      height: 'auto ',
      
  },
});

const ChatDialog = () => {
  const { person } = useContext(AccountContext);
  
  return (
      <Dialog
          open={true}
          PaperProps={{ sx: dialogStyle }}
          hideBackdrop={true}
          maxWidth={'md'}
      >
          <Component>
              <LeftComponent>
                  <Menu />
              </LeftComponent>
              <RightComponent>
                  { Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
              </RightComponent>
          </Component>
      </Dialog>
  );
}

export default ChatDialog;



  // useEffect(() => {
  //   console.log('account in ChatDialog:', account);  // Log the account
  // }, [account]);  // Add account to the dependencies

  // console.log('Rendering ChatDialog');  // Log a message before rendering ChatDialog


// //working code no passport.js or jwt:
// import { useContext } from "react";


// import { Dialog, Box, styled } from "@mui/material";

// import { AccountContext } from "../../context/AccountProvider";

// //components:
//  import Menu from "./menu/Menu";
//  import EmptyChat from "./chat/EmptyChat";
//  import ChatBox from "./chat/ChatBox";

//  const Component = styled(Box)`
//     display: flex;
//  `;

//  const LeftComponent = styled(Box)`
//     min-width: 450px;
//  `;

//  const RightComponent = styled(Box)`
//     width: 73%;
//     min-width: 300px;
//     height: 100%;
//     border-left: 1px solid rgba(0,0,0,0.1);

//  `;

// const dialogStyle = {
//     height: '95%',
//     width: '100%',
//     margin: '2rem',
//     maxWidth: '100%',
//     maxHeight: '100%',
//     borderRadius: 0,
//     boxShadow: 'none',
//     overflow: 'hidden'
// }

// const ChatDialog = () => {

//     const { person } = useContext(AccountContext);
//     return(
//         <Dialog
//         open={true}
//         PaperProps={{ sx: dialogStyle }}
//         // hide back shadow/opacity:
//         hideBackdrop={true}
//         maxWidth={'md'}
//         >
//             <Component>
//                 <LeftComponent>
//                     <Menu />
//                 </LeftComponent>
//                 <RightComponent>
//                 {/* //{name: "code"} = id:1 ::*/}
//                 { Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
//                 </RightComponent>
//             </Component>
//         </Dialog>
//     );
// }

// export default ChatDialog;