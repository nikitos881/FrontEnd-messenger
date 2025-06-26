import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, ScrollView } from "react-native";
import { IMAGES } from "../../../../../shared/ui/images";
import { styles } from "./friends-header.styles";

export function FriendsHeader(){

    return(
        <View style={{width: "100%", flexDirection: "row", gap: 16, justifyContent:"center"}}>
                <TouchableOpacity 
                style={styles.textButtonsUp}
            >
                <Text style={styles.textButtonsUpMain}>Головна</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.textButtonsUp}
                onPress={() => {
                    router.push("/friends-requests")
                }}
            >
                <Text style={styles.textButtonsUpOther}>Запити</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.textButtonsUp}
                onPress={() => {
                    router.push("/friends-recommendations")
                }}
            >
                <Text style={styles.textButtonsUpOther}>Рекомендації</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.textButtonsUp}
                onPress={() => {
                    router.push("/friends-all")
                }}
            >
                <Text style={styles.textButtonsUpOther}>Всі друзі</Text>
            </TouchableOpacity>
        </View>
)};