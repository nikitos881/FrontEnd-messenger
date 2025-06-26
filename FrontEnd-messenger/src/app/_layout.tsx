import { Stack } from "expo-router";
import { Providers } from "./Providers";

export default function RootLayout() {
	return (
		<Providers>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name="index"
					options={{
						headerShown: false,
					}}
				></Stack.Screen>
			</Stack>
		</Providers>
	);
}
