import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#CDCED2",

        borderRadius: 10,

        gap: 24,
        padding: 16,

    },
    header: {
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "500",
        color: COLORS.lightGrey,
    },


    avatar: {
        width: 46,
        height: 46,
        borderRadius: 20,
        marginRight: 10,
    },
    contactItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },
    contactAvatar: {
        width: 46,
        height: 46,
        borderRadius: 20,
        marginRight: 10,
    },
    contactName: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.black,
    },
    textMessage: {
        fontSize: 14,
        color: COLORS.black,
    },
    contactDetails: {
        flex: 1,
        justifyContent: "center",
    },


});