
import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button"
function ExpenseForm({ onCancel, onSubmit, submitButtonLabel }) {
    const [inputValues, setInputValues] = useState({
        amount: "",
        date: '',
        description: ''
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {

        setInputValues((curInputValues) => {
            return { ...curInputValues, [inputIdentifier]: enteredValue };

        });
    }
    function submitHandler() {
        const expenseDate = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description,
        };
        onSubmit( expenseDate);
    }
    return (
        <View >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", margin: 10, textAlign: "center" }}>Your Expense</Text>
            <View style={{ marginTop: 15, flexDirection: "row", justifyContent: "space-between" }}>


                <Input label="Amount"
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangedHandler.bind(this, "amount"),
                        value: inputValues.amount,
                    }}
                    style={styles.input}


                />
                <Input label="Date"
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,

                        onChangeText: inputChangedHandler.bind(this, "date"),
                        value: inputValues.date,

                    }}
                    style={styles.input}
                />
            </View>
            <Input label="Description" textInputConfig={{
                multiline: true,
                onChangeText: inputChangedHandler.bind(this, "description"),
                value: inputValues.description,

            }} />
            <View style={styles.buttons}>
                <Button mode="flat" onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
            </View>
        </View >
    );
}
export default ExpenseForm;

const styles = StyleSheet.create({
    input: {
        flex: 1
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