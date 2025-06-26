import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/constants";

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        margin: 20,
        justifyContent: "center",
        height: 504,
    },

    textContainer: {
        alignItems: "center",
		justifyContent: "center",
    },

    text: {
        fontWeight: 500,
		fontSize: 24,
    },

    form: {
        gap: 10,
        padding: 20,
    },

    buttonBlock: {
        alignSelf: "center",
        marginTop: 20,
        color: COLORS.white,
    },

    buttonBlockText: {
        color: COLORS.white,
    },

    textButtonsUpReg: {
        color: COLORS.black,
        fontSize: 24,
        fontWeight: "700",
        borderBottomColor: COLORS.plum,
        borderBottomWidth: 2,
    },

    textButtonsUpLog: {
        color: "#81818D",
        fontSize: 24,
    },

    textButtonsUp: {
        alignItems: "center",
		// justifyContent: "center",
    },

    container2: {
        width: "auto",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 24,
        fontSize: 24,
    },

    container3: {
        // height: "100%",
        // width: "auto",
        // alignItems: "center",
        marginBottom: 50,
        flexDirection: "column",
        justifyContent: "center",
    },
})