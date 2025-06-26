import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginForm } from "../../modules/auth/ui";
import { Text, View, ImageBackground } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "../../shared/constants";
import { IMAGES } from "../../shared/ui/images";
import { HEADERAUTH } from "../../shared/ui/header";


export default function Login() {
	return (
			<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
				<StatusBar style="auto" />

				<HEADERAUTH/>
				
				<View style={{ flex: 1, backgroundColor: "#E9E5EE", justifyContent: "center"}}>
					<LoginForm />
				</View>
			</SafeAreaView>
	);
}
