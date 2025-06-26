import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import { HEADERCHATS } from "../../../shared/ui/header";
import { CHATSHEADER } from "../../../shared/ui/chats-header";
import { FOOTER } from "../../../shared/ui/footer";
import { GroupChatsPage } from "../../../modules/auth/ui/chats/group-chats";

export default function Contacts() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="auto" />
            <HEADERCHATS/>
            <CHATSHEADER/>

            <View style={{ paddingBlockStart: 8, paddingBlockEnd: 12, flex: 1, backgroundColor: "#FAF8FF"}}>
                <GroupChatsPage/>
            </View>

            <FOOTER/>
        </SafeAreaView>
    );
}
