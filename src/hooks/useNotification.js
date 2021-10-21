import { useContext } from 'react';

import { NotificationContext } from '../contexts';

export const useNotification = () => {
  const { error, success, addNotification, removeNotification } =
    useContext(NotificationContext);
  return { error, success, addNotification, removeNotification };
};
