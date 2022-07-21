import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleExpense } from '../../../api/expensesData';
import ExpenseForm from '../../../components/forms/ExpenseForm';

export default function EditAuthor() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the author data
  useEffect(() => {
    getSingleExpense(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (
    <ExpenseForm obj={editItem} />
  );
}
