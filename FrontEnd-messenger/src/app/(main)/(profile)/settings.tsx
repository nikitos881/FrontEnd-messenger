import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { HEADER, HEADERCHATS } from "../../../shared/ui/header";
import { FOOTER } from "../../../shared/ui/footer";
import { SettingsPage } from "../../../modules/auth/ui/settings-page/settings";

export default function Home() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="auto" />
            {/* <HEADER/> */}
            <HEADERCHATS/>
            <View style={{ flex: 1, backgroundColor: "#FAF8FF"}}>
                <SettingsPage/>
            
            </View>
            <FOOTER/>
        </SafeAreaView>
    );
}
