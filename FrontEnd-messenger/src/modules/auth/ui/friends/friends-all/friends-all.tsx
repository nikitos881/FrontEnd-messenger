import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, ScrollView } from "react-native";
import { IMAGES } from "../../../../../shared/ui/images";
import { styles } from "./friends-all.styles";
import { useEffect, useState } from "react";
import { getAuthToken } from "../../../../../shared/tools/authStorage";
import { UserData } from "../../../types/user";

export function FriendsAllPage(){
    const [userFriends, setUserFriends] = useState<UserData['friends'] | null>(null); // Переменная для хранения данных пользователя>
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
          async function fetchUser() {
              const token = await getAuthToken();
            // setToken(token);
              console.log("Токен получен:", token);
              try {
                if (!token || token === "null") {
                  setIsLoading(false);
                  console.log("Токен не найден");
                  return;
                }
                const response = await fetch("http://172.20.10.7:5000/api/usernative/me", {
                  headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const result = await response.json();
              if (result.status !== "ok" || !result.data) {
                throw new Error(result.message || "Ошибка загрузки данных пользователя");
              }
              setUserFriends(result.data.friends);
              console.log("User data fetched:", result.data.friends);
            } catch (error) {
              Alert.alert("Ошибка", error instanceof Error ? error.message : "Ошибка при загрузке профиля");
            } finally {
              setIsLoading(false);
            }
          }
          fetchUser();
          }, []);
    


    
    return(
        <View style={{flex:1, flexDirection: "column", paddingTop: 25, justifyContent: "center"}}>
            <ScrollView>
            <View style={{width: "100%", flexDirection: "row", gap: 16, justifyContent:"center"}}>
                        <TouchableOpacity 
                        style={styles.textButtonsUp}
                    >
                        <Text style={styles.textButtonsUpMain}>Всі друзі</Text>
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
                            router.push("/friends-recommendations")
                        }}
                    >
                       <Text style={styles.textButtonsUpOther}>Рекомендації</Text>
                    </TouchableOpacity>
                </View>
    
                <View style={styles.AllFriendsContainer}>
                    <View style={styles.containerTextUp}>
                        <Text style={{fontWeight: 500, fontSize: 16}}>Всі друзі</Text>
                        {/* <TouchableOpacity><Text style={{color: "#543C52", fontSize:16, fontWeight: 500}}></Text></TouchableOpacity> */}
                    </View>


                    <View style={{flexDirection:"column", gap: 7, height: "100%"}}>


                    { userFriends && userFriends.map((friend) => (
                        <TouchableOpacity
                            onPress={() => {
                                router.push(`/other-profile?userId=${friend.id}`);
                            }}
                            key={friend.id}>
                            <View style={styles.profileOfUser}>
                                <View style={styles.POFImageAndOther}>
                                    <View style={styles.POFImage}>
                                        <IMAGES.profileImage style={{width: 120, height: 120, borderRadius: 95}}/>
                                    </View>
        
                                    <View style={styles.POFText}>
                                        <Text style={{fontWeight: 700, fontSize: 20}}>{friend.username}</Text>
                                        <Text>{friend.username}</Text>
                                    </View>

                                    <View style={styles.POFButtons}>
                                        <TouchableOpacity style={styles.buttonPlum}><Text style={{color: "#FFFFFF", fontSize: 13, fontWeight: 500}}>Повідомлення</Text></TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonWhite}><Text style={{color: "#543C52", fontSize: 13, fontWeight: 500}}>Видалити</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                </View>
            </ScrollView>
        </View>
    )
}