import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createExpense, updateExpenses } from '../../api/expensesData';

const initialState = {
  name: '',
  description: '',
  cost: '',
  paid: false,
  due_date: '',
};

function ExpenseForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  // this is a given
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.warn(formInput);
    // console.warn(name);
    // console.warn(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateExpenses(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createExpense(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Expense</h2>

      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">

        <Form.Control type="text" placeholder="Enter Expense Name" name="name" value={formInput.name} onChange={handleChange} required />

      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control as="textarea" placeholder="Enter Expense Description" style={{ height: '100px' }} name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Cost ($)" className="mb-3">

        <Form.Control type="text" placeholder="Enter Expense Cost" name="cost" value={formInput.cost} onChange={handleChange} required />

      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Due Date" className="mb-3">

        <Form.Control type="date" placeholder="Enter Expense Due Date" name="due_date" value={formInput.due_date} onChange={handleChange} required />

      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="paid"
        name="paid"
        label="Paid?"
        checked={formInput.paid}
        onChange={(e) => setFormInput((prevState) => ({
          ...prevState,
          paid: e.target.checked,
        }))}
      />
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Expense</Button>
    </Form>
  );
}

ExpenseForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    cost: PropTypes.string,
    paid: PropTypes.bool,
    due_date: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ExpenseForm.defaultProps = {
  obj: initialState,
};

export default ExpenseForm;
