import { useContext } from 'react';

import { ErrorContext } from '../contexts';

export const useNotification = () => {
  const { error, addError, removeError } = useContext(ErrorContext);
  return { error, addError, removeError };
};
