import { createContext, useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types'; 

import { io } from 'socket.io-client';

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState(null); // Ensure initial state is null
    const [person, setPerson] = useState({});
    const [activeUsers, setActiveUsers] = useState([]); 
    const [newMessageFlag, setNewMessageFlag] = useState(false); 
    const [conversation, setConversation] = useState(null); // Add conversation state


    const socket = useRef();

    useEffect(() => {  
        const webSocketUrl = import.meta.env.VITE_WEBSOCKET_URL;
                socket.current = io(webSocketUrl);
            }, []); 


            //logout::::
            const logout = () => {
                // Clear the token from cookies
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
                // Reset the account state
                setAccount(null);
            };

    return (
        <AccountContext.Provider
            value={{
                account,
                setAccount,
                person,
                socket,
                setPerson,
                activeUsers,
                setActiveUsers,
                newMessageFlag,
                setNewMessageFlag,
                conversation,
                setConversation,
                logout, // Add logout to context
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
AccountProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensures 'children' is required and is of any valid React node type
};


// code with sockets:
// import { createContext, useState, useRef, useEffect } from 'react';
// import { io } from 'socket.io-client';
// // import PropTypes from 'prop-types'; // Importing prop-types to define prop types

// export const AccountContext = createContext(null);

// const AccountProvider = ({ children }) => {
//     const [account, setAccount] = useState(null); // Ensure initial state is null
//     const [person, setPerson] = useState({});
//     const [activeUsers, setActiveUsers] = useState([]); 
//     const [newMessageFlag, setNewMessageFlag] = useState(false); 

//     const socket = useRef();

//     useEffect(() => {  
//         socket.current = io('ws://localhost:9000');
//     }, []); 

//     return (
//         <AccountContext.Provider
//             value={{
//                 account,
//                 setAccount,
//                 person,
//                 setPerson,
//                 socket,
//                 activeUsers,
//                 setActiveUsers,
//                 newMessageFlag,
//                 setNewMessageFlag
//             }}
//         >
//             {children}
//         </AccountContext.Provider>
//     );
// };

// export default AccountProvider;

// AccountProvider.propTypes = {
//     children: PropTypes.node.isRequired, // Ensures 'children' is required and is of any valid React node type
// };

// Define prop types for the component






//========================================================================================================
// correct code no passport.js no jwt:
// import { createContext, useState, useRef, useEffect } from 'react';


// import { io } from 'socket.io-client';
// // import PropTypes from 'prop-types'; // Importing prop-types to define prop types

// export const AccountContext = createContext(null);

// const AccountProvider = ({ children }) => {
//     const [account, setAccount] = useState();
//     const [person, setPerson] = useState({});
//     const [activeUsers, setActiveUsers] = useState([]); 
//     const [newMessageFlag, setNewMessageFlag] = useState(false); 


//     const socket = useRef();

//     useEffect(() => {  
//         socket.current = io('ws://localhost:9000')
//     }, []); 

//     return (
//         <AccountContext.Provider
//             value={{
//                 account,
//                 setAccount,
//                 person,
//                 setPerson,
//                 socket,
//                 activeUsers,
//                 setActiveUsers,
//                 newMessageFlag,
//                 setNewMessageFlag
//             }}
//         >
//             {children}
//         </AccountContext.Provider>
//     );
// };

// // Define prop types for the component
// // AccountProvider.propTypes = {
// //     children: PropTypes.node.isRequired, // Ensures 'children' is required and is of any valid React node type
// // };

// export default AccountProvider;