import React, { createContext, useState, useContext } from "react";

const VideoContext = createContext();

const initialVideos = [
    { id: "1", name: "Brasserie Lumiere", uri: require("../assets/videos/BrasserieLumiere.mp4"), tags: ["brasserie", "steak", "grilled", "wine", "elegant", "sophisticated", "business", "date", "dining", "tender", "flavorful"] },
    { id: "2", name: "Cafe Aurora", uri: require("../assets/videos/CafeAurora.mp4"), tags: ["coffee", "cappuccino", "croissant", "chocolate", "bakery", "cozy", "bright", "friendly", "barista", "takeaway", "relaxed", "breakfast"] },
    { id: "10", name: "Golden Crumb Bakery", uri: require("../assets/videos/GoldenCrumbBakery.mp4"), tags: ["bakery", "pastries", "bread", "coffee", "cinnamon", "bun", "cappuccino", "baked", "cozy", "warm", "sweet", "morning"] },
    { id: "3", name: "Luna Bistro", uri: require("../assets/videos/LunaBistro.mp4"), tags: ["bistro", "risotto", "mushroom", "creamy", "cozy", "romantic", "warm", "special", "dinner", "friendly", "attentive", "plating"] },
    { id: "8", name: "Stacked & Loaded", uri: require("../assets/videos/StackedLoaded.mp4"), tags: ["burger", "cheeseburger", "fries", "comfort", "grill", "cheese", "crispy", "juicy", "indulgent", "fluffy", "classic", "electric"] },
    { id: "6", name: "Maison Nordique", uri: require("../assets/videos/MaisonNordique.mp4"), tags: ["scandinavian", "reindeer", "lingonberry", "smoked", "potato", "puree", "candlelight", "wood", "calm", "elegant", "tender", "sweet"] },
    { id: "7", name: "Trattoria Bellamia", uri: require("../assets/videos/TrattoriaBellamia.mp4"), tags: ["italian", "cozy", "pizza", "pasta", "truffle", "margherita", "fresh", "thincrust", "creamy", "comfort", "casual", "warm"] },
    { id: "9", name: "El Camino Cart", uri: require("../assets/videos/ElCaminoCart.mp4"), tags: ["tacos", "birria", "beef", "consomme", "street", "slow-cooked", "savory", "spicy", "crispy", "colorful", "electric", "comforting"] },

];

export function VideoProvider({ children }) {
    const [videos, setVideos] = useState(initialVideos);

    const addVideo = (video) => {
        setVideos((prev) => [...prev, video]);   // append new video
    };

    const updateVideoTags = (id, tags) => {
        setVideos(prev =>
            prev.map(v =>
                v.id === id ? { ...v, tags } : v
            )
        );
    };

    return (
        <VideoContext.Provider value={{ videos, addVideo, updateVideoTags }}>
            {children}
        </VideoContext.Provider>
    );
}

export const useVideos = () => useContext(VideoContext);
