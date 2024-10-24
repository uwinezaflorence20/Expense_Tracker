import React, { useState } from 'react';

type Expense = {
  amount: number;
  category: string;
  date: string;
  description: string;
};

interface ExpenseListProps {
  expenses: Expense[];
  removeExpense: (index: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, removeExpense }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter(expense => expense.category === selectedCategory);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Expense List</h2>
        <p className="text-gray-500">Manage your expenses efficiently</p>
      </div>

      
      <div className="mb-6">
        <label htmlFor="categoryFilter" className="block mb-2 text-gray-600">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-xl focus:ring focus:ring-blue-300"
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Clothes">Clothes</option>
          <option value="Laundry">Laundry</option>
          <option value="Picnic">Picnic</option>
          <option value="Travels">Travels</option>
        </select>
      </div>

      {/* Scrollable expense list */}
      {filteredExpenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses found for this category.</p>
      ) : (
        <ul className="space-y-4 max-h-60 overflow-y-scroll">
          {filteredExpenses.map((expense, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-xl shadow-sm"
            >
              <div>
                <strong className="text-gray-700">{expense.category}</strong>
                <p className="text-gray-500">
                  ${expense.amount} on {expense.date}
                </p>
                <p className="text-gray-400 text-sm">{expense.description}</p>
              </div>
              <button
                onClick={() => removeExpense(index)}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
