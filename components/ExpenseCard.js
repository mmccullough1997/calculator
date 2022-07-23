/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteExpense, getSingleExpense, updateExpenses } from '../api/expensesData';

function ExpenseCard({ expenseObj, onUpdate }) {
  const deleteTheExpense = () => {
    if (window.confirm(`Delete ${expenseObj.name}?`)) {
      deleteExpense(expenseObj.firebaseKey).then(() => onUpdate());
    }
  };

  const markAsPaid = () => {
    if (window.confirm('Mark As Paid?')) {
      getSingleExpense(expenseObj.firebaseKey).then(() => {
        const obj = { ...expenseObj };
        obj.paid = true;
        updateExpenses(obj).then(() => onUpdate());
      });
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body className={expenseObj.paid ? 'paidExpense' : 'unpaidExpense'}>
        <Card.Title>{expenseObj.name}</Card.Title>
        <hr />
        <p className="card-text bold">{expenseObj.description}</p>
        <p className="card-text bold">Cost: ${expenseObj.cost}</p>
        <p className="card-text bold">Due By: {expenseObj.due_date}</p>
        {/* DYNAMIC LINK TO EDIT THE DETAILS  */}
        <Link href={`/expense/edit/${expenseObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteTheExpense} className="m-2">
          DELETE
        </Button>
        <>
          {expenseObj.paid === false ? <Button variant="success" onClick={markAsPaid} className="m-2">Paid</Button> : ''}
        </>
      </Card.Body>
    </Card>
  );
}

ExpenseCard.propTypes = {
  expenseObj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    cost: PropTypes.string,
    due_date: PropTypes.string,
    paid: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ExpenseCard;
