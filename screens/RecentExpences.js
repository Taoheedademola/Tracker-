import ExpensesOutput from "../Components/Expenses/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";
import LoadingOverlay from "../Components/Ui/LoadingOverlay";
import ErrorOverlay from "../Components/Ui/ErrorOverylay";

function RecentExpense() {
  const [isFetching, setisFetching] = useState(true);
  const [error, setError] = useState(null);
  const expenseCtx = useContext(ExpenseContext);
  useEffect(() => {
    async function getExpenses() {
      setisFetching(true);
      try {
        const expenses = await fetchExpense();
        expenseCtx.setExpenses(expenses);
      } catch (error) {
        setError("Failed to fetch expenses. Please try again.", error);
      }
      setisFetching(false);
    }
    getExpenses();
  }, []);

  if (error && !isFetching) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={() => {
          setError(null);
        }}
      />
    );
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const r7daysago = getDateMinusDays(today, 7);

    return expense.date >= r7daysago;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodname="Last 7 days"
      fallback={"No expenses registered for the last 7 days"}
    />
  );
}

export default RecentExpense;
