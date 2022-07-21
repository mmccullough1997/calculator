import axios from 'axios';
import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const dbUrl = clientCredentials.databaseURL;

const getExpenses = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/expenses.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteExpense = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/expenses/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSingleExpense = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/expenses/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createExpense = (expenseObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/expenses.json`, expenseObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/expenses/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateExpenses = (expenseObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/expenses/${expenseObj.firebaseKey}.json`, expenseObj)
    .then(resolve)
    .catch(reject);
});

export {
  getExpenses,
  deleteExpense,
  getSingleExpense,
  createExpense,
  updateExpenses,
};
