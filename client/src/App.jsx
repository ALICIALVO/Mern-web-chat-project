import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountProvider from './context/AccountProvider'; 

//components:
import Messenger from './components/Messenger';

export const App = () => {
  
  return (
    <Router>
      <AccountProvider>
        <Routes>
          <Route path="/" element={<Messenger />} />
          <Route path="/messenger" element={<Messenger />} />
        </Routes>
      </AccountProvider>
    </Router>
  );
};

export default App;