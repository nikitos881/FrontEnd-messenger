// import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
// import { ICONS } from "../../../../shared/ui/icons";
// import { COLORS } from "../../../../shared/constants";
// import { styles } from "./post-block.styles";
// import { useEffect, useState } from "react";
// import { ModalWindow } from "../../../../shared/ui/modal/modal2";
// import { useRef } from "react"; // Добавьте импорт
// import { getAuthToken } from "../../../../shared/tools/authStorage";
// import { router } from "expo-router";
// import { Post } from "../../types/post";


// interface MyPostBlockProps {
//   userId: string | null; // Используем string или null для userId
// }


// export function MyPostBlockcopy(userId: MyPostBlockProps) {
//     const [posts, setPosts] = useState<Post[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [editPost, setEditPost] = useState<Post | null>(null);
//     const [isEditModalVisible, setIsEditModalVisible] = useState(false);

//     // const [userData, setUserData] = useState<Post["user"] | null>(null);



//     // Загрузка данных пользователя                  me!!!!!!!!!!!!!!!
//     // const [meData, setMeData] = useState<Post["user"] | null>(null);

//     // useEffect(() => {
//     //     const fetchUser = async () => {
//     //         const token = await getAuthToken();
//     //         if (!token) return;

//     //         try {
//     //             const response = await fetch("http://172.20.10.7:5000/api/usernative/me", {
//     //                 headers: {
//     //                     Authorization: `Bearer ${token}`,
//     //                 },
//     //             });
//     //             const result = await response.json();
//     //             if (result.status === "ok" && result.data) {
//     //                 setMeData(result.data); // Assuming `result.data` contains `id` or `username`
//     //                 console.log("me data fetched:", result.data);
//     //             }
//     //         } catch (error) {
//     //             console.error("Ошибка загрузки данных пользователя:", error);
//     //         }
//     //     };

//     //     fetchUser();
//     // }, []);



//   //   useEffect(() => {
//   //     const fetchUser = async () => {
//   //         try {
//   //             const response = await fetch(`http://172.20.10.7:5000/api/usernative/${userId}`);
//   //             const result = await response.json();
//   //             setUserData(result.data);
//   //             console.log("User data fetched:", result.data);
//   //         } catch (error) {
//   //             console.error("Ошибка загрузки данных пользователя:", error);
//   //         } finally {
//   //             setIsLoading(false);
//   //         }
//   //     };

//   //     if (userId) {
//   //         fetchUser();
//   //     }
//   // }, [userId]);


//     useEffect(() => {
//         // Загрузка данных постов из API
//         const fetchPosts = async () => {
//         try {
//             const response = await fetch(`http://172.20.10.7:5000/api/posts/${userId.userId}/userPosts`);
//             const data = await response.json();
//             setPosts(data);
//         } catch (error) {
//             console.error("Ошибка загрузки постов:", error);
//         } finally {
//             setIsLoading(false);
//         }
//         };

//         fetchPosts();
//     }, []);

//       function deletePost(itemToDel: Post, id: string){
//         const fetchPosts = async () => {
//             const response = await fetch(`http://172.20.10.7:5000/api/posts/${id}/delete`, {
//             method: "DELETE",
//           })
//           const data = await response.json();
//         }
//         fetchPosts()

//         const updatedPosts = posts.filter(post => post !== itemToDel)
//         return setPosts(updatedPosts)
//       }
    
//     // const addNewPost = (newPost: Post) => {
//     //     setPosts((prevPosts) => [newPost, ...prevPosts]);
//     //   };

//     // Функция открытия модалки для редактирования
//     const handleEdit = (post: Post) => {
//         setEditPost(post);
//         setIsEditModalVisible(true);
//     };

//     // Фильтрация постов пользователя            me!!!!!!!!!!!!!!!

//     // if (!userId.userId) {
//     //   return (
//     //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 20 }}>

//     //         <Text style={{}}>Ви не ввійшли в акаунт :(</Text>
            
//     //         <View style={{ flexDirection: "row", gap: 20 }}>
//     //           <TouchableOpacity onPress={() => router.push("/register")} style={{ marginTop: 20 }}>
//     //               <Text style={{ color: COLORS.plum }}>Зареєструватися</Text>
//     //           </TouchableOpacity>
//     //           <TouchableOpacity onPress={() => router.push("/login")} style={{ marginTop: 20 }}>
//     //               <Text style={{ color: COLORS.plum }}>Увійти</Text>
//     //           </TouchableOpacity>
//     //         </View>
//     //     </View>

//     // )
//     // }

//     // const userPosts = posts.filter((post) => post.username === userData?.username);

//     if (isLoading) {
//         return (
//             <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                 <ActivityIndicator size="large" color={COLORS.grey} />
//                 <Text>Завантаження постів...</Text>
//             </View>

