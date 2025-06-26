import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, ImageBackground } from "react-native";
import { RegisterStepOne } from "../../modules/auth/ui";
import { COLORS } from "../../shared/constants";
import { IMAGES } from "../../shared/ui/images";
import { HEADERAUTH } from "../../shared/ui/header";


export default function Register() {
	return (
			<SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
				<StatusBar style="auto" />
				
				<HEADERAUTH/>
				
				<View style={{ flex: 1, backgroundColor: "#E9E5EE", justifyContent: "center"}}>
					<RegisterStepOne />
				</View>
			</SafeAreaView>
	);
}
