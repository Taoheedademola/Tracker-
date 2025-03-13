import axios from "axios";
const BackEndUrl = "https://trackerapp1-d7611-default-rtdb.firebaseio.com";

async function storeExpense(expenseData) {
  const response = axios.post(BackEndUrl + "/expenses.json", expenseData);
  const id = (await response).data.name;
  return id;
}

export default storeExpense;

export async function fetchExpense() {
  const response = await axios.get(BackEndUrl + "/expenses.json");

  const expenses = [];

  console.log(response.data);

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BackEndUrl + `/expenses/${id}.json`, expenseData);
}

export function deleexpense(id) {
  return axios.delete(BackEndUrl + `/expenses/${id}.json`);
}
