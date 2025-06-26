import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/constants";


export const styles = StyleSheet.create({
    textButtonsUp: {
        alignItems: "center",
    },
    textButtonsUpInfo: {
        color: COLORS.black,
        fontSize: 16,
        borderBottomColor: COLORS.black,
        borderBottomWidth: 2,
        fontWeight: 700
    },
    textButtonsUpAlbum: {
        color: "#81818D",
        fontSize: 16,
        fontWeight: 700
    },
    personalCard: {
        width: "100%",
        backgroundColor: COLORS.white,
        height: 320,
        borderRadius: 10,
        borderColor: COLORS.black,
        borderWidth: 1,
        marginTop: 19,
        padding: 20,
        flexDirection: "column",
        // justifyContent: "center",
        gap: 20
    },
    personalInfo: {
        width: "100%",
        backgroundColor: COLORS.white,
        height: 550,
        borderRadius: 10,
        borderColor: COLORS.black,
        borderWidth: 1,
        // marginTop: 15,
        padding: 20,
    },
    profileCard: {
        width: "100%",
        backgroundColor: COLORS.white,
        height: 330,
        borderRadius: 10,
        borderColor: COLORS.black,
        borderWidth: 1,
        // marginTop: 25,
        padding: 20,
    },
    PCcontainer1: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    PCcontainer2: {
        height: 175, 
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: 20
    },
    profileImage: {
        width: 120,
        height: 120
    },
    profileNameText: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 9
    },
    inputs: {

    },
    allInputs: {
        paddingTop: 20,
        flexDirection: "column",
        gap: 14,
    }
})