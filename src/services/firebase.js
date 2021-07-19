import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { config } from '../config';

firebase.initializeApp(config.firebase);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

const COLLECTION = 'massages';

export const addMassage = (massage) => {
  return db.collection(COLLECTION).add({
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    ...massage
  });
};

export const getMassageById = (id) => {
  return db.collection(COLLECTION).doc(id).get();
};

export const getMassagesByDate = async (user, date) => {
  const snapshot = await db
    .collection(COLLECTION)
    .where('user', '==', user)
    .where('date', '==', date)
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
  return db
    .collection(COLLECTION)
    .where('user', '==', user)
    .where('date', '==', date)
    .onSnapshot(observer);
};
