import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Image, Alert, ActivityIndicator, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../../constants";
import { Input } from "../input";
import { styles } from "./modal.styles";
import { ICONS } from "../icons";
import * as ImagePicker from "expo-image-picker";
import { PublishSendButtonImage } from "../images/PublishSendButton";
import { getAuthToken } from "../../tools/authStorage";
import { PostData } from "./modal.types";

// type PostData = {
//   id?: string;
//   title: string;
//   topic?: string;
//   description: string;
//   url?: string;
//   images?: string[]; // массив base64-строк
//   tags?: string[]; // массив тегов
// };

type ModalWindowProps = {
  visible: boolean;
  onClose: () => void;
  initialData?: PostData | null;
  onPostUpdated?: (post: any) => void;
};

export function ModalWindow({ visible, onClose, initialData, onPostUpdated }: ModalWindowProps) {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    topic: "",
    description: "",
    url: "",
    tags: [] as string[],
    images: [],
  });
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [customTag, setCustomTag] = useState("");

  useEffect(() => {
    if (initialData) {
      setPostData({
        title: initialData.title || "",
        topic: initialData.topic || "",
        description: initialData.description || "",
        url: initialData.url || "",
        images: initialData.images || [],
        tags: initialData.tags || [],
        id: initialData.id,
      });
      setImages(initialData.images || []);
    } else {
      setPostData({ title: "", topic: "", description: "", url: "", images: [] });
      setImages([]);
    }
  }, [visible, initialData]);

  const handleInputChange = (field: keyof PostData, value: string) => {
    setPostData((prev) => ({ ...prev, [field]: value }));
  };

  // Добавить картинку (до 9)
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
      const newImages = [...images, `data:image/jpeg;base64,${result.assets[0].base64}`];
      setImages(newImages);
      setPostData((prev) => ({ ...prev, images: newImages }));
    }
  };

  // Удалить картинку по индексу
  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setPostData((prev) => ({ ...prev, images: newImages }));
  };

    const handleAddTag = (tag: string) => {
      if (!tag || !postData.tags || postData.tags.includes(tag)) return;
      if (postData.tags.length >= 10) {
          Alert.alert("Максимум 10 тегов");
          return;
      }
      setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleAddCustomTag = () => {
      const tag = customTag.trim();
      if (!tag || !postData.tags || postData.tags.includes(tag)) return;
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
      setPostData({ ...postData, tags: !postData.tags ? [] : postData.tags.filter((t) => t !== tag) });
  };

  const toggleTag = (tag: string) => {
      if (!postData.tags || postData.tags.includes(tag)) {
          handleRemoveTag(tag);
      } else {
          handleAddTag(tag);
      }
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
  fetchTags();
}, []);

  const handleSubmit = async () => {
    if (!postData.title || !postData.description) {
      Alert.alert("Помилка", "Назва та опис обов'язкові");
      return;
    }
    // if (!images.length) {
    //   Alert.alert("Помилка", "Додайте хоча б одну картинку");
    //   return;
    // }
    setIsLoading(true);
    try {
      const token = await getAuthToken?.();
      if (!token) {
        Alert.alert("Помилка", "Не вдалося отримати токен");
        return;
      }

      let response;
      if (postData.id) {
        // Редактирование
        response = await fetch(`http://172.20.10.7:5000/api/posts/${postData.id}/edit`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...postData,
            images,
          }),
        });
      } else {
        // Создание
        response = await fetch("http://172.20.10.7:5000/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...postData,
            images,
          }),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Помилка при збереженні поста");
      }

      const data = await response.json();
      Alert.alert("Успіх", postData.id ? "Пост оновлено!" : "Пост створено!");
      onClose();
      if (onPostUpdated) onPostUpdated(data);
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося зберегти пост");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      avoidKeyboard
    >
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={styles.krestText}>×</Text>
        </TouchableOpacity>
        <Text style={styles.textCreate}>
          {postData.id ? "Редагування публікації" : "Створення публікації!"}
        </Text>

        <ScrollView style={styles.scrollView}>
        <View style={styles.containerSettings}>
          <View style={styles.containerName}>
            <Text style={styles.textNameCreate}>Назва публікації</Text>
            <Input
              placeholder="Назва публікації"
              style={styles.inputName}
              value={postData.title}
              onChangeText={(text) => handleInputChange("title", text)}
            />
          </View>

          <View>
            <Text style={styles.textTopiceCreate}>Тема публікації</Text>
            <Input
              placeholder="Напишіть тему публікації"
              style={styles.inputTopic}
              value={postData.topic}
              onChangeText={(text) => handleInputChange("topic", text)}
            />
          </View>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {tags.map((tag) => (
                  <TouchableOpacity
                      key={tag.id}
                      onPress={() => toggleTag(tag.name)}
                      style={[
                          styles.tagChip,
                          postData.tags?.includes(tag.name) && styles.tagChipSelected,
                      ]}
                  >
                      <Text
                          style={
                              postData.tags?.includes(tag.name)
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

          <View>
            <View style={styles.inputBoxDescriptionContainer}>
              <SafeAreaView>
                <TextInput
                  editable
                  multiline
                  placeholder="Напишіть опис публікації"
                  style={styles.inputBoxDescription}
                  value={postData.description}
                  onChangeText={(text) => handleInputChange("description", text)}
                />
              </SafeAreaView>
            </View>
          </View>

          <View>
            <Text style={styles.textUrlCreate}>Посилання</Text>
            <Input
              placeholder="Напишіть посилання"
              style={styles.inputUrl}
              value={postData.url}
              onChangeText={(text) => handleInputChange("url", text)}
            />
          </View>

          {/* Картинки */}
          <View style={{ marginVertical: 10 }}>
            <TouchableOpacity style={styles.iconButton} onPress={handlePickImage}>
              <Text style={{ color: COLORS.black }}>Додати картинку ({images.length}/9)</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              {images.map((img, idx) => (
                <View key={idx} style={{ alignItems: "center", marginRight: 10 }}>
                  <Image
                    source={{ uri: img }}
                    style={{ width: 80, height: 80, borderRadius: 8 }}
                  />
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      borderRadius: 10,
                      padding: 2,
                    }}
                    onPress={() => handleRemoveImage(idx)}
                  >
                    <Text style={{ color: "white", fontSize: 14 }}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
            marginLeft: 30,
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity disabled={isLoading} style={styles.buttonPublish} onPress={handleSubmit}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.TextColor}>
                  {postData.id ? "Оновити" : "Публікація"}
                </Text>
                <PublishSendButtonImage />
              </View>
            )}
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
