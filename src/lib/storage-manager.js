// storage-manager.js
export const AUTH_TOKEN_KEY = '__auth-token__';

export function getStorageItem(key) {
  try {
    const value = localStorage.getItem(key);
    return value;
  } catch (error) {
    return null;
  }
}

export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
  }
}

export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}
