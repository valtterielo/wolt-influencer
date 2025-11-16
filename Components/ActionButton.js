import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ActionButton({ mode, onPress }) {
    const label = mode === "order" ? "Order" : "Book Table";

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 15,
        right: 15,
        backgroundColor: "#009DE0",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
        elevation: 10,
    },

    text: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
});

