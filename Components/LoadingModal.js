import React from "react";
import { Modal, View, ActivityIndicator, Text, StyleSheet } from "react-native";

export default function LoadingModal({ visible, title = "Loading..." }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.box}>
                    <ActivityIndicator size="large" color="#009DE0" />
                    <Text style={styles.text}>{title}</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        backgroundColor: "#1A1F24",
        paddingVertical: 30,
        paddingHorizontal: 40,
        borderRadius: 14,

        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 8,
    },
    text: {
        color: "#fff",
        marginTop: 15,
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
});
