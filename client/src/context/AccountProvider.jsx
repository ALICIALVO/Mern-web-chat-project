import { createContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; 
import { io } from 'socket.io-client';

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {

    const [account, setAccount] = useState(null);
    const [person, setPerson] = useState({});
    const [activeUsers, setActiveUsers] = useState([]); 
    const [newMessageFlag, setNewMessageFlag] = useState(false); 
    const [conversation, setConversation] = useState(null); 

    const socket = useRef();

  useEffect(() => {

      const webSocketUrl = import.meta.env.VITE_WEBSOCKET_URL;
      socket.current = io(webSocketUrl);

      socket.current.on("getUsers", (users) => {
        setActiveUsers(users);
      });

      return () => {

      if (socket.current) {
          socket.current.disconnect();
        }
      };

    }, []);


  const logout = () => {

    if (socket.current) {

      socket.current.emit('customDisconnect');

    }
    
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';

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
                logout, 
            }}
        >
            {children}

        </AccountContext.Provider>
    );
};

export default AccountProvider;

AccountProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

