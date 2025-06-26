import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, ScrollView } from "react-native";
import { IMAGES } from "../../../../../shared/ui/images";
import { styles } from "./friends-requests.styles";

export function FriendsRequestsPage(){
    return(
        <View style={{flex:1, flexDirection: "column", paddingTop: 25, justifyContent: "center"}}>
            {/* <Text>123</Text> */}
            <ScrollView>
                <View style={{width: "100%", flexDirection: "row", gap: 16, justifyContent:"center"}}>
                        <TouchableOpacity 
                        style={styles.textButtonsUp}
                    >
                        <Text style={styles.textButtonsUpMain}>Запити</Text>
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

                <View style={styles.requestsContainer}>
                    <View style={styles.containerTextUp}>
                        <Text style={{fontWeight: 500, fontSize: 16}}>Запити</Text>
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
                                    <TouchableOpacity style={styles.buttonPlum}><Text style={{color: "#FFFFFF", fontSize: 13, fontWeight: 500}}>Підтвердити</Text></TouchableOpacity>
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
                                    <TouchableOpacity style={styles.buttonPlum}><Text style={{color: "#FFFFFF", fontSize: 13, fontWeight: 500}}>Підтвердити</Text></TouchableOpacity>
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