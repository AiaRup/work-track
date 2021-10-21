import React, { useState, useCallback } from 'react';

export const NotificationContext = React.createContext({
  error: null,
  success: null,
  addNotification: () => {},
  removeNotification: () => {}
});

export const NotificationProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const removeNotification = () => {
    setError(null);
    setSuccess(null);
  };

  const addNotification = (message, type) => {
    type === 'error'
      ? setError({ message, type })
      : setSuccess({ message, type });
  };

  const contextValue = {
    error,
    success,
    addNotification: useCallback(
      (message, type) => addNotification(message, type),
      []
    ),
    removeNotification: useCallback(() => removeNotification(), [])
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
