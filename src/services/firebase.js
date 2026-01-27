import { initializeApp } from 'firebase/app';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  deleteDoc,
  onSnapshot,
  orderBy
} from 'firebase/firestore';
import * as dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { config } from '../config';

// Initialize Firebase
const app = initializeApp(config.firebase);
const db = getFirestore(app);

// Debug: Log config values
console.log('Firebase Config:', {
  apiKey: config.firebase.apiKey ? '✓ Set' : '✗ Missing',
  authDomain: config.firebase.authDomain ? '✓ Set' : '✗ Missing',
  projectId: config.firebase.projectId ? '✓ Set' : '✗ Missing',
  storageBucket: config.firebase.storageBucket ? '✓ Set' : '✗ Missing',
  messagingSenderId: config.firebase.messagingSenderId ? '✓ Set' : '✗ Missing',
  appId: config.firebase.appId ? '✓ Set' : '✗ Missing',
  measurementId: config.firebase.measurementId ? '✓ Set' : '✗ Missing'
});
console.log('Full config:', config.firebase);

// Auth
export const firebaseAuth = getAuth(app);
firebaseAuth.useDeviceLanguage();

export const getCurrentUser = () => {
  return firebaseAuth.currentUser;
};

// Initialize reCAPTCHA verifier once
let recaptchaVerifier = null;

export const initializeRecaptcha = () => {
  if (recaptchaVerifier) {
    console.log('reCAPTCHA already initialized');
    return recaptchaVerifier;
  }

  try {
    console.log('Initializing reCAPTCHA...');
    recaptchaVerifier = new RecaptchaVerifier(
      firebaseAuth,
      'sign-in-button',
      {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          recaptchaVerifier = null; // Reset on expiry
        },
        appVerificationDisabledForTesting: true
      }
    );
    console.log('reCAPTCHA initialized successfully');
    return recaptchaVerifier;
  } catch (error) {
    console.error('Error initializing reCAPTCHA:', error);
    recaptchaVerifier = null;
    throw error;
  }
};

export const onPhoneNumberSubmit = (event, phoneNumber) => {
  event.preventDefault();
  console.log('Phone number submit:', phoneNumber);
  try {
    const appVerifier = initializeRecaptcha();
    console.log('AppVerifier:', appVerifier);

    // Remove leading zero if present
    const cleanPhoneNumber = phoneNumber.startsWith('0')
      ? phoneNumber.substring(1)
      : phoneNumber;

    const fullPhoneNumber = `+972${cleanPhoneNumber}`;
    console.log('Full phone number to send:', fullPhoneNumber);

    signInWithPhoneNumber(firebaseAuth, fullPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log('OTP sent successfully');
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.error('Error sending OTP', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        recaptchaVerifier = null; // Reset on error
      });
  } catch (error) {
    console.error('Error in onPhoneNumberSubmit:', error);
  }
};

export const onCodeSubmit = async (e, code) => {
  e.preventDefault();
  try {
    const result = await window.confirmationResult.confirm(code);
    return result.user;
  } catch (error) {
    console.log('Error entering code', error);
    return undefined;
  }
};

// USERS

const USERS_COLLECTION = 'users';

export const addUser = (user) => {
  return addDoc(collection(db, USERS_COLLECTION), {
    ...user,
    id: uuidv4().toUpperCase(),
    createdAt: serverTimestamp()
  });
};

export const getUserByAuthId = (authId) => {
  return getDocs(
    query(collection(db, USERS_COLLECTION), where('authId', '==', authId))
  );
};

export const getUserById = (id) => {
  return getDoc(doc(db, USERS_COLLECTION, id));
};

export const updateUserDetails = (id, user) => {
  return getDocs(
    query(collection(db, USERS_COLLECTION), where('id', '==', id))
  ).then(function (querySnapshot) {
    querySnapshot.forEach(function (document) {
      updateDoc(document.ref, user);
    });
  });
};

export const logout = () => {
  return signOut(firebaseAuth);
};

// MASSAGES

const MASSAGES_COLLECTION = 'massages';

