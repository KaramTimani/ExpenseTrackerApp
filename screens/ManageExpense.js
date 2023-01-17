
import { View, Text, StyleSheet } from "react-native";
import { useLayoutEffect, useContext } from "react";
import IconButton from "../components/ExpensesOutput/UI/IconButton.js";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/ExpensesOutput/UI/Button.js";
import { ExpensesContext } from "../store/expenses-context.js";

function ManageExpense({ route, navigation }) {
    const expensesCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;

    const isEditing = !!editedExpenseId;
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",

        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }
    function cancelHandler() {
        navigation.goBack();
    }
    function confirmHandler() {

        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId,{
                description: "Test!!!",
                amount: 29.99,
                date: new Date("2002-05-20")
            });
        } else {
            expensesCtx.addExpense({
                description: "Test",
                amount: 19.33,
                date: new Date("2021-05-19")
            });
        }
        navigation.goBack();
    }

    return (

        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button mode="flat" onPress={cancelHandler} style={styles.button}>Cancel</Button>
                <Button onPress={confirmHandler} style={styles.button}>{isEditing ? "Update" : "Add"}</Button>
            </View>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    )
}
export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary500,
        alignItems: "center",



    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,

    }
})