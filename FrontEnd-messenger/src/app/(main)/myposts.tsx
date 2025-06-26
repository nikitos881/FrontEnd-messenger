import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { HEADER } from "../../shared/ui/header";
import { FOOTER } from "../../shared/ui/footer";
import { MyPostBlock } from "../../modules/auth/ui/post-block";

export default function MyPosts() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="auto" />
            <HEADER/>
            <View style={{ flex: 1, backgroundColor: "#FAF8FF"}}>
                <MyPostBlock/>
                
            </View>
            <FOOTER/>
        </SafeAreaView>
    );
}
