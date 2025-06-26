import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
	inputBox: {
		height:50,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
		borderRadius: 10,
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.blue20,
	},
	input: {
        flex: 1,
        height: '100%',
		fontSize: 20,
    },
	label: {
		fontWeight: 500,
		fontSize: 17,
	},
	errorBox: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	},
	errMsg: {
		color: COLORS.error,
		fontSize: 17,
	},
});
