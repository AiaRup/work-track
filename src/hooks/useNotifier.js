import { useCallback } from 'react';

import { useNotification } from './';

export const useNotifier = ({ action, fail, success }) => {
  const { addNotification } = useNotification();

  return useCallback(
    (...args) => {
      return action(...args)
        .then((result) => {
          if (success) {
            addNotification(success, 'success');
          }
          return result;
        })
        .catch((e) => {
          console.log('Error:', e);
          if (fail) {
            addNotification(fail, 'error');
          }
        });
    },
    [action, fail, success, addNotification]
  );
};
