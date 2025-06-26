import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/constants";


export const styles = StyleSheet.create({
    textButtonsUp: {
        alignItems: "center",
    },
    textButtonsUpMain: {
        color: COLORS.black,
        fontSize: 14,
        borderBottomColor: COLORS.black,
        borderBottomWidth: 2,
        fontWeight: 700
    },
    textButtonsUpOther: {
        color: "#81818D",
        fontSize: 14,
        fontWeight: 700
    },
});