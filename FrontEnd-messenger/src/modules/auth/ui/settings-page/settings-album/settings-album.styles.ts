import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/constants";


export const styles = StyleSheet.create({
    textButtonsUp: {
        alignItems: "center",
    },
    textButtonsUpInfo: {
        color: "#81818D",
        fontSize: 16,
        fontWeight: 700
    },
    textButtonsUpAlbum: {
        color: COLORS.black,
        fontSize: 16,
        borderBottomColor: COLORS.black,
        borderBottomWidth: 2,
        fontWeight: 700
    },
    personalCard: {
        width: "100%",
        backgroundColor: COLORS.white,
        height: 260,
        borderRadius: 10,
        borderColor: COLORS.black,
        borderWidth: 1,
        marginTop: 25
    },
    myPhotos: {
        width: "100%",
        backgroundColor: COLORS.white,
        height: 320,
        borderRadius: 10,
        borderColor: COLORS.black,
        borderWidth: 1,
        marginTop: 10,
        padding: 20,
        flexDirection: "column",
        gap: 16
    },
    containerTextAndImage: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    albumsList: {
        width: "100%",
        backgroundColor: COLORS.white,
        height: 72,
        borderRadius: 10,
        borderColor: COLORS.black,
        borderWidth: 1,
        marginTop: 10,
        padding: 20,
        flexDirection: "column",
        justifyContent: "center"
    },
    containerAlbum: { 
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center", 
        padding: 16, 
        backgroundColor: "#fff" 
    },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
    albumCard: { padding: 16, borderWidth: 1, borderColor: "#eee", borderRadius: 8, marginBottom: 12 },
    albumTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
    albumImage: { width: 80, height: 80, borderRadius: 8, marginRight: 8, backgroundColor: "#eee" },
    imagesList: { marginBottom: 8 },
    noImagesText: { color: "#888", marginBottom: 8 },
    emptyText: { textAlign: "center", color: "#888", marginTop: 32, fontSize: 16 },
    iconButton: {
        borderWidth: 1,
        borderColor: COLORS.plum,
        borderRadius: 50,
        padding: 0,
        marginLeft: 10,
    },

})