import React from 'react';
import { Route, Routes } from "react-router";
import AdminHeader from '@/components/layouts/admin-header.layout';
import AdminFooter from '@/components/layouts/admin-footer.layout';

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminSignUp from './auth/admin-sign-up';
import AdminSignIn from './auth/admin-sign-in';
import AdminDashboard from '@/admin/admin-dashboard/AdminDashboard';
import AdminHome from '@/admin/admin-home';

const AdminRouter = () => {
  return (
    <>
      <AdminHeader />
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="signup" element={<AdminSignUp />} />
        <Route path="signin" element={<AdminSignIn />} />
        <Route
          path="dashboard/*"
          element={
            <ProtectedRoute allowedRoles={['HOTEL_MANAGER']} redirectTo="/admin">
              <AdminDashboard/>
            </ProtectedRoute>
          }
        />
      </Routes>
      <AdminFooter />
    </>
  );
};

export default AdminRouter;
