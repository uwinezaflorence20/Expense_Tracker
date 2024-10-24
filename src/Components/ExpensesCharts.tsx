import React, { useRef} from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Tooltip, Legend);

type Expense = {
  amount: number;
  category: string;
  date: string;
  description: string;
};

interface ExpenseChartsProps {
  expenses: Expense[];
}

const ExpenseCharts: React.FC<ExpenseChartsProps> = ({ expenses }) => {
  const pieChartRef = useRef<ChartJS<"pie"> | null>(null); 
  const categories = expenses.reduce((acc: Record<string, number>, curr) => {
    if (!acc[curr.category]) acc[curr.category] = 0;
    acc[curr.category] += curr.amount;
    return acc;
  }, {});
  const pieData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg max-w-lg mx-auto ">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Expenses by Category (Pie Chart)</h3>
      <Pie data={pieData} ref={pieChartRef} />
      
    </div>
  );
};

export default ExpenseCharts;
