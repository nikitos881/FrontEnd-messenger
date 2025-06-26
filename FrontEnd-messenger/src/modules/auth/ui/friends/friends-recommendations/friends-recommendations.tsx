import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, ScrollView } from "react-native";
import { IMAGES } from "../../../../../shared/ui/images";
import { styles } from "./friends-recommendations.style"


export function FriendsRecommendationsPage(){


    return(
        <View style={{flex:1, flexDirection: "column", paddingTop: 25, justifyContent: "center"}}>
            <ScrollView>
                <View style={{width: "100%", flexDirection: "row", gap: 16, justifyContent:"center"}}>
                        <TouchableOpacity 
                        style={styles.textButtonsUp}
                    >
                        <Text style={styles.textButtonsUpMain}>Рекомендації</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.textButtonsUp}
                        onPress={() => {
                            router.push("/friends-main")
                        }}
                    >
                       <Text style={styles.textButtonsUpOther}>Головна</Text>
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
                            router.push("/friends-all")
                        }}
                    >
                       <Text style={styles.textButtonsUpOther}>Всі друзі</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.recommendationsContainer}>
                    <View style={styles.containerTextUp}>
                        <Text style={{fontWeight: 500, fontSize: 16}}>Рекомендації</Text>
                        <TouchableOpacity><Text style={{color: "#543C52", fontSize:16, fontWeight: 500}}></Text></TouchableOpacity>
                    </View>


                    <View style={{flexDirection:"column", gap: 7, height: "100%"}}>
                        <View style={styles.profileOfUser}>
                            <View style={styles.POFImageAndOther}>
                                <View style={styles.POFImage}>
                                    <IMAGES.profileImage style={{width: 120, height: 120, borderRadius: 95}}/>
                                </View>
    
                                <View style={styles.POFText}>
                                    <Text style={{fontWeight: 700, fontSize: 20}}>Lina Li</Text>
                                    <Text>@thelili</Text>
                                </View>

                                <View style={styles.POFButtons}>
                                    <TouchableOpacity style={styles.buttonPlum}><Text style={{color: "#FFFFFF", fontSize: 13, fontWeight: 500}}>Додати</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonWhite}><Text style={{color: "#543C52", fontSize: 13, fontWeight: 500}}>Видалити</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.profileOfUser}>
                            <View style={styles.POFImageAndOther}>
                                <View style={styles.POFImage}>
                                    <IMAGES.profileImage style={{width: 120, height: 120, borderRadius: 95}}/>
                                </View>
    
                                <View style={styles.POFText}>
                                    <Text style={{fontWeight: 700, fontSize: 20}}>Lina Li</Text>
                                    <Text>@thelili</Text>
                                </View>

                                <View style={styles.POFButtons}>
                                    <TouchableOpacity style={styles.buttonPlum}><Text style={{color: "#FFFFFF", fontSize: 13, fontWeight: 500}}>Додати</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonWhite}><Text style={{color: "#543C52", fontSize: 13, fontWeight: 500}}>Видалити</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}