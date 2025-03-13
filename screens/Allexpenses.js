import ExpensesOutput from "../Components/Expenses/ExpensesOutput";
import { useContext } from "react";
import { ExpenseContext } from "../store/expenses-context";

function AllExpenses() {
  const expensesContext = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      periodname="Total"
      fallback={"NO registered Expenses Found 😑"}
    />
  );
}

export default AllExpenses;
