import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/constants";


export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        margin: 20,
		justifyContent: "center",
        height: 443,
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
        padding: 20
    },

    buttonBlock: {
        alignSelf: "center",
        color: COLORS.white,
    },

    textButtonsUpReg: {
        color: "#81818D",
        fontSize: 24,
    },

    textButtonsUpLog: {
        color: COLORS.black,
        fontSize: 24,
        fontWeight: "700",
        borderBottomColor: COLORS.plum,
        borderBottomWidth: 2,
    },

    textButtonsUp: {
        alignItems: "center",
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
        marginBottom: 50,
        flexDirection: "column",
        justifyContent: "center",
    },

    buttonBlockText: {
        color: COLORS.white,
    },
})