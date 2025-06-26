import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginForm } from "../../modules/auth/ui";
import { Text, View, ImageBackground } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "../../shared/constants";
import { IMAGES } from "../../shared/ui/images";
// import { EmailVerificationScreen } from "../../modules/auth/ui/auth/email-form";

export default function Code() {
    return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style="auto" />
                {/* <EmailVerificationScreen /> */}
                <View
                    style={{
                        flex: 0.5,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}>
                    <Text style={{ color: COLORS.grey }}>
                        Already have an account?
                    </Text>
                    <Link href={"/register"} style={{ color: COLORS.black }}>
                        Register now
                    </Link>
                </View>
            </SafeAreaView>
    );
}
