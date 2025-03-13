import { FlatList, Text } from "react-native";
import ExpenseItems from "./expenseItem";

function RenderExpenses(itemData) {
  return <ExpenseItems {...itemData.item} />;
}
function ExpenseList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={RenderExpenses}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpenseList;
