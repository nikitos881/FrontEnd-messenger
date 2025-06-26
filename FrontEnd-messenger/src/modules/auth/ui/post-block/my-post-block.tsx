import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Alert } from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { COLORS } from "../../../../shared/constants";
import { styles } from "./post-block.styles";
import { useEffect, useState } from "react";
import { ModalWindow } from "../../../../shared/ui/modal/modal2";
import { useRef } from "react"; // Добавьте импорт
import { getAuthToken } from "../../../../shared/tools/authStorage";
import { router } from "expo-router";
import { Post } from "../../types/post";
import { Posts } from "./posts";
import { useSearchParams } from "expo-router/build/hooks";


export function MyPostBlock() {
    // const searchParams = useSearchParams(); 
    // const userId = searchParams.get("userId");

    // console.log("User ID:", userId);

    const [userData, setUserData] = useState<Post["user"] | null>(null);
  
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [token, setToken] = useState<string | null>(null);

  //   useEffect(() => {
  //     const fetchToken = async () => {
  //         const authToken = await getAuthToken();
  //         setToken(authToken);
  //         console.log("Токен получен:", authToken);
  //     };
  //     fetchToken();
  // }, []);

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
          setUserData(result.data);
          console.log("User data fetched:", result.data);
        } catch (error) {
          Alert.alert("Ошибка", error instanceof Error ? error.message : "Ошибка при загрузке профиля");
        } finally {
          setIsLoading(false);
        }
      }
      fetchUser();
      }, []);

      const userId = userData?.id;

    useEffect(() => {
        // Загрузка данных постов из API
        const fetchPosts = async () => {
        try {
            const response = await fetch(`http://172.20.10.7:5000/api/posts/${userId}/userPosts`);
            const data = await response.json();
            setPosts(data);
            console.log("Посты загружены:", data);
        } catch (error) {
            console.error("Ошибка загрузки постов:", error);
        } finally {
            setIsLoading(false);
        }
        };

        if (userId) {
            fetchPosts();
        }
        // fetchPosts();
    }, [userId]);




    // if (!userId) {
    //   return (
    //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 20 }}>

    //         <Text style={{}}>Ви не ввійшли в акаунт :(</Text>
            
    //         <View style={{ flexDirection: "row", gap: 20 }}>
    //           <TouchableOpacity onPress={() => router.push("/register")} style={{ marginTop: 20 }}>
    //               <Text style={{ color: COLORS.plum }}>Зареєструватися</Text>
    //           </TouchableOpacity>
    //           <TouchableOpacity onPress={() => router.push("/login")} style={{ marginTop: 20 }}>
    //               <Text style={{ color: COLORS.plum }}>Увійти</Text>
    //           </TouchableOpacity>
    //         </View>
    //     </View>

    // )
    // }

    // console.log("User posts:", posts);
    console.log("User ID:", userId);
    console.log("posts length:", posts); // Для отладки

    if (userId && posts) {
      console.log("success posts are loaded");
      return (
          <Posts postList={posts} loading={isLoading}/>
      )
    } else{
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 20 }}>

            <Text style={{}}>Ви не ввійшли в акаунт :(</Text>
            
            <View style={{ flexDirection: "row", gap: 20 }}>
              <TouchableOpacity onPress={() => router.push("/register")} style={{ marginTop: 20 }}>
                  <Text style={{ color: COLORS.plum }}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/login")} style={{ marginTop: 20 }}>
                  <Text style={{ color: COLORS.plum }}>Увійти</Text>
              </TouchableOpacity>
            </View>
        </View>
      );

    }
  };
    
    