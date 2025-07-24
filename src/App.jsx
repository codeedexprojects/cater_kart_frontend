import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// Your existing Admin and SubAdmin components
import AdminLogin from './Components/Admin/AdminLogin';
import AdminHome from './Pages/Admin/AdminHome';
import Dashboard from './Components/Admin/Dashboard';
import UsersList from './Components/Admin/UsersList';
import FaresList from './Components/Admin/FaresList';
import Works from './Components/Admin/Works';
import WorkAnalytics from './Components/Admin/WorkAnalytics';

import SubAdminLogin from './Pages/SubAdmin/SubAdminLogin';
import SubAdminHome from './Pages/SubAdmin/SubAdminHome';
import SubAdminDashboard from './Pages/SubAdmin/dashboard';
import CreateUser from './Components/SubAdmin/User';
import CateringWorks from './Components/SubAdmin/CateringWorks';

// User components (converted to use Redux)
import Home from './Pages/User/Home';
import Profile from './Pages/User/Profile';
import MyWorksPage from './Pages/User/MyWork';
import CateringJobDetails from './Pages/User/WorkDetail';
import Login from './Pages/User/Login';
import LandingPage from './LandingPage/Pages/Home';

// Unified protected routes
import { AdminRoute, SubAdminRoute, UserRoute } from './PrivateRoute';

// Redirect component for backward compatibility
const RedirectToUserWorkDetails = () => {
  const { id } = useParams();
  return <Navigate to={`/user/work-details/${id}`} replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing page - accessible to everyone */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Login Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/subadmin/login" element={<SubAdminLogin />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/login" element={<Navigate to="/user/login" replace />} />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminHome />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UsersList />} />
            <Route path="fares" element={<FaresList />} />
            <Route path="works" element={<Works />} />
            <Route path="work-analytics" element={<WorkAnalytics />} />
          </Route>
        </Route>

        {/* SubAdmin Protected Routes */}
        <Route path="/subadmin" element={<SubAdminRoute />}>
          <Route element={<SubAdminHome />}>
            <Route index element={<Navigate to="/subadmin/sub-dashboard" replace />} />
            <Route path="sub-dashboard" element={<SubAdminDashboard />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="catering-works" element={<CateringWorks />} />
          </Route>
        </Route>

        {/* User Protected Routes */}
        <Route path="/user" element={<UserRoute />}>
          <Route index element={<Navigate to="/user/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="my-works" element={<MyWorksPage />} />
          <Route path="work-details/:id" element={<CateringJobDetails />} />
        </Route>

        {/* Legacy routes for backward compatibility */}
        <Route path="/profile" element={<Navigate to="/user/profile" replace />} />
        <Route path="/my-works" element={<Navigate to="/user/my-works" replace />} />
        <Route path="/work-details/:id" element={<RedirectToUserWorkDetails />} />

        {/* Default dashboard redirect */}
        <Route path="/dashboard" element={<Navigate to="/admin/login" replace />} />

        {/* Catch-all route - redirect to landing page instead of login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;