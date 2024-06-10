// //components
// import Messenger from './components/Messenger';
// import AccountProvider from './context/AccountProvider';

// export function App() {
//   return (
//     <AccountProvider>

//       <Messenger/>
//     </AccountProvider>
//   );
// }

// export default App;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Messenger from './components/Messenger';
import AccountProvider from './context/AccountProvider'; 

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









// ========================================
//working code witout passport.js:

// import { GoogleOAuthProvider } from '@react-oauth/google';

// //components
// import Messenger from './components/Messenger';
// import AccountProvider from './context/AccountProvider';






// export function App() {

//   const clientId = '342053153095-7vitgsku603oaqbi8sjnsfateftq6biu.apps.googleusercontent.com';

//   return (
   
//     <GoogleOAuthProvider clientId={clientId}>
//       <AccountProvider>
//             <Messenger/>
//             </AccountProvider>


//     </GoogleOAuthProvider>
    
//   );
// }


// export default App;