//         )
//     }

//     // console.log("User posts:", posts);
//     console.log("User ID:", userId);
//     console.log("posts length:", posts); // Для отладки
//     // console.log("User data:", userData, userData?.username); // Для отладки

//     if (posts.length === undefined || posts.length <= 0) {
//       return (
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//           <Text>Пости відсутні</Text>
//         </View>
//       );
//     }

//     return (
//           <>
//             <FlatList
//               data={posts}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <View style={styles.container}>
//                   {/* Заголовок поста */}
//                   <View style={styles.header}>
//                     <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => router.push(`/other-profile?userId=${item.user.id}`)}>
//                       <Image source={{ uri: item.user.image }} style={styles.avatar} />
//                       {/* <Image source={require("../../../../../assets/icon.png")} style={styles.avatar} /> */}
//                       {item.user.firstName === null ? (
//                         <Text style={styles.username}>{item.user.username}</Text>
//                         ) : (
//                         <Text style={styles.username}>{item.user.firstName} {item.user.lastName}</Text>
//                       )}
//                     </TouchableOpacity>
//                     <View style={{ flexDirection: "row" }}>
//                       <TouchableOpacity onPress={() => handleEdit(item)} style={{ marginRight: 8 }}>
//                         <Text style={{ color: COLORS.plum }}>Редагувати</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => deletePost(item, item.id)}>
//                         <ICONS.DotsIcon width={20} height={20} />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
        
//                   {/* Контент поста */}
//                   <View style={styles.content}>
//                     <Text style={styles.username}>{item.title}</Text>
//                     <Text style={styles.text}>{item.topic}</Text>
//                     <Text style={styles.text}>{item.description}</Text>
    
//                     {/* Теги поста */}
//                     <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//                         {item.tags && item.tags.map((tag) => {
//                             // If `tag` is an object, extract the `name` property
//                             const tagName = typeof tag === 'string' ? tag : (tag as { name: string }).name;
//                             return (
//                                 <Text key={tagName} style={styles.tags}>
//                                     #{tagName}
//                                 </Text>
//                             );
//                         })}
//                     </View>
    
    
//                     {/* Ссылка на пост */}
//                     {item.url && (
//                       <TouchableOpacity onPress={() => console.log(`Открыть ссылку: ${item.url}`)}>
//                         <Text style={styles.link} >{item.url}</Text>
//                       </TouchableOpacity>
//                     )}
    
//                     {/* Изображения поста */}
//                       {item.images === undefined ? (
//                         <View/>
//                         ) : (
//                           <View style={{ flexDirection: 'row',
//                             flexWrap: 'wrap',
//                             justifyContent: 'space-between', }}>
//                                     {(item.images).map((img, idx) => (
//                                         <Image
//                                             key={idx}
//                                             source={typeof img === 'string' ? { uri: img } : img}
//                                             style={{
//                                                 width: 100, height: 100,
//                                                 aspectRatio: 1,
//                                                 margin: '1.5%',
//                                                 borderRadius: 16,
//                                             }}
//                                             resizeMode="cover"
//                                             />
//                                     ))}
//                         </View>
//                         )}
    
//                     {/* Футер поста */}
//                     <View style={styles.footer}>
//                       <View style={styles.icons}>
//                         <TouchableOpacity onPress={() => console.log(`Нравится пост ${item.id}`)}>
//                           <ICONS.LikeIcon width={20} height={20} />
//                         </TouchableOpacity>
//                         <Text style={styles.footerText}>{item.likesCount} Вподобань</Text>
//                       </View>
//                       <View style={styles.icons}>
//                         <ICONS.EyeIcon width={20} height={20} />
//                         <Text style={styles.footerText}>{item.viewsCount} Переглядів</Text>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               )}
//             />
//             {/* Модалка для редактирования */}
//             {isEditModalVisible && (
//               <ModalWindow
//                 visible={isEditModalVisible}
//                 onClose={() => setIsEditModalVisible(false)}
//                 initialData={
//                   editPost
//                     ? {
//                         ...editPost,
//                         images: editPost.images
//                           ? editPost.images.map(img =>
//                               typeof img === "string" ? img : img.uri
//                             )
//                           : undefined,
//                         tags: editPost.tags
//                           ? editPost.tags.map(tag =>
//                               typeof tag === "string" ? tag : tag.name
//                             )
//                           : undefined,
//                       }
//                     : null
//                 }
//                 // onPostUpdated={(updatedPost: Post) => {
//                 //   setPosts((prev) =>
//                 //     prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
//                 //   );
//                 //   setIsEditModalVisible(false);
//                 //   fetchPosts();
//                 // }}
//               />
//             )}
//           </>
//         );
//     }
    
    