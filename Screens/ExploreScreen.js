import React from "react";
import { View, StyleSheet } from "react-native";
import VideoFeed from "../Components/VideoFeed";

export default function ExploreScreen({ isFocused, goToRestaurants }) {
    return (
        <View style={styles.container}>
            <VideoFeed isFocused={isFocused} goToRestaurants={goToRestaurants} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
});
