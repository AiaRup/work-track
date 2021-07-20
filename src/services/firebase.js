import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import * as dayjs from 'dayjs';

import { config } from '../config';

!firebase?.apps?.length
  ? firebase.initializeApp(config.firebase)
  : firebase.app();

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

export const getMassagesByDateRange = async (user, date, type = 'date') => {
  const startDate = dayjs(date).startOf(type).toDate();
  const endDate = dayjs(date).endOf(type).toDate();
  const snapshot = await db
    .collection(COLLECTION)
    // .where('user', '==', user)
    .where('date', '>=', createTimpstamp(startDate))
    .where('date', '<=', createTimpstamp(endDate))
    .get();
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    data.date = dayjs(data.date.toDate()).format('DD/MM');

    return data;
  });
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
