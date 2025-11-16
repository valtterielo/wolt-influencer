import * as React from "react";
import { BottomNavigation } from "react-native-paper";

import ExploreScreen from "./ExploreScreen";
import RestaurantsScreen from "./RestaurantsScreen";
import ShopsScreen from "./ShopsScreen";
import SearchScreen from "./SearchScreen";
import ProfileScreen from "./ProfileScreen";

export default function Navigator() {
    const [index, setIndex] = React.useState(0);

    const routes = [
        { key: "explore", title: "Explore", focusedIcon: "compass" },
        { key: "restaurants", title: "Restaurants", focusedIcon: "silverware-fork-knife" },
        { key: "shops", title: "Shops", focusedIcon: "storefront-outline" },
        { key: "search", title: "Search", focusedIcon: "magnify" },
        { key: "profile", title: "Profile", focusedIcon: "account" },
    ];

    const renderScene = ({ route }) => {
        switch (route.key) {
            case "explore":
                return <ExploreScreen isFocused={index === 0} goToRestaurants={() => setIndex(1)} />;
            case "restaurants":
                return <RestaurantsScreen isFocused={index === 1} />;
            case "shops":
                return <ShopsScreen isFocused={index === 2} />;
            case "search":
                return <SearchScreen isFocused={index === 3} />;
            case "profile":
                return <ProfileScreen isFocused={index === 4} />;
            default:
                return null;
        }
    };


    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}

            shifting={false}
            sceneAnimationEnabled={false}

            activeColor="#009DE0"
            inactiveColor="#9BA2AD"

            barStyle={{
                backgroundColor: "#0F141A",
                borderTopWidth: 0.5,
                borderTopColor: "#1C232A",
            }}

            activeIndicatorStyle={{
                backgroundColor: "transparent",
            }}
        />
    );
}
