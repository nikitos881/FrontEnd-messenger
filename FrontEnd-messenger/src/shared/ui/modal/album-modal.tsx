import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Button } from "../button";
import { COLORS } from "../../constants";

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreate: (album: { title: string; date: Date }) => Promise<void>;
};

export const AlbumModal: React.FC<Props> = ({ visible, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert("Ошибка", "Название альбома обязательно");
      return;
    }
    setIsLoading(true);
    try {
      await onCreate({ title, date: new Date() });
      setTitle("");
      onClose();
    } catch (e) {
      Alert.alert("Ошибка", "Не удалось создать альбом");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Створити альбом</Text>
        <TextInput
          placeholder="Название альбома"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <View style={styles.buttonRow}>
          <Button label="Отмена" onPress={onClose} />
          <Button label="Создать" onPress={handleCreate} disabled={isLoading} />
        </View>
        {isLoading && <ActivityIndicator />}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { backgroundColor: "#fff", borderRadius: 12, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  input: { borderWidth: 1, borderColor: COLORS.grayLight, borderRadius: 8, padding: 10, marginBottom: 16 },
  buttonRow: { flexDirection: "row", justifyContent: "center", alignContent: "center" },
});