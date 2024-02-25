// // AdminRoute.jsx
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const AdminRoute = ({ element, isAuthenticated, ...props }) => {
//   if (!isAuthenticated || !isUserAdmin()) {
//     // Redirect to login or home if not authenticated or not an admin
//     return <Navigate to="/login" />;
//   }

//   return <Route element={element} {...props} />;
// };

// export default AdminRoute;
