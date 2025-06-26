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
    containerTextUp: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    AllFriendsContainer: {
        width: "100%",
        backgroundColor: COLORS.white,
        // height: 590,
        flex: 1,
        borderRadius: 10,
        borderColor: "#CDCED2",
        borderWidth: 1,
        marginTop: 20,
        padding: 20,
        flexDirection: "column",
        // justifyContent: "center"
        marginBottom: 17
    },
    profileOfUser: {
        width: "100%",
        height: 315,
        paddingTop: 14,
        paddingBottom: 14,
        gap: 16,
        borderColor: "#CDCED2",
        borderWidth: 1, 
        borderRadius: 10,
        flexDirection: "column",
        marginTop: 14        
    },
    POFImageAndOther: {
        height: 175, 
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: 20
    },
    POFImage: {
        width: 120,
        height: 120
    },
    POFText: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 9
    },
    POFButtons: {
        width: "100%",
        flexDirection: "row",
        gap: 15,
        height: 45,
        justifyContent: "center"
    },
    buttonWhite: {
        // width: 102,
        height: "100%",
        borderRadius: 1234,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.black,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16
    },
    buttonPlum: {
        // width: 130,
        height: "100%",
        borderRadius: 1234,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.plum,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16
    },
})