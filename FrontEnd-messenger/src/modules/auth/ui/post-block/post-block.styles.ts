import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants";


export const styles = StyleSheet.create({
    container: {
        marginBlockStart: 8,
        // padding: 16,
        backgroundColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 10,
    },
    header: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center",
        // marginBottom: 8,
        // padding: 4,
        gap: 8,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontWeight: "500",
        fontSize: 16,
    },
    content: {
        padding: 16,
        // marginTop: 8,
        borderColor: "#ddd",
        borderTopWidth: 1,

    },
    text: {
        fontSize: 16,
        lineHeight: 20,
        marginTop: 8,
        // gap: 16,
        // marginVertical: 8,
    },
    tags: {
        color: COLORS.plum,
        fontSize: 16,
        marginRight: 8,
        // marginBottom: 12,
    },
    link: {
        color: COLORS.plum,
        fontSize: 16,
        marginRight: 8,
        marginTop: 12,    
        // marginBottom: 12,
    },
    imageGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 8,
    },
    image: {
        width: "48%",
        height: 150,
        borderRadius: 16,
        marginBottom: 8,
    },
    footer: {
        flexDirection: "row",
        marginTop: 12,
        gap: 24,
    },
    footerText: {
        fontSize: 13,
        color: COLORS.black,
    },
    icons: {
        flexDirection: "row", 
        alignItems: "center",
        gap: 8,
    },

    imgageContainer: {
        borderRadius: 16,
        marginBottom: 8,
        backgroundColor: '#eee',

    },
});
