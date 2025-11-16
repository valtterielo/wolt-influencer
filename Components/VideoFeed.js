import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import { useVideos } from "../Context/VideoContext";
import FloatingSearchBar from "../Components/FloatingSearchBar";

const restaurantData = require("../assets/data/Restaurants.json");

export default function VideoFeed({ isFocused, goToRestaurants }) {
    const { videos } = useVideos();
    const videoRefs = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewHeight, setViewHeight] = useState(0);

    const [search, setSearch] = useState("");
    const filteredVideos = videos.filter(v =>
        v.name.toLowerCase().includes(search.toLowerCase())
    );

    // ---- AUTOPLAY WHEN SCROLLING ----
    const onViewableItemsChanged = useCallback(
        ({ viewableItems }) => {
            if (!viewableItems.length || !isFocused) return;

            const idx = viewableItems[0].index;
            setCurrentIndex(idx);

            videoRefs.current.forEach((ref, i) => {
                if (!ref) return;
                if (i === idx && isFocused) ref.playAsync();
                else ref.pauseAsync();
            });
        },
        [isFocused]
    );

    // ---- PAUSE WHEN TAB NOT FOCUSED ----
    useEffect(() => {
        if (!isFocused) {
            videoRefs.current.forEach((ref) => ref?.pauseAsync());
        } else {
            const current = videoRefs.current[currentIndex];
            current?.playAsync();
        }
    }, [isFocused, currentIndex]);

    return (
        <View
            style={{ flex: 1 }}
            onLayout={(e) => setViewHeight(e.nativeEvent.layout.height)}
        >
            {/* 🔍 Floating Search Bar */}
            <FloatingSearchBar value={search} onChange={setSearch} />

            {viewHeight > 0 && (
                <FlatList
                    data={filteredVideos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        const restaurant = restaurantData.find(
                            (r) => r.name === item.name
                        );

                        const tags = item.tags?.slice(0, 2) || [];
                        const mode = restaurant?.mode;

                        return (
                            <View style={[styles.page, { height: viewHeight }]}>
                                <Video
                                    ref={(ref) => (videoRefs.current[index] = ref)}
                                    source={item.uri}
                                    style={styles.video}
                                    resizeMode="cover"
                                    isLooping
                                    shouldPlay={isFocused && index === currentIndex}
                                />

                                {/* --- SIMPLE TAG ROW + BUTTON --- */}
                                <View style={styles.simpleTagBar}>
                                    <View style={styles.tagRow}>
                                        {tags.map((t, i) => (
                                            <View key={i} style={styles.tagChipSimple}>
                                                <Text style={styles.tagText}>{t}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    {mode && (
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={goToRestaurants}
                                        >
                                            <Text style={styles.actionText}>
                                                {mode === "order" ? "Order" : "Reserve"}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        );
                    }}
                    pagingEnabled
                    snapToInterval={viewHeight}
                    decelerationRate="fast"
                    snapToAlignment="start"
                    showsVerticalScrollIndicator={false}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{ itemVisiblePercentThreshold: 90 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: "black",
    },
    video: {
        width: "100%",
        height: "100%",
    },

    simpleTagBar: {
        position: "absolute",
        bottom: 10,
        left: 15,
        right: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    tagRow: {
        flexDirection: "row",
        gap: 8,
        flexShrink: 1,
    },

    tagChipSimple: {
        backgroundColor: "rgba(0,0,0,0.55)",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        marginRight: 8,
    },

    tagText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
    },

    /* --- Order / Reserve Button --- */
    actionButton: {
        backgroundColor: "#009DE0",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        marginLeft: 10,
    },
    actionText: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
});
