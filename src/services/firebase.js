import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import * as dayjs from 'dayjs';

import { config } from '../config';

firebase.initializeApp(config.firebase);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

const createTimpstamp = (date) => {
  return firebase.firestore.Timestamp.fromDate(date);
};

const COLLECTION = 'massages';

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

export const getMassagesByDateRange = async (user, date) => {
  const startDate = dayjs(date).startOf('date').toDate();
  const endDate = dayjs(date).endOf('date').toDate();
  const snapshot = await db
    .collection(COLLECTION)
    // .where('user', '==', user)
    .where('date', '>=', createTimpstamp(startDate))
    .where('date', '<=', createTimpstamp(endDate))
    .get();
  return snapshot.docs.map((doc) => doc.data());
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
      .onSnapshot(observer)
  );
};
