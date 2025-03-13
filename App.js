import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import ManageExpenses from "./screens/ManageExpenses";
import RecentExpense from "./screens/RecentExpences";
import AllExpenses from "./screens/Allexpenses";
import { GlobalStyles } from "./Constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import IconButton from "./Components/Ui/iconBtn";
import ExpenseContext from "./store/expenses-context";
import ExpensesContextProvider from "./store/expenses-context";

const Stacks = createNativeStackNavigator();
const BottomTap = createBottomTabNavigator();

function ExpencsesOverview() {
  return (
    <BottomTap.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            Icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("Manage Expense");
            }}
          />
        ),
      })}
    >
      <BottomTap.Screen
        name="Recent Expence"
        component={RecentExpense}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTap.Screen
        name="All Expenses"
        component={AllExpenses}
        options={{
          title: "All  Expenses",
          tabBarLabel: "All Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTap.Navigator>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stacks.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stacks.Screen
              name="Expenses Overview"
              component={ExpencsesOverview}
              options={{ headerShown: false }}
            />
            <Stacks.Screen
              name="Manage Expense"
              component={ManageExpenses}
              options={{
                presentation: "modal",
              }}
            />
          </Stacks.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
});
