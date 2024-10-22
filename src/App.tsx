import React, { useEffect, useState } from 'react';
import ExpenseForm from './Components/ExpensesForm';
import ExpenseList from './Components/ExpenseList';

// Define the type for an individual expense
type Expense = {
  amount: number;
  category: string;
  date: string;
  description: string;
};

// Database configuration
const dbName = 'ExpenseTrackerDB';
const storeName = 'expenses';

// Open the IndexedDB database
const openDatabase = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      console.error('Database error: ', event);
      reject(event);
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const db = await openDatabase();
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        const request = store.getAll();

        request.onsuccess = (event) => {
          const allExpenses = (event.target as IDBRequest).result as Expense[];
          setExpenses(allExpenses);
        };

        request.onerror = (event) => {
          console.error('Failed to fetch expenses: ', event);
        };
      } catch (error) {
        console.error('Failed to fetch expenses: ', error);
      }
    };

    fetchExpenses();
  }, []);

  const saveExpenses = async (expenses: Expense[]) => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      // Clear the store and add all expenses
      store.clear();
      expenses.forEach(expense => store.add(expense));
    } catch (error) {
      console.error('Failed to save expenses: ', error);
    }
  };

  const addExpense = (expense: Expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const removeExpense = (index: number) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} removeExpense={removeExpense} />
      <div className="mt-4">
        <strong>Total:</strong> ${total.toFixed(2)}
      </div>
    </div>
  );
};

export default App;
