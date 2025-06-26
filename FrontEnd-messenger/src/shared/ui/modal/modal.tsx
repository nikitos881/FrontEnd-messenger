import { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    ActivityIndicator,
    Image,
    ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../../constants";
import { Input } from "../input";
import { Button } from "../button";
import { PublishSendButtonImage, AddEmojiImage, AddImageImage, IMAGES } from "../images/images";
import { styles } from "./modal.styles";
import { ICONS } from "../icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuthToken } from "../../tools/authStorage";
import { PostData } from "./modal.types";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

export function ModalWindow() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const authToken = await getAuthToken();
            setToken(authToken);
        };
        fetchToken();
    }, []);
    
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [postData, setPostData] = useState({
        title: "",
        topic: "",
        description: "",
        url: "",
        tags: [] as string[],
        images: [],
    });
    const [images, setImages] = useState<string[]>([]);
    const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
    const [customTag, setCustomTag] = useState("");

    const handleModal = () => setIsModalVisible(!isModalVisible);

    const handleInputChange = (field: keyof PostData, value: string) => {
        setPostData({ ...postData, [field]: value });
    };

    const handleAddTag = (tag: string) => {
        if (!tag || postData.tags.includes(tag)) return;
        if (postData.tags.length >= 10) {
            Alert.alert("Максимум 10 тегов");
            return;
        }
        setPostData({ ...postData, tags: [...postData.tags, tag] });
    };

    const handleAddCustomTag = () => {
        const tag = customTag.trim();
        if (!tag || postData.tags.includes(tag)) return;
        if (postData.tags.length >= 10) {
            Alert.alert("Максимум 10 тегов");
            return;
        }
        setPostData({ ...postData, tags: [...postData.tags, tag] });
        setCustomTag(""); 
        setTags((prevTags) => [...prevTags, { id: Date.now(), name: tag }]); // Добавляем новый тег в список 
        fetchTags();
    };
    
    
    const handleRemoveTag = (tag: string) => {
        setPostData({ ...postData, tags: postData.tags.filter((t) => t !== tag) });
    };

    const toggleTag = (tag: string) => {
        if (postData.tags.includes(tag)) {
            handleRemoveTag(tag);
        } else {
            handleAddTag(tag);
        }
    };

    const handlePickImage = async () => {
        if (images.length >= 9) {
            Alert.alert("Максимум 9 картинок");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            quality: 0.7,
        });

        if (!result.canceled && result.assets && result.assets[0].base64) {
            setImages([...images, `data:image/jpeg;base64,${result.assets[0].base64}`]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const fetchTags = async () => {
        try {
            const response = await fetch("http://172.20.10.7:5000/api/posts/tags");
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data?.message || "Ошибка при получении тегов");
            }
    
            setTags(data);
        } catch (error) {
            console.error("Ошибка:", error);
            Alert.alert("Ошибка", "Не удалось загрузить теги");
            setTags([]);
        }
    };
    
    
    
      

    useEffect(() => {
        if (isModalVisible) {
            fetchTags();
        }
    }, [isModalVisible]);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            if (!postData.title || !postData.description) {
                Alert.alert("Ой!", "Название и описание обязательны");
                return;
            }
            // if (images.length === 0) {
            //     Alert.alert("Ой!", "Хотя бы одна картинка обязательна");
            //     return;
            // }

            
            if (!token) {
                Alert.alert("Ошибка", "Не удалось получить токен");
                return;
            }

            const response = await fetch("http://172.20.10.7:5000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: postData.title,
                    description: postData.description,
                    topic: postData.topic || null,
                    url: postData.url || null,
                    images,
                    tags: postData.tags || null,
                }),
            });

            const responseJson = await response.json();
            if (!response.ok) {
                throw new Error(responseJson?.message || "Ошибка при создании поста");
            }

            Alert.alert("Ура!", "Пост опубликован!");

            handleModal();
            setPostData({ title: "", topic: "", description: "", url: "", tags: [], images: [] });
            setImages([]);

        } catch (error) {
            console.error("Ошибка:", error);
            Alert.alert("Ошибка", "Не удалось создать пост");
        } finally {
            setIsLoading(false);
        }
    };

    if (!token){
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.push("/register")}>
                    <ICONS.AddIcon width={40} height={40} />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton} onPress={handleModal}>
                <ICONS.AddIcon width={40} height={40} />
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={handleModal}
                onBackButtonPress={handleModal}
                onSwipeComplete={handleModal}
                avoidKeyboard
            >
                <View style={styles.mainContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={handleModal}>
                        <Text style={styles.krestText}>×</Text>
                    </TouchableOpacity>

                    <View style={styles.headerText}>
                        <Text style={styles.textCreate}>Створення публікації</Text>
                    </View>

                    <ScrollView style={styles.scrollView} >
                        <View style={styles.containerSettings}>
                            <View style={styles.containerName}>
                                <Text style={styles.textNameCreate}>Назва публікації</Text>
                                <Input
                                    placeholder="Природа, книга і спокій 🌿"
                                    value={postData.title}
                                    onChangeText={(text) => handleInputChange("title", text)}
                                />
                            </View>
                            <View>
                                <Text style={styles.textTopiceCreate}>Тема публікації</Text>
                                <Input
                                    placeholder="Напишіть тему публікаціїї"
                                    value={postData.topic}
                                    onChangeText={(text) => handleInputChange("topic", text)}
                                />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                {/* <Text>Теги</Text> */}
                                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                                    {tags.map((tag) => (
                                        <TouchableOpacity
                                            key={tag.id}
                                            onPress={() => toggleTag(tag.name)}
                                            style={[
                                                styles.tagChip,
                                                postData.tags.includes(tag.name) && styles.tagChipSelected,
                                            ]}
                                        >
                                            <Text
                                                style={
                                                    postData.tags.includes(tag.name)
                                                        ? styles.tagTextSelected
                                                        : styles.tagText
                                                }
                                            >
                                                #{tag.name}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                    <TouchableOpacity
                                        onPress={handleAddCustomTag}
                                        style={{
                                            marginLeft: 8,
                                            backgroundColor: COLORS.primary,
                                            borderRadius: 8,
                                            padding: 8,
                                        }}
                                    >
                                        <Text style={{ color: "white", fontSize: 16 }}>+</Text>
                                    </TouchableOpacity>
                                 </View>
                                 
                                 <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                    <TextInput
                                        value={customTag}
                                        onChangeText={setCustomTag}
                                        placeholder="Добавить свой тег"
                                        style={{
                                            borderWidth: 1,
                                            borderColor: COLORS.grayLight,
                                            borderRadius: 8,
                                            padding: 8,
                                            flex: 1,
                                        }}
                                    />
                                    {/* <TouchableOpacity
                                        onPress={handleAddCustomTag}
                                        style={{
                                            marginLeft: 8,
                                            backgroundColor: COLORS.primary,
                                            borderRadius: 8,
                                            padding: 8,
                                        }}
                                    >
                                        <Text style={{ color: "white", fontSize: 16 }}>+</Text>
                                    </TouchableOpacity> */}
                                </View>

                                {/* <Text style={styles.textTopiceCreate}>Описание</Text> */}
                                <View style={styles.inputBoxDescription}>
                                    <TextInput
                                        multiline
                                        placeholder="Текст публікації"
                                        value={postData.description}
                                        onChangeText={(text) => handleInputChange("description", text)}
                                        style={{ minHeight: 100 }}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={styles.textUrlCreate}>Посилання</Text>
                                <Input
                                    placeholder="https://example.com"
                                    value={postData.url}
                                    onChangeText={(text) => handleInputChange("url", text)}
                                />
                            </View>


                            <View style={{ marginTop: 10 }}>
                            {images.map((img, idx) => (
                                <View key={idx}
                                    style={{
                                        marginBottom: 10,
                                        position: "relative",
                                        borderRadius: 8,
                                        overflow: "hidden",
                                    }}>
                                    <Image source={{ uri: img }}
                                        style={{
                                            width: "100%",
                                            height: 225,
                                            borderRadius: 8,
                                        }}
                                        resizeMode="cover"/>
                                    {/* <TouchableOpacity
                                        style={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            borderRadius: 12,
                                            paddingHorizontal: 8,
                                            paddingVertical: 4,
                                        }}
                                        onPress={() => handleRemoveImage(idx)}>
                                        <Text style={{ color: "white", fontSize: 14 }}>✕</Text>
                                    </TouchableOpacity> */}
                                    <TouchableOpacity
                                        style={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            borderRadius: 12,
                                            paddingHorizontal: 8,
                                            paddingVertical: 4,
                                        }}
                                        onPress={() => handleRemoveImage(idx)}>
                                        <IMAGES.deleteImage style={{width: 40, height: 40}} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            </View>

                        </View>

                        <View style={styles.footerButtons}>
                            {/* <TouchableOpacity>
                                <AddEmojiImage />
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={handlePickImage}>
                                <AddImageImage />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonPublish}
                                onPress={handleSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <>
                                        <Text style={styles.TextColor}>Опубликовать</Text>
                                        <PublishSendButtonImage />
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}