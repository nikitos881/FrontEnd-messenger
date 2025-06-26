import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { HEADERCHATS } from "../../../shared/ui/header";
import { FOOTER } from "../../../shared/ui/footer";
import { OtherProfilePage } from "../../../modules/auth/ui/friends/other-profile";

export default function Home() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="auto" />
            <HEADERCHATS/>
            <View style={{ flex: 1, backgroundColor: "#FAF8FF"}}>
                <OtherProfilePage/>
            
            </View>
            <FOOTER/>
        </SafeAreaView>
    );
}
