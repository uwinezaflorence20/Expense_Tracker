import React, { useState } from 'react';

// Define the type for an individual expense
type Expense = {
  amount: number;
  category: string;
  date: string;
  description: string;
};

interface Props {
  addExpense: (expense: Expense) => void;
}

const ExpenseForm: React.FC<Props> = ({ addExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date || !description) {
      alert('All fields are required!');
      return;
    }
    const expense = { amount: parseFloat(amount), category, date, description };
    addExpense(expense);
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="block w-full mb-2 p-2 border"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="block w-full mb-2 p-2 border"
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Clothes">Clothes</option>
        <option value="Laundry">Laundry</option>
        <option value="Picnic">Picnic</option>
        <option value="Travels">Travels</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="block w-full mb-2 p-2 border"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full mb-2 p-2 border"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
