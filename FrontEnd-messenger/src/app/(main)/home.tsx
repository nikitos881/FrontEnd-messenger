import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ActivityIndicator, Alert } from "react-native";
import { COLORS } from "../../shared/constants";
import { IMAGES } from "../../shared/ui/images";
import { HEADER } from "../../shared/ui/header";
import { FOOTER } from "../../shared/ui/footer";
import { PostBlock } from "../../modules/auth/ui/post-block";
import { FirstLoginModal } from "../../shared/ui/modal/first-login-modal";
import { getAuthToken } from "../../shared/tools/authStorage";
import { Text } from "react-native-svg";

export default function Home() {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [showFirstLoginModal, setShowFirstLoginModal] = useState(false);
  const [userData, setUserData] = useState<{ isFirstLogin?: boolean } | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const token = await getAuthToken();
      setAuthToken(token);
      try {
        if (!token) {
          setIsLoadingUser(false);
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
        // Показываем модалку только если isFirstLogin и токен есть
        if (result.data.isFirstLogin && token) {
          setShowFirstLoginModal(true);
        }
      } catch (error) {
        Alert.alert("Ошибка", error instanceof Error ? error.message : "Ошибка при загрузке профиля");
      } finally {
        setIsLoadingUser(false);
      }
    }
    fetchUser();
  }, []);

  const handleModalClose = () => {
    setShowFirstLoginModal(false);
  };

  const handleProfileUpdateSuccess = () => {
    setShowFirstLoginModal(false);
    setUserData(prev => (prev ? { ...prev, isFirstLogin: false } : prev));
  };

  if (isLoadingUser) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.grey} />
        <Text>Завантаження...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
      <StatusBar style="auto" />
      <HEADER />
      <View style={{ flex: 1, backgroundColor: "#FAF8FF" }}>
        <PostBlock />
      </View>
      <FOOTER />

      {/* Показываем модалку только если showFirstLoginModal, userData и authToken есть */}
      <FirstLoginModal
        visible={showFirstLoginModal && !!userData && !!authToken}
        onClose={handleModalClose}
        onSuccess={handleProfileUpdateSuccess}
        authToken={authToken ?? ""} 
      />
    </SafeAreaView>
  );
}