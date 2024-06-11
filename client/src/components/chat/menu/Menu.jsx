import { useState } from 'react';
import { Box } from '@mui/material';

// components:
import Header from "./Header";
import Search from './Search';
import Conversations from './Conversations';
// import VerticalSideBar from './SideHeader';


const Menu = () => {

   const [text, setText] = useState('');

   return (
   <Box>
    <Header />
    <Search setText={setText}/>
    <Conversations text={text}/>
    {/* <VerticalSideBar/> */}
   </Box>
   ); 
}

export default Menu;