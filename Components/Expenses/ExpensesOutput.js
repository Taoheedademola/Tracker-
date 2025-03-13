import { StyleSheet, Text, View } from "react-native";
import ExpenseSummary from "./ExpensesSummary";
import ExpenseList from "./Expenseslist";
import { GlobalStyles } from "../../Constants/styles";

function ExpensesOutput({ expenses, periodname, fallback }) {
  let content = <Text style={styles.infotext}>{fallback}</Text>;

  if (expenses.length > 0) {
    content = <ExpenseList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} periodname={periodname} />
      {content}
    </View>
  );
}
export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infotext: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 22,
  },
});
