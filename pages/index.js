/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getExpenses } from '../api/expensesData';
import ExpenseCard from '../components/ExpenseCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [expenses, setExpenses] = useState([]);
  const { user } = useAuth();
  // console.warn(user.uid);

  const getAllExpenses = () => {
    getExpenses(user.uid).then(setExpenses);
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {expenses.map((expense) => (
        <ExpenseCard key={expense.firebaseKey} expenseObj={expense} onUpdate={getAllExpenses} />
      ))}
    </div>
  );
}
export default Home;
