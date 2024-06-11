// import { useContext, useState } from "react";
// import { Box, styled } from "@mui/material";
// import { Chat as MessageIcon } from "@mui/icons-material";
// import { AccountContext } from "../../../context/AccountProvider";
// import InfoDrawer from "../../drawer/infoDrawer";

// const VerticalBar = styled(Box)`

//   position: absolute; // The sidebar is positioned absolutely
//   background: #e5a8a8;
//   width: 60px; // Fixed width for the sidebar
//   height: 100vh; // Full height
//   padding: 16px 8px; // Padding for spacing
//   top: 0; // Positions at the top of the parent container
//   left: 0; // Positions at the left of the parent container
  
// `;

// const VerticalWrapper = styled(Box)`
//   display: flex;
//   flex-direction: column; // Vertical layout
//   align-items: center; // Center-aligns horizontally
//   /* gap: 16px; // Space between elements */
//   height: 90%;
// `;

// const VerticalIcon = styled(MessageIcon)`
//   font-size: 2.2rem;
//   color: #000;
//   cursor: pointer; // Changes cursor on hover
//   &:hover {
//     color: #ff0000; // Optional hover effect
//   }
// `;

// const ProfileImage = styled("img")`
//   height: 40px;
//   width: 40px;
//   border-radius: 50%; // Circular profile image
//   border: 2px solid red; // Optional border for styling
//   cursor: pointer;
//   transform: translateX(19%); // Corrects centering

// `;

// const VerticalSideBar = () => {
//   const { account } = useContext(AccountContext);
//   const [openDrawer, setOpenDrawer] = useState(false);

//   const toggleDrawer = () => {
//     setOpenDrawer(true);
//   };

//   return (
//     <VerticalBar>
//       {/* Elements at the top */}
//       <VerticalWrapper>
//         <VerticalIcon onClick={toggleDrawer} />
//         {/* Additional elements at the top can be added here */}
//       </VerticalWrapper>

//       {/* Image positioned at the bottom */}
//       <ProfileImage
//         src={account.picture}
//         alt="Profile"
//         onClick={toggleDrawer}
//       />

//       <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
//     </VerticalBar>
//   );
// };

// export default VerticalSideBar;

