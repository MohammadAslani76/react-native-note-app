import React from "react";
import { StyleSheet,Text } from "react-native";

const ErrorMessage = ({ error, visible }) => {
    if (!visible || !error) return null;

    return (
        <Text fontFamily="vazir" style={styles.error}>
            {error}
        </Text>
    );
};

export default ErrorMessage;

const styles = StyleSheet.create({
    error: {
        color: "red",
        marginVertical : 3,
        textAlign: "center",
        fontFamily : "vazir"
    },
});
