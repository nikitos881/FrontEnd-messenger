import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet, Platform, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../../../../../shared/ui/button";
import { AlbumModal } from "../../../../../shared/ui/modal/album-modal";

type Album = {
  id: number;
  title: string;
  date: string;
  images: { id: number; url: string }[];
};

export const AlbumsPage: React.FC<{ authToken: string }> = ({ authToken }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://172.20.10.7:5000/api/albums/all", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
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

  return (
    <View style={styles.containerAlbum}>
      <Text style={styles.header}>Мои альбомы</Text>
      <Button label="Создать альбом" onPress={() => setModalVisible(true)} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={albums}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>У вас пока нет альбомов</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.albumCard}>
              <Text style={styles.albumTitle}>{item.title}</Text>
              {item.images && item.images.length > 0 ? (
                <FlatList
                  data={item.images}
                  horizontal
                  keyExtractor={(img) => img.id.toString()}
                  renderItem={({ item: img }) => (
                    <Image
                      source={{ uri: img.url }}
                      style={styles.albumImage}
                    />
                  )}
                  style={styles.imagesList}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <Text style={styles.noImagesText}>Нет картинок</Text>
              )}
              <Button label="Добавить картинки" onPress={() => handleAddImages(item.id)} />
            </View>
          )}
        />
      )}
      <AlbumModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCreateAlbum}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerAlbum: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  albumCard: { padding: 16, borderWidth: 1, borderColor: "#eee", borderRadius: 8, marginBottom: 12 },
  albumTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  albumImage: { width: 80, height: 80, borderRadius: 8, marginRight: 8, backgroundColor: "#eee" },
  imagesList: { marginBottom: 8 },
  noImagesText: { color: "#888", marginBottom: 8 },
  emptyText: { textAlign: "center", color: "#888", marginTop: 32, fontSize: 16 },
});