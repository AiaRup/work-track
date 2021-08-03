import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import * as dayjs from 'dayjs';

import { config } from '../config';

!firebase?.apps?.length
  ? firebase.initializeApp(config.firebase)
  : firebase.app();

// Auth
export const firebaseAuth = firebase.auth();
firebaseAuth.useDeviceLanguage();
const db = firebase.firestore();

export const getCurrentUser = () => {
  return firebaseAuth.currentUser;
};

const configureRecaptcha = () => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    'sign-in-button',
    {
      size: 'invisible',
      callback: (response) => {
        onPhoneNumberSubmit();
        console.log('reCAPTCHA solved');
      },
      defaultCountry: 'IL'
    }
  );
};

export const onPhoneNumberSubmit = (event, phoneNumber) => {
  event.preventDefault();
  console.log('window.recaptchaVerifier', window.recaptchaVerifier);
  configureRecaptcha();
  const appVerifier = window.recaptchaVerifier;
  firebase
    .auth()
    .signInWithPhoneNumber(`+972${phoneNumber}`, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      console.log('OTP has been send.');
    })
    .catch((error) => {
      console.log('Error sending OTP', error);
    });
};

export const onCodeSubmit = async (e, code) => {
  e.preventDefault();
  try {
    const result = await window.confirmationResult.confirm(code);
    console.log('result', JSON.stringify(result.user));

    return result.user;
  } catch (error) {
    console.log('Error entering code', error);
    return undefined;
  }
};

const USERS_COLLECTION = 'users';

export const addUser = (user) => {
  return db.collection(USERS_COLLECTION).add({
    ...user,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
};

export const getUserByAuthId = (authId) => {
  return db.collection(USERS_COLLECTION).where('authId', '==', authId).get();
};

export const logout = () => {
  firebaseAuth.signOut();
};

// Firestore - DB
const MASSAGES_COLLECTION = 'massages';

const createTimpstamp = (date) => {
  return firebase.firestore.Timestamp.fromDate(date);
};

export const addMassage = (massage) => {
  return db.collection(MASSAGES_COLLECTION).add({
    ...massage,
    date: createTimpstamp(massage.date.toDate()),
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
};

export const getMassageById = (id) => {
  return db.collection(MASSAGES_COLLECTION).doc(id).get();
};

export const getMassagesByDateRange = async (user, date, type = 'date') => {
  const startDate = dayjs(date).startOf(type).toDate();
  const endDate = dayjs(date).endOf(type).toDate();
  const snapshot = await db
    .collection(MASSAGES_COLLECTION)
    // .where('user', '==', user)
    .where('date', '>=', createTimpstamp(startDate))
    .where('date', '<=', createTimpstamp(endDate))
    .get();
  const arrayWithDates = snapshot.docs.map((doc) => {
    const data = doc.data();
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
  return db
    .collection(MASSAGES_COLLECTION)
    .where('id', '==', id)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update(massage);
      });
    });
};

export const deleteMassage = (id) => {
  return db
    .collection(MASSAGES_COLLECTION)
    .where('id', '==', id)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
};

export const streamMassages = (user, date, observer) => {
  const startDate = dayjs(date).startOf('date').toDate();
  const endDate = dayjs(date).endOf('date').toDate();

  return (
    db
      .collection(MASSAGES_COLLECTION)
      // .where('user', '==', user)
      .where('date', '>=', createTimpstamp(startDate))
      .where('date', '<=', createTimpstamp(endDate))
      .orderBy('date')
      .onSnapshot(observer)
  );
};
