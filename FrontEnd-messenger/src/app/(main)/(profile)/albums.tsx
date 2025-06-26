import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { HEADER } from "../../../shared/ui/header";
import { FOOTER } from "../../../shared/ui/footer";
import { getAuthToken } from "../../../shared/tools/authStorage";



import React, { useEffect, useState } from "react";
import { AlbumsPage } from "../../../modules/auth/ui/settings-page/albums-page/albums-page";

export default function ProfileSettingsScreen() {
    const [authToken, setAuthToken] = useState<string>("");

    useEffect(() => {
        getAuthToken().then(token => setAuthToken(token ?? ""));
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="auto" />
            <HEADER/>
            <View style={{ flex: 1, backgroundColor: "#FAF8FF"}}>
                <AlbumsPage authToken={authToken}/>
            </View>
            <FOOTER/>
        </SafeAreaView>
    );
}
