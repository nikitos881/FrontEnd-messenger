import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, ScrollView, Image, FlatList } from "react-native";
import { styles } from "./other-profile.styles";
import { IMAGES } from "../../../../../shared/ui/images";
import { useEffect, useState } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import { COLORS } from "../../../../../shared/constants";
import { MyPostBlock } from "../../post-block";
import { UserData } from "../../../types/user";
import { Posts } from "../../post-block/posts";
import { Post } from "../../../types/post";
import { Album } from "../../../types/album";
import { Button } from "../../../../../shared/ui/button";

export function OtherProfilePage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");

    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState<Post[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://172.20.10.7:5000/api/usernative/${userId}`);
                const result = await response.json();
                setUserData(result.data);
                console.log("User data fetched:", result.data);
            } catch (error) {
                console.error("Ошибка загрузки данных пользователя:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log("userId other:", userId);
                const response = await fetch(`http://172.20.10.7:5000/api/posts/${userId}/userPosts`);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Ошибка загрузки постов:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPosts();
    }, [userId]);

    const fetchAlbums = async () => {
        setIsLoading(true);
        try {
          const res = await fetch("http://172.20.10.7:5000/api/albums/all");
          const data = await res.json();
          // Исправлено: поддержка разных форматов ответа
          if (data.status === "ok" && Array.isArray(data.data)) setAlbums(data.data);
          else if (Array.isArray(data)) setAlbums(data); // если просто массив
          else setAlbums([]); // если ничего не пришло
        } catch (e) {
          Alert.alert("Ошибка", "Не удалось загрузить альбомы");
          setAlbums([]);
        } finally {
            setIsLoading(false);
        }
      };
    
      useEffect(() => {
        if (userId) {
          fetchAlbums();
        }
      }, [userId]);


    if (!userId) {
        return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Користувача не знайдено :( </Text>;
        </View>)
    }

    if (userData === null) {
        return (
            <Posts postList={[]} loading={true} />
        )
    }
    return (
        <View style={{flex:1, flexDirection:"column", paddingBottom:20}}>
            <ScrollView>
                <View style={styles.profileContainer}>
                    <View style={{flexDirection:"column", gap: 7, height: "100%"}}>
                        <View style={styles.profileOfUser}>
                            <View style={styles.POFImageAndOther}>
                                <View style={styles.POFImage}>
                                    <Image source={{ uri: userData.image }} style={{width: 120, height: 120, borderRadius: 95}} />
                                </View>
                    
                                <View style={styles.POFText}>
                                    <Text style={{fontWeight: 700, fontSize: 20}}>{userData.firstName} {userData.lastName}</Text>
                                    <Text style={{fontSize: 13, color: COLORS.grey}}>@{userData.username}</Text>
                                </View>

                                <View style={{height:43, width:"100%", flexDirection:"row", justifyContent: "center"}}>
                                    <View style={{borderRightWidth: 1, borderRightColor:"#CDCED2", width: "33%", flexDirection:"column", gap:0, alignItems:"center"}}>
                                        <Text style={{fontSize:13, fontWeight:700}}>{userData.postCount}</Text>
                                        <Text style={{color:"#81818D", fontWeight:500, fontSize:13}}>Дописи</Text>
                                    </View>
                                    <View style={{borderRightWidth: 1, borderRightColor:"#CDCED2", width: "33%", flexDirection:"column", gap:0, alignItems:"center"}}>
                                        <Text style={{fontSize:13, fontWeight:700}}>{userData.friendCount}</Text>
                                        <Text style={{color:"#81818D", fontWeight:500, fontSize:13}}>Читачі</Text>
                                    </View>
                                    <View style={{width: "33%", flexDirection:"column", gap:0, alignItems:"center"}}>
                                        <Text style={{fontSize:13, fontWeight:700}}>{userData.friendCount}</Text>
                                        <Text style={{color:"#81818D", fontWeight:500, fontSize:13}}>Друзі</Text>
                                    </View>
                                </View>
                    
                                {/* <View style={styles.POFButtons}>
                                    <TouchableOpacity style={styles.buttonPlum}><Text style={{color: "#FFFFFF", fontSize: 13, fontWeight: 500}}>Підтвердити</Text></TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonWhite}><Text style={{color: "#543C52", fontSize: 13, fontWeight: 500}}>Видалити</Text></TouchableOpacity>
                                </View> */}
                            </View>
                        </View>
                    
                        
                    </View>

                    
                
                
                </View>
                <View style={styles.albumsList}>
                    <View style={{height: 72, flexDirection:"row", justifyContent: "space-between", width: "100%", borderColor:"#CDCED2", borderBottomWidth:1}}>
                        <View style={{flexDirection:"row", alignItems: "center"}}><View style={{height:"100%", flexDirection:"column", justifyContent:"center"}}><IMAGES.AddImageImage2 style={{width:20, height:20}} /></View><Text style={{fontWeight: 500, fontSize: 16, color:"#81818D"}}>Альбоми</Text></View>
                        <TouchableOpacity style={{flexDirection:"column", justifyContent:"center"}}><Text style={{color: "#543C52", fontSize:15, fontWeight: 500}}>Дивитись всі</Text></TouchableOpacity>

                    </View>

                    <View style={{flexDirection:"column", gap:8}}>
                        <Text style={{fontWeight:500, fontSize: 15}}>Настрій</Text>
                        <View style={{flexDirection:"row", gap:14}}><Text style={{fontSize: 15}}>Природа</Text><Text style={{fontSize: 15, color:"#81818D"}}>2025 рік </Text></View>
                        <View style={{width:"100%", height:175}}><IMAGES.ExampleAlbumImage style={{width:"100%", height:"100%", borderRadius:10}} /></View>
                    </View>
                    {/* <FlatList
                                data={albums}
                                keyExtractor={(item) => item.id.toString()}
                                ListEmptyComponent={
                                    <Text style={styles.textButtonsUp}>Немає ще жодного альбому</Text>
                                }
                                    renderItem={({ item }) => (
                                        <View style={{flexDirection:"column", gap:8}}>
                                            <Text style={{fontWeight:500, fontSize: 15}}>{item.title}</Text>
                                            <Text style={{fontSize: 15}}>Фотографіїї</Text>
                                            {item.images && item.images.length > 0 ? (
                                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                                                {item.images.map((img) => (
                                                    <Image
                                                    key={img.id.toString()}
                                                    source={{ uri: img.url }}
                                                    style={{width:"100%", height:"100%", borderRadius:10}}
                                                    />
                                                ))}
                                                </ScrollView>
                                            ) : (
                                                <Text style={{fontSize: 15}}>Нет картинок</Text>
                                            )}
                                        </View>
                                    )}
                                /> */}
                </View>


                    <Posts postList={posts} loading={isLoading}/>
                
            </ScrollView>
        </View>
    )
}