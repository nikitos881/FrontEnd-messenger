import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { HEADERCHATS } from "../../../shared/ui/header";
import { FOOTER } from "../../../shared/ui/footer";
import { FriendsMainPage } from "../../../modules/auth/ui/friends/friends-main";
import { FriendsHeader } from "../../../modules/auth/ui/friends/friends-header/friends-header";

export default function Home() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="auto" />
            <HEADERCHATS/>
            <View style={{ flex: 1, backgroundColor: "#FAF8FF"}}>
                {/* <FriendsHeader/> */}
                <FriendsMainPage/>
            
            </View>
            <FOOTER/>
        </SafeAreaView>
    );
}
