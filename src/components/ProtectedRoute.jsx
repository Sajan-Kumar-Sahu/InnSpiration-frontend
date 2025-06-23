import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { getUserRoleFromToken } from '@/utils/auth';
import { AUTH_TOKEN_KEY, getStorageItem, removeStorageItem } from '@/lib/storage-manager';
import { toast } from 'sonner';
import { useAuthContext } from '@/lib/providers/auth-context-provider';

const ProtectedRoute = ({ allowedRoles, redirectTo = '/admin/signup', children }) => {
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const token = getStorageItem(AUTH_TOKEN_KEY);
  const userRole = token ? getUserRoleFromToken(token) : null;
  const navigate = useNavigate();
  const { setAuthenticatedUser } = useAuthContext(); // ✅ get auth context

  useEffect(() => {
    setIsTokenChecked(true);
  }, [token]);

  useEffect(() => {
    if (isTokenChecked) {
      if (!token || !userRole || !allowedRoles.includes(userRole)) {
        // ✅ Logout logic
        removeStorageItem(AUTH_TOKEN_KEY);
        setAuthenticatedUser({ isAuthenticated: false, user: null });

        toast.error('Unauthorized Access!');
        navigate(redirectTo, { replace: true });
      }
    }
  }, [isTokenChecked, token, userRole, allowedRoles, navigate, redirectTo, setAuthenticatedUser]);

  if (!isTokenChecked) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
