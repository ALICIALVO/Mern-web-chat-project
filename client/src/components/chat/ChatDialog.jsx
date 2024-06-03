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
`;

const LeftComponent = styled(Box)`
  min-width: 35rem;
`;

const RightComponent = styled(Box)`
  width: 100%;
min-width: 40rem;
/* height: 100%; */
border-left: 0.1rem solid rgba(0,0,0,0.1);
`;

const dialogStyle = {
 width: '100%',
 maxWidth: '100%',
 maxHeight: '100%',
 borderRadius: 0,
 boxShadow: 'none',
 overflow: 'hidden'
  }

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