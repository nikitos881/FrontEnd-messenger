    import { StyleSheet } from "react-native";
    import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#fff',
        // borderBottomWidth: 1,
        // borderBottomColor: '#d3d3d3',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        width: 140,
        height: 40,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        borderWidth: 1,
        borderColor: COLORS.plum,
        borderRadius: 50,
        padding: 0,
        marginLeft: 10,
    },
    iconButtonActive: {
        backgroundColor: COLORS.plum50,
        borderWidth: 1,
        borderColor: COLORS.plum,
        borderRadius: 50,
        padding: 0,
        marginLeft: 10,
    },
    });



    