import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/constants";


export const styles = StyleSheet.create({
    groupChatContainer: {
        width: "100%",
        backgroundColor: COLORS.white,
        flex: 1,
        borderRadius: 10,
        borderColor: "#CDCED2",
        borderWidth: 1,
        marginTop: 8,
        padding: 16,
        flexDirection: "column",
        marginBottom: 12
    }, 
    avatar: {
        width: 66,
        height: 66,
        borderRadius: 95,
        marginRight: 10,
    },
    contactAvatar: {
        width: 66,
        height: 66,
        borderRadius: 20,
        marginRight: 10,
    },
    avatar2: {
        width: 37,
        height: 37,
        borderRadius: 95,
        marginRight: 10,
    },
    contactAvatar2: {
        width: 37,
        height: 37,
        borderRadius: 20,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
		fontSize: 14,
        padding: 16,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CDCED2",
        color: "#81818D",
        alignSelf: "flex-start",
        width: "65%"
    },
})