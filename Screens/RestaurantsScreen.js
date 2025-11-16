import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function RestaurantsScreen() {
    const data = require("../assets/data/Restaurants.json");

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Restaurants</Text>
            <Text style={styles.jsonText}>
                {JSON.stringify(data, null, 2)}
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 20,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        marginTop: 35,
        marginBottom: 20,
    },
    jsonText: {
        color: "#009DE0",
        fontFamily: "Courier",
        fontSize: 14,
        lineHeight: 20,
    },
});
