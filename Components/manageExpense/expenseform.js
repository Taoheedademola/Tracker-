import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./input";
import { useState } from "react";
import Button from "../Ui/btn";
import { GlobalStyles } from "../../Constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defultValue }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defultValue ? defultValue.amount.toString() : "",
      isValid: true, // ✅ Fixed capitalization
    },

    date: {
      value: defultValue ? defultValue.date.toISOString().slice(0, 10) : "",
      isValid: true, // ✅ Fixed capitalization
    },

    description: {
      value: defultValue ? defultValue.description : "",
      isValid: true, // ✅ Fixed capitalization
    },
  });

  function inputChangehandler(inputIdentifier, enteredvalue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredvalue, isValid: true },
      };
    });
  }

  function SubmitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0; // ✅ Fixed
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid || // ✅ Fixed capitalization
    !inputs.description.isValid; // ✅ Fixed capitalization

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRows}>
        <Input
          style={styles.rowInputStyle}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputconfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangehandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInputStyle}
          label="Date"
          invalid={!inputs.date.isValid} // ✅ Fixed capitalization
          textInputconfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: "10",
            onChangeText: inputChangehandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputs.description.isValid} // ✅ Fixed capitalization
        textInputconfig={{
          multiline: true,
          onChangeText: inputChangehandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />

      {formIsValid && (
        <Text style={styles.expenseError}>
          Invalid Input Values - Please Check Your Entries
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={SubmitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  inputRows: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInputStyle: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginVertical: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  expenseError: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
