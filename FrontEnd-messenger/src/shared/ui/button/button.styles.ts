import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";
export const styles = StyleSheet.create({
	button: {
		width: 311,
		height: 52,
		borderRadius: 1234,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.plum,
		color: COLORS.white,
	},
	disabled: {
		borderWidth: 2,
		borderColor: COLORS.white,
		opacity: 0.5,
	},
});
