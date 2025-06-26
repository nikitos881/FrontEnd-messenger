import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { HEADER } from "../../../shared/ui/header";
import { FOOTER } from "../../../shared/ui/footer";
import { getAuthToken } from "../../../shared/tools/authStorage";


import React, { useEffect, useState } from "react";
import { ProfileSettings } from "../../../modules/auth/ui/settings-page/profile-settings-TEMP/profile-settings";

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
                <ProfileSettings authToken={authToken}/>
            </View>
            <FOOTER/>
        </SafeAreaView>
    );
}
