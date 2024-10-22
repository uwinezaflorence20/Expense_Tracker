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
    <div className="bg-gray-100 p-4 rounded shadow mt-4">
      <h2 className="text-xl mb-4">Expenses</h2>

      <div className="mb-4">
        <label htmlFor="categoryFilter" className="block mb-2">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Clothes">Clothes</option>
          <option value="Laundry">Laundry</option>
          <option value="Picnic">Picnic</option>
          <option value="Travels">Travels</option>
        </select>
      </div>

      {filteredExpenses.length === 0 ? (
        <p>No expenses found for this category.</p>
      ) : (
        <ul>
          {filteredExpenses.map((expense, index) => (
            <li key={index} className="mb-2">
              <strong>{expense.category}</strong>: ${expense.amount} on {expense.date} - {expense.description}
              <button
                onClick={() => removeExpense(index)}
                className="ml-4 text-red-500"
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
