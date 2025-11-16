import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigator from "./Screens/Navigator";
import { VideoProvider } from "./Context/VideoContext";
import { APIKeyProvider } from "./Context/APIKeyContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <APIKeyProvider>
        <VideoProvider>
          <Navigator />
        </VideoProvider>
      </APIKeyProvider>
    </SafeAreaProvider>
  );
}
