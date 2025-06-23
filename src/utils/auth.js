// src/lib/jwt-utils.js (or wherever it is located)

import { jwtDecode } from "jwt-decode";

const getUserRoleFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const roles = decoded.roles;

    if (Array.isArray(roles)) {
      return roles[0];
    }

    if (typeof roles === 'string') {
      return roles;
    }

    return null;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};

const getUserNameFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      name: decoded.name,
      roles: Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles],
    };
  } catch (err) {
    console.error("Failed to decode token:", err);
    return {
      name: "Admin",
      roles: [],
    };
  }
};

export {getUserRoleFromToken, getUserNameFromToken};