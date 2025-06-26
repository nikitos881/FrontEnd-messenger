import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    label: {
        fontSize: 12,
        color: COLORS.black,
        marginTop: 4,
        fontWeight: '500',
    },
    topUnderline: {
        position: 'absolute',
        top: -10,
        height: 3,
        width: 81,
        backgroundColor: COLORS.plum
        },
    });
