import React, { useState } from 'react';
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
    <div className=' mb-4'>
    <form 
      onSubmit={handleSubmit} 
      className="bg-[#f2f8ff] rounded-xl  shadow-lg px-24 py-6 max-w-md mx-auto"
    >
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-gray-800">Expense Tracker</h2>
        <p className="text-gray-500">Keep your finances in check</p>
      </div>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="block w-full mb-4 p-3 rounded-xl border border-gray-300 focus:ring focus:ring-blue-300"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="block w-full mb-4 p-3 rounded-xl border border-gray-300 focus:ring focus:ring-blue-300"
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
        className="block w-full mb-4 p-3 rounded-xl border border-gray-300 focus:ring focus:ring-blue-300"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full mb-4 p-3 rounded-xl border border-gray-300 focus:ring focus:ring-blue-300"
      />
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
      >
        Add Expense
      </button>
    </form>
    </div>
  );
};

export default ExpenseForm;
