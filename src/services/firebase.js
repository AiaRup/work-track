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

// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//   'sign-in-button',
//   {
//     size: 'invisible',
//     callback: (response) => {
//       reCAPTCHA solved, allow signInWithPhoneNumber.
//       onSignInSubmit();
//     }
//   }
// );

// const onSignInSubmit = (event, phoneNumber = '+911234567899') => {
//   event.preventDefault();
//   const appVerifier = window.recaptchaVerifier;
//   firebase
//     .auth()
//     .signInWithPhoneNumber(phoneNumber, appVerifier)
//     .then((confirmationResult) => {
//       // SMS sent. Prompt user to type the code from the message, then sign the
//       // user in with confirmationResult.confirm(code).
//       window.confirmationResult = confirmationResult;
//       // ...
//     })
//     .catch((error) => {
//       // Error; SMS not sent
//       console.log('error', error);
//       // ...
//     });
// };

// Firestore - DB
const db = firebase.firestore();
const COLLECTION = 'massages';

const createTimpstamp = (date) => {
  return firebase.firestore.Timestamp.fromDate(date);
};

export const addMassage = (massage) => {
  return db.collection(COLLECTION).add({
    ...massage,
    date: createTimpstamp(massage.date.toDate()),
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
};

export const getMassageById = (id) => {
  return db.collection(COLLECTION).doc(id).get();
};

export const getMassagesByDateRange = async (user, date, type = 'date') => {
  const startDate = dayjs(date).startOf(type).toDate();
  const endDate = dayjs(date).endOf(type).toDate();
  const snapshot = await db
    .collection(COLLECTION)
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
    .collection(COLLECTION)
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
    .collection(COLLECTION)
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
      .collection(COLLECTION)
      // .where('user', '==', user)
      .where('date', '>=', createTimpstamp(startDate))
      .where('date', '<=', createTimpstamp(endDate))
      .orderBy('date')
      .onSnapshot(observer)
  );
};
