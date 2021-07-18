import React, { createContext, useContext } from 'react';
import firebase from 'firebase';

import firebaseConfig from '../config/firebase';

const FirebaseContext = createContext({});
export let firebaseRef = {};

firebaseRef = firebase.initializeApp(firebaseConfig);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ firebase: firebaseRef }}>
      {children}
    </FirebaseContext.Provider>
  );
};
export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirbaseContext must be used within a RoomProvider');
  }
  return context;
};
