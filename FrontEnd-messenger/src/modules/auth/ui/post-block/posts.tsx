import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Alert } from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { COLORS } from "../../../../shared/constants";
import { styles } from "./post-block.styles";
import { useEffect, useState } from "react";
import { ModalWindow } from "../../../../shared/ui/modal/modal2";
import { useRef } from "react"; // Добавьте импорт
import { getAuthToken } from "../../../../shared/tools/authStorage";
import { router } from "expo-router";
import { set } from "react-hook-form";
import { Post } from "../../types/post";
import { useSearchParams } from "expo-router/build/hooks";
import { UserData } from "../../types/user";


// type MyComponentProps = {
//   posts: Post[];
// };


export function Posts({ postList, loading }: { postList: Post[]; loading: boolean }) {
    // const searchParams = useSearchParams(); 
    // const userId = Number(searchParams.get("userId"));

    const [posts, setPosts] = useState<Post[]>(postList);
    const [isLoading, setIsLoading] = useState(loading);
    const [editPost, setEditPost] = useState<Post | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    // const [postNotFound, setPostNotFound] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    // const [token, setToken] = useState<string | null>(null);

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //         try {
  //           console.log("try userId:", userId);
  //             const response = await fetch(`http://172.20.10.7:5000/api/usernative/${userId}`);
  //             const result = await response.json();
  //             setUserData(result.data);
  //             console.log("User data fetched:", result.data);
  //         } catch (error) {
  //             console.error("Ошибка загрузки данных пользователя:", error);
  //         } finally {
  //             setIsLoading(false);
  //         }
  //     };

  //     if (userId) {
  //         fetchUser();
  //     }
  // }, [userId]);



    // useEffect(() => {
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
          console.log("User data fetched:", userData?.id, result.data);
        } catch (error) {
          Alert.alert("Ошибка", error instanceof Error ? error.message : "Ошибка при загрузке профиля");
        } finally {
          setIsLoading(false);
        }
      }
      fetchUser();
      }, []);


    useEffect(() => {
        setPosts(postList);
        // if (posts.length === 0) {
        //     setIsLoading(true);
        //     console.log("Завантаження постів...");
        // }
        console.log("success:", posts);
        setIsLoading(false);
    }, [postList]);

    // const fetchPosts = async () => {
    //   // Загрузка данных постов из API
    //     try {
    //         const response = await fetch("http://172.20.10.7:5000/api/posts");
    //         const data = await response.json();
    //         setPosts(data);
    //         // console.log("Посты загружены:", data);
    //     } catch (error) {
    //         console.error("Ошибка загрузки постов:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    //   };


    // useEffect(() => {
    //     fetchPosts();
    // }, []);

      function deletePost(id: string){
        const fetchDeletePost = async () => {
            const response = await fetch(`http://172.20.10.7:5000/api/posts/${id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await getAuthToken()}`,
            },
          })
          const data = await response.json();
          console.log("Удаление поста:", data);
          
          if (data.status !== "success") {
            console.error("Ошибка удаления поста:", data.message);
            return;
          }
          console.log("Пост успешно удален:", data);
          // Обновляем список постов после удаления
        //   fetchPosts();
          setPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
        }
        fetchDeletePost()
      }
    
    // const addNewPost = (newPost: Post) => {
    //     setPosts((prevPosts) => [newPost, ...prevPosts]);
    //   };

    // Функция открытия модалки для редактирования
    const handleEdit = (post: Post) => {
        setEditPost(post);
        setIsEditModalVisible(true);
    };

    // if (posts.length === 0 &&  !isLoading) {

    //   return (
    //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //       <Text>Пости відсутні :( </Text>
    //     </View>
    //   );
    // }
  

    if (postList.length === 0 && !isLoading) {

      return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color={COLORS.grey} />
              <Text>Завантаження...</Text>
          </View>
      )
  }

  // if (posts.length === 0 && postList.length === 0 ) {

  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text>Пости відсутні :( </Text>
  //     </View>
  //   );
  // }


  // console.log("userdata-id", userData?.id);
  if (posts.length !== 0) {
    
    return (
      <ScrollView>
        { posts.map((item) => (
            <View key={item.id} style={styles.container}>
              {/* Заголовок поста */}
              <View style={styles.header}>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => router.push(`/other-profile?userId=${item.user.id}`)}>
                  <Image source={{ uri: item.user.image }} style={styles.avatar} />
                  {/* <Image source={require("../../../../../assets/icon.png")} style={styles.avatar} /> */}
                  {item.user.firstName === null ? (
                    <Text style={styles.username}>{item.user.username}</Text>
                    ) : (
                    <Text style={styles.username}>{item.user.firstName} {item.user.lastName}</Text>
                  )}
                </TouchableOpacity>

                {userData?.id === item.user.id ? (
                  <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => handleEdit(item)} style={{ marginRight: 8 }}>
                    <Text style={{ color: COLORS.plum }}>Редагувати</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deletePost(item.id)}>
                    <ICONS.DotsIcon width={20} height={20} />
                  </TouchableOpacity>
                </View>
                  ) : (
                  <View/>
                  )}
              </View>
    
              {/* Контент поста */}
              <View style={styles.content}>
                <Text style={styles.username}>{item.title}</Text>
                <Text style={styles.text}>{item.topic}</Text>
                <Text style={styles.text}>{item.description}</Text>

                {/* Теги поста */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {item.tags && item.tags.map((tag) => {
                        // If `tag` is an object, extract the `name` property
                        const tagName = typeof tag === 'string' ? tag : (tag as { name: string }).name;
                        return (
                            <Text key={tagName} style={styles.tags}>
                                #{tagName}
                            </Text>
                        );
                    })}
                </View>


                {/* Ссылка на пост */}
                {item.url && (
                  <TouchableOpacity onPress={() => console.log(`Открыть ссылку: ${item.url}`)}>
                    <Text style={styles.link} >{item.url}</Text>
                  </TouchableOpacity>
                )}

                {/* Изображения поста */}
                  {item.images === undefined ? (
                    <View/>
                    ) : (
                      <View style={{ flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between', }}>
                                {(item.images).map((img, idx) => (
                                    <Image
                                        key={idx}
                                        source={typeof img === 'string' ? { uri: img } : img}
                                        style={{
                                            width: 100, height: 100,
                                            aspectRatio: 1,
                                            margin: '1.5%',
                                            borderRadius: 16,
                                        }}
                                        resizeMode="cover"
                                        />
                                ))}
                    </View>
                    )}

                {/* Футер поста */}
                <View style={styles.footer}>
                  <View style={styles.icons}>
                    <TouchableOpacity onPress={() => console.log(`Нравится пост ${item.id}`)}>
                      <ICONS.LikeIcon width={20} height={20} />
                    </TouchableOpacity>
                    <Text style={styles.footerText}>{item.likesCount} Вподобань</Text>
                  </View>
                  <View style={styles.icons}>
                    <ICONS.EyeIcon width={20} height={20} />
                    <Text style={styles.footerText}>{item.viewsCount} Переглядів</Text>
                  </View>
                </View>
              </View>
            </View>))

        }

          
        {isEditModalVisible && (
          <ModalWindow
            visible={isEditModalVisible}
            onClose={() => setIsEditModalVisible(false)}
            initialData={
              editPost
                ? {
                    ...editPost,
                    images: editPost.images
                      ? editPost.images.map(img =>
                          typeof img === "string" ? img : img.uri
                        )
                      : undefined,
                    tags: editPost.tags
                      ? editPost.tags.map(tag =>
                          typeof tag === "string" ? tag : tag.name
                        )
                      : undefined,

                  }
                : null
            }
            onPostUpdated={(updatedPost: Post) => {
              setPosts((prev) =>
                prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
              );
              setIsEditModalVisible(false);
              
            //   fetchPosts();
            }}
          />
    )}
    
    </ScrollView>
  );
}
}

