const endpoint = 'massages';

const getMassages = (firebase) => {
  return firebase.firestore().collection(endpoint).get();
};

const addMassages = (firebase, massage) => {
  return firebase.firestore().collection(endpoint).add(massage);
};

export default {
  addMassages,
  getMassages
};
