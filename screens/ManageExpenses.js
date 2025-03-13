import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../Components/Ui/iconBtn";
import { GlobalStyles } from "../Constants/styles";
import Button from "../Components/Ui/btn";
import { ExpenseContext } from "../store/expenses-context";
import ExpenseForm from "../Components/manageExpense/expenseform";
import storeExpense, { deleexpense, updateExpense } from "../util/http";
import LoadingOverlay from "../Components/Ui/LoadingOverlay";

function ManageExpenses({ route, navigation }) {
  const expensectx = useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const [isFetching, setFetching] = useState(false);
  const selectedExpense = expensectx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpense() {
    setFetching(true);
    await deleexpense(editedExpenseId);
    expensectx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function ConfirmHandler(expenseData) {
    setFetching(true);
    if (isEditing) {
      expensectx.updateExpense(editedExpenseId, expenseData);
      await updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensectx.addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        defultValue={selectedExpense}
        onSubmit={ConfirmHandler}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            Icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpense}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
