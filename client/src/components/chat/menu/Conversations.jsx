import { useEffect, useState, useContext, useCallback } from "react";
import React from "react";
// import PropTypes from 'prop-types'; // Import PropTypes
import { Box, styled, Divider, Typography } from "@mui/material";

import { getUsers } from "../../../service/api";
import { AccountContext } from "../../../context/AccountProvider";

import PropTypes from 'prop-types'; // Import PropTypes

//components:
import Conversation from "./Conversation";

const Component = styled(Box)`
  overflow: overlay;
  height: 81vh;
  /* width: 100vw; */
`;

const StyledDivider = styled(Divider)`
  margin: 0 0.5rem 0 5rem;
  background-color: #e9edef;
  opacity: 0.6;
`;



const Conversations = ({ text }) => {
  const [users, setUsers] = useState([]);
  const { account, socket, setActiveUsers, newMessageFlag } = useContext(AccountContext);

  const fetchData = useCallback(async () => {
    try {
      const response = await getUsers();
      const filteredData = response.filter(user =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );

      const uniqueUsers = Array.from(new Set(filteredData.map(user => user.sub)))
        .map(sub => filteredData.find(user => user.sub === sub))
        .filter(user => user.sub !== account.sub);

      setUsers(uniqueUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [text, account.sub]);

  useEffect(() => {
    fetchData();
  }, [fetchData, newMessageFlag]);

  useEffect(() => {
    const currentSocket = socket.current; // store the value of socket.current
    currentSocket.emit("addUsers", account);
    currentSocket.on("getUsers", (users) => {
      setActiveUsers(users);
      fetchData();
    });
  
    currentSocket.on("getMessage", () => {
      fetchData(); // refresh user list when a new message is received
    });
  
    return () => {
      currentSocket.off("getUsers");
      currentSocket.off("getMessage");
    };
  }, [account, socket, setActiveUsers, fetchData]);


  return (
    <Component>
      {users.length === 0 ? (
        <Typography>No users found.</Typography>
      ) : (
        users.map(user => (
          <React.Fragment key={user.sub}>
            <Conversation user={user} />
            <StyledDivider />
          </React.Fragment>
        ))
      )}
    </Component>
  );
};

Conversations.propTypes = {
  text: PropTypes.string.isRequired
};

export default Conversations;

// // Define PropTypes
// Conversations.propTypes = {
//     text: PropTypes.string, // `text` should be a string
// };









//code with sockets:

// import { useEffect, useState, useContext } from "react";
// import React from "react";
// // import PropTypes from 'prop-types'; // Import PropTypes
// import { Box, styled, Divider } from "@mui/material";

// import { getUsers } from "../../../service/api";
// import { AccountContext } from "../../../context/AccountProvider";

// //components:
// import Conversation from "./Conversation";

// const Component = styled(Box)`
//   overflow: overlay;
//   height: 81vh;
//   /* width: 100vw; */
// `;

// const StyledDivider = styled(Divider)`
//   margin: 0 0 0 70px;
//   background-color: #e9edef;
//   opacity: 0.6;
// `;
// const Conversations = ({ text }) => {
//   const [users, setUsers] = useState([]);
//   const { account, socket, setActiveUsers } = useContext(AccountContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       let response = await getUsers();
//       const filteredData = response.filter((user) =>
//         user.name.toLowerCase().includes(text.toLowerCase()));
//       setUsers(filteredData);
//     };
//     fetchData();
//   }, [text]);

//   useEffect(() => {
//     socket.current.emit("addUsers", account);
//     socket.current.on("getUsers", (users) => {
//       setActiveUsers(users);
//     });
//   }, [account]);
//   return (
//     <Component>
//             {
//             users.map(user =>
//                 user.sub !== account.sub && (
//                     <React.Fragment key={user.sub}>
//                     <Conversation user={user} />
//                     <StyledDivider />
//                     </React.Fragment>
//                 )
//             )}
//     </Component>
//   );
// };

// export default Conversations;




// // Define PropTypes
// Conversations.propTypes = {
//     text: PropTypes.string, // `text` should be a string
// };
