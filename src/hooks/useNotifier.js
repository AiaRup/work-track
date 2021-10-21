import { useCallback } from 'react';

import { useNotification } from './';

export const useNotifier = ({ action, fail }) => {
  const { addError } = useNotification();

  return useCallback(
    (...args) => {
      return action(...args)
        .then((result) => result)
        .catch((e) => {
          console.log('Error:', e);
          if (fail) {
            addError(fail);
          }
        });
    },
    [action, fail, addError]
  );
};
