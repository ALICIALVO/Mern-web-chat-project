import { InputBase, Box, styled } from "@mui/material";
import { Search as SearchIcon } from '@mui/icons-material';

import PropTypes from 'prop-types'; // Import PropTypes




const Component = styled(Box)`
background: #fff;
height: 4.5rem;
border-bottom: 0.1rem solid #F2F2F2;
display: flex;
align-items: center;
/* border: 10rem solid red; */
    
`

const Wrapper = styled(Box)`
background-color: #f0f2f5;
position: relative;
margin: 0 1.3rem;
width: 100%;
border-radius: 1rem;
`
    

const Icon = styled(Box)`
    position:absolute;
    height: 100%;
    padding: 0.9rem 0.8rem;
    color: #919191;
`
    

const InputField = styled(InputBase)`
    width: 100%;
    padding: 1.6rem;
    padding-left: 7rem;
    height: 1rem;
    font-size: 1.1rem;

`


const Search = ({ setText }) => {
    return (
      <Component>
        <Wrapper>
          <Icon>
            <SearchIcon fontSize="small" />
          </Icon>
          <InputField 
            placeholder="Search or Start new chat"
            onChange={(e) => setText(e.target.value)}
          />
        </Wrapper>
      </Component>
    );
  };
  
  Search.propTypes = {
    setText: PropTypes.func.isRequired
  };
  
  export default Search;