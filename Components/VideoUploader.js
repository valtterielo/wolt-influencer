import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useVideos } from "../Context/VideoContext";
import { useAPIKey } from "../Context/APIKeyContext";
import LoadingModal from "./LoadingModal";
import { analyzeVideoForTags } from "../Utils/AI";

const AVAILABLE_VIDEOS = [
    { id: "4", name: "Nordic Sushi Bar", uri: require("../assets/videos/NordicSushiBar.mp4"), tags: [] },
    { id: "5", name: "Street Eats", uri: require("../assets/videos/StreetEats.mp4"), tags: [] },
];

export default function VideoUploader() {
    const { addVideo } = useVideos();
    const { apiKey } = useAPIKey();
    const [loading, setLoading] = useState(false);
    const [available, setAvailable] = useState(AVAILABLE_VIDEOS);

    async function handleUpload(video) {
        if (!apiKey) {
            alert("Please paste your OpenAI API key first!");
            return;
        }

        setLoading(true);

        try {
            //ai processing
            const tags = await analyzeVideoForTags(apiKey, video);

            //add video with tags
            addVideo({ ...video, tags });

            setAvailable(prev => prev.filter(v => v.id !== video.id));

        } catch (err) {
            console.error("AI Error:", err);
            alert("AI processing failed: " + err.message);
        }

        setLoading(false);
    }

    return (
        <View>
            <LoadingModal visible={loading} title="Analyzing video..." />

            <Text style={styles.sectionTitle}>Upload a Demo Video</Text>

            {available.length === 0 ? (
                <Text style={{ color: "#666", marginTop: 10 }}>
                    No demo videos left to upload
                </Text>
            ) : (
                available.map((video) => (
                    <TouchableOpacity
                        key={video.id}
                        style={styles.videoOption}
                        onPress={() => handleUpload(video)}
                    >
                        <Text style={styles.text}>Upload {video.name} Review</Text>
                    </TouchableOpacity>
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 10,
    },
    videoOption: {
        backgroundColor: "#1A1F24",
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
    },
    text: {
        color: "#fff",
        fontSize: 16,
    },
});