const createTimpstamp = (date) => {
  return Timestamp.fromDate(date);
};

export const addMassage = (massage) => {
  return addDoc(collection(db, MASSAGES_COLLECTION), {
    ...massage,
    date: createTimpstamp(massage.date.toDate()),
    createdAt: serverTimestamp()
  });
};

export const getMassageById = (id) => {
  return getDoc(doc(db, MASSAGES_COLLECTION, id));
};

export const getMassagesByDateRange = async (userId, date, type = 'date') => {
  const startDate = dayjs(date).startOf(type).toDate();
  const endDate = dayjs(date).endOf(type).toDate();
  const snapshot = await getDocs(
    query(
      collection(db, MASSAGES_COLLECTION),
      where('date', '>=', createTimpstamp(startDate)),
      where('date', '<=', createTimpstamp(endDate)),
      where('user', '==', userId)
    )
  );
  const arrayWithDates = snapshot.docs.map((document) => {
    const data = document.data();
    data.date = dayjs(data.date.toDate()).format('DD/MM');

    return data;
  });

  let map = arrayWithDates.reduce((prev, next) => {
    if (next.date in prev) {
      prev[next.date].minutes += next.minutes;
    } else {
      prev[next.date] = next;
    }
    return prev;
  }, {});

  return Object.keys(map).map((date) => map[date]);
};

export const updateMassage = (id, massage) => {
  return getDocs(
    query(collection(db, MASSAGES_COLLECTION), where('id', '==', id))
  ).then(function (querySnapshot) {
    querySnapshot.forEach(function (document) {
      updateDoc(document.ref, massage);
    });
  });
};

export const deleteMassage = (id) => {
  return getDocs(
    query(collection(db, MASSAGES_COLLECTION), where('id', '==', id))
  ).then(function (querySnapshot) {
    querySnapshot.forEach(function (document) {
      deleteDoc(document.ref);
    });
  });
};

export const streamMassages = (userId, date, observer) => {
  const startDate = dayjs(date).startOf('date').toDate();
  const endDate = dayjs(date).endOf('date').toDate();

  return onSnapshot(
    query(
      collection(db, MASSAGES_COLLECTION),
      where('date', '>=', createTimpstamp(startDate)),
      where('date', '<=', createTimpstamp(endDate)),
      where('user', '==', userId),
      orderBy('date')
    ),
    observer
  );
};

// TIPS

const TIPS_COLLECTION = 'tips';

export const streamTips = (userId, date, observer) => {
  const startDate = dayjs(date).startOf('date').toDate();
  const endDate = dayjs(date).endOf('date').toDate();

  return onSnapshot(
    query(
      collection(db, TIPS_COLLECTION),
      where('date', '>=', createTimpstamp(startDate)),
      where('date', '<=', createTimpstamp(endDate)),
      where('user', '==', userId),
      orderBy('date')
    ),
    observer
  );
};

export const addTips = (tip) => {
  return addDoc(collection(db, TIPS_COLLECTION), {
    ...tip,
    date: createTimpstamp(tip.date.toDate()),
    createdAt: serverTimestamp()
  });
};

export const updateTips = (id, tip) => {
  return getDocs(
    query(collection(db, TIPS_COLLECTION), where('id', '==', id))
  ).then(function (querySnapshot) {
    querySnapshot.forEach(function (document) {
      updateDoc(document.ref, tip);
    });
  });
};

export const getTipsByDateRange = async (userId, date, type = 'date') => {
  const startDate = dayjs(date).startOf(type).toDate();
  const endDate = dayjs(date).endOf(type).toDate();
  const snapshot = await getDocs(
    query(
      collection(db, TIPS_COLLECTION),
      where('date', '>=', createTimpstamp(startDate)),
      where('date', '<=', createTimpstamp(endDate)),
      where('user', '==', userId)
    )
  );
  const total = snapshot.docs.reduce((previousValue, currentValue) => {
    const data = currentValue.data();
    return previousValue + Number(data.amount);
  }, 0);

  return total;
};
