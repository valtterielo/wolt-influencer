import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function FloatingSearchBar({ value, onChange }) {
    const [local, setLocal] = useState(value);

    //debounce
    useEffect(() => {
        const t = setTimeout(() => {
            onChange(local);
        }, 300);

        return () => clearTimeout(t);
    }, [local]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search restaurants, food, vibe..."
                placeholderTextColor="#999"
                value={local}
                onChangeText={setLocal}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 55,
        alignSelf: "center",
        width: "90%",
        zIndex: 100,
    },
    input: {
        backgroundColor: "rgba(0,0,0,0.45)",
        padding: 14,
        borderRadius: 12,
        color: "#fff",
        fontSize: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)"
    },
});
