import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { useAPIKey } from "../Context/APIKeyContext";
import VideoUploader from "../Components/VideoUploader";

export default function ProfileScreen() {
    const { apiKey, saveApiKey } = useAPIKey();
    const [input, setInput] = useState(apiKey);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <Text style={styles.subtitle}>OpenAI API Key</Text>

            <TextInput
                style={styles.input}
                placeholder="Paste your OpenAI API key..."
                placeholderTextColor="#888"
                value={input}
                onChangeText={setInput}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.saveButton}
                onPress={() => saveApiKey(input)}
            >
                <Text style={styles.saveText}>Save API Key</Text>
            </TouchableOpacity>

            <VideoUploader />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#0F141A",
    },
    title: {
        color: "#fff",
        fontSize: 28,
        marginTop: 40,
        marginBottom: 10,
        fontWeight: "700",
    },
    subtitle: {
        color: "#ccc",
        fontSize: 16,
        marginBottom: 4,
        marginTop: 10,
    },
    input: {
        backgroundColor: "#1A1F24",
        padding: 14,
        borderRadius: 10,
        color: "#fff",
        marginBottom: 10,
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: "#009DE0",
        padding: 14,
        borderRadius: 10,
        marginBottom: 30,
    },
    saveText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
    },
});
