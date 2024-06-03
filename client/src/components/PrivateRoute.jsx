// import { useState, useEffect } from 'react';
// import { useNavigate, Route } from 'react-router-dom';

// const PrivateRoute = ({ element, ...rest }) => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Example: Check if the user is logged in using local storage
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//       // Redirect to login page if not logged in
//       navigate('/login');
//     }
//   }, [navigate]);

//   return isLoggedIn ? <Route {...rest} element={element} /> : null;
// };

// export default PrivateRoute;
