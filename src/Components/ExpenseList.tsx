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
  updateExpense: (index: number, updatedExpense: Expense) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, removeExpense, updateExpense }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track the index of the item being edited
  const [editFormData, setEditFormData] = useState<Expense | null>(null); // Track the data being edited

  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter(expense => expense.category === selectedCategory);


  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditFormData(expenses[index]); 
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editFormData !== null && editingIndex !== null) {
      updateExpense(editingIndex, editFormData); 
      setEditingIndex(null); 
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Expense List</h2>
        <p className="text-gray-500">Manage your expenses efficiently</p>
      </div>

     
      <div className="">
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

      {filteredExpenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses found for this category.</p>
      ) : (
        <ul className="space-y-4 max-h-60 overflow-y-scroll">
          {filteredExpenses.map((expense, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-xl shadow-sm"
            >
              {editingIndex === index ? (
                <form onSubmit={handleEditSubmit} className="w-full">
                  <div className="flex flex-col space-y-2">
                    <input
                      type="text"
                      name="category"
                      value={editFormData?.category || ''}
                      onChange={handleEditChange}
                      className="p-2 border rounded"
                      placeholder="Category"
                    />
                    <input
                      type="number"
                      name="amount"
                      value={editFormData?.amount || ''}
                      onChange={handleEditChange}
                      className="p-2 border rounded"
                      placeholder="Amount"
                    />
                    <input
                      type="text"
                      name="description"
                      value={editFormData?.description || ''}
                      onChange={handleEditChange}
                      className="p-2 border rounded"
                      placeholder="Description"
                    />
                    <input
                      type="date"
                      name="date"
                      value={editFormData?.date || ''}
                      onChange={handleEditChange}
                      className="p-2 border rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <>
                  <div>
                    <strong className="text-gray-700">{expense.category}</strong>
                    <p className="text-gray-500">
                      ${expense.amount} on {expense.date}
                    </p>
                    <p className="text-gray-400 text-sm">{expense.description}</p>
                  </div>
                  <div className="flex">
                    <button
                      onClick={() => handleEditClick(index)}
                      className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeExpense(index)}
                      className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
