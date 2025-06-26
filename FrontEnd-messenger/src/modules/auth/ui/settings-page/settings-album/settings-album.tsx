import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, ScrollView, Platform, FlatList, Image } from "react-native";
import { styles } from "./settings-album.styles";
import { IMAGES } from "../../../../../shared/ui/images/images";
import { ICONS } from "../../../../../shared/ui/icons";



// export function SettingsAlbum(){


import { Button } from "../../../../../shared/ui/button";
import { AlbumModal } from "../../../../../shared/ui/modal/album-modal";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Album } from "../../../types/album";


export const SettingsAlbum: React.FC<{ authToken: string }> = ({ authToken }: { authToken: string }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchAlbums = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchAlbums();
    }
  }, [authToken]);


  const handleCreateAlbum = async ({ title, date }: { title: string; date: Date }) => {
    try {
      const res = await fetch("http://172.20.10.7:5000/api/albums/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title, date: date.toISOString() }),
      });
      const data = await res.json();
      if (data.status === "ok") {
        fetchAlbums();
      } else {
        throw new Error(data.message);
      }
    } catch {
      Alert.alert("Ошибка", "Не удалось создать альбом");
    }
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Нет доступа", "Разрешите доступ к фотографиям в настройках телефона");
        return false;
      }
    }
    return true;
  };

  const handleAddImages = async (albumId: number) => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    // Множественный выбор доступен только на Android/iOS, начиная с SDK 48
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      base64: true,
      quality: 1,
      selectionLimit: 5, // только для SDK 49+
    });

    if (result.canceled) return;

    // Для множественного выбора result.assets, для одиночного result.assets[0]
    const assets = result.assets || [];
    if (assets.length > 0) {
      try {
        const images = assets
          .filter(asset => asset.base64)
          .map(asset => ({
            url: `data:${asset.type || "image/jpeg"};base64,${asset.base64}`,
          }));

        await fetch(`http://172.20.10.7:5000/api/albums/${albumId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ id: albumId, images }),
        });
        fetchAlbums();
      } catch {
        Alert.alert("Ошибка", "Не удалось загрузить изображения");
      }
    }
  };

    return(
        <View style={{flex:1, flexDirection: "column", paddingTop: 25, gap: 8}}>
            <FlatList
            data={albums}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
                <Text style={styles.emptyText}>Немає ще жодного альбому</Text>
            }
                renderItem={({ item }) => (
                    <View style={styles.albumCard}>
                        <Text style={styles.albumTitle}>{item.title}</Text>
                        {/* <Text >{new Date(item.date).toLocaleDateString()}</Text> */}
                        <Text style={styles.albumTitle}>Фотографіїї</Text>
                        {item.images && item.images.length > 0 ? (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesList}>
                            {item.images.map((img) => (
                                <Image
                                key={img.id.toString()}
                                source={{ uri: img.url }}
                                style={styles.albumImage}
                                />
                            ))}
                            </ScrollView>
                        ) : (
                            <Text style={styles.noImagesText}>Нет картинок</Text>
                        )}
                        <Button label="Добавить картинки" onPress={() => handleAddImages(item.id)} />
                    </View>
                )}
                ListHeaderComponent={
                    <>
                    <View style={{ width: "75%", flexDirection: "row", gap: 16, paddingLeft: 15 }}>
                        <TouchableOpacity
                        style={styles.textButtonsUp}
                        onPress={() => router.push("/settings")}
                        >
                        <Text style={styles.textButtonsUpInfo}>Особиста інформація</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textButtonsUp}>
                        <Text style={styles.textButtonsUpAlbum}>Альбоми</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.myPhotos}>
                        <View style={styles.containerTextAndImage}>
                        <Text style={{ fontWeight: "500", fontSize: 16 }}>Мої фото</Text>
                        <TouchableOpacity
                            style={{
                            padding: 10,
                            borderColor: "#543C52",
                            borderWidth: 1,
                            width: 161,
                            borderRadius: 190,
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                            }}
                        >
                            <ICONS.ImageIcon style={{ width: 20, height: 20 }} />
                            <Text style={{ fontSize: 13, color: "#543C52", fontWeight: "500" }}>
                            Додати фото
                            </Text>
                        </TouchableOpacity>
                        </View>

                        <View style={{ width: 200, height: 200 }}>
                        <IMAGES.profileImage style={{ width: "100%", height: "100%", borderRadius: 10, position: "absolute" }} />
                        <View style={{
                            height: "100%",
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            gap: 10,
                            alignItems: "flex-end",
                            padding: 10,
                        }}>
                            <TouchableOpacity><IMAGES.eyeImage style={{ width: 40, height: 40 }} /></TouchableOpacity>
                            <TouchableOpacity><IMAGES.deleteImage style={{ width: 40, height: 40 }} /></TouchableOpacity>
                        </View>
                        </View>
                    </View>

                    <View style={styles.containerTextAndImage}>
                        <Text style={styles.header}>Мои альбомы</Text>
                        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
                            <ICONS.AddIcon style={{ width: 40, height: 40 }} />
                        </TouchableOpacity>
                    </View>

                    {loading && <ActivityIndicator />}
                    </>
                }
                />
            <AlbumModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onCreate={handleCreateAlbum}
                  />
        </View>
    )
}