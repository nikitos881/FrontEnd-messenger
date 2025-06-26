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


export function PostBlock() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const fetchPosts = async () => {
        // Загрузка данных постов из API
          try {
              const response = await fetch("http://172.20.10.7:5000/api/posts");
              const data = await response.json();
              setPosts(data);
              console.log("Посты загружены");
          } catch (error) {
              console.error("Ошибка загрузки постов:", error);
          } finally {
              setIsLoading(false);
          }
      
        };
        fetchPosts();
        setIsLoading(false);
        // console.log("Посты загружены:", posts);
        // console.log("isLoading:", isLoading);
    }, []);


    if (posts) {
      return (
          <Posts postList={posts} loading={isLoading}/>
      )
    }
} ;