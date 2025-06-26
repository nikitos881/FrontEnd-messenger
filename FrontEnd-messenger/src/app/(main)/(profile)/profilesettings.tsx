import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "../../../shared/constants";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";





type FormData = {
  firstName: string;
  lastName: string;
  username: string;
};

type UserProfile = {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  email: string;
};

export const ProfileSettingsScreen: React.FC<{ authToken: string }> = ({
  authToken,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://172.20.10.7:5000/api/me", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Не удалось загрузить профиль");
        }

        const data = await response.json();
        if (data.status === "ok") {
          setProfileData(data.data);
          reset({
            firstName: data.data.firstName || "",
            lastName: data.data.lastName || "",
            username: data.data.username || "",
          });
        } else {
          throw new Error(data.message || "Ошибка загрузки профиля");
        }
      } catch (error) {
        Alert.alert(
          "Ошибка",
          error instanceof Error
            ? error.message
            : "Неизвестная ошибка при загрузке профиля"
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, [authToken, reset]);

  const handleFormSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (!authToken) {
        throw new Error("Токен авторизации не найден");
      }

      const response = await fetch("http://172.20.10.7:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Ошибка сервера:", errorText);
        let errorMessage = "Ошибка сервера";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          if (errorText.startsWith("<")) {
            errorMessage =
              "Сервер вернул HTML вместо JSON. Проверьте адрес и работу бэкенда.";
          } else {
            errorMessage = errorText;
          }
        }
        throw new Error(errorMessage);
      }

      Alert.alert("Успех", "Профиль успешно обновлен!");
      setProfileData((prev) => ({
        ...prev!,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
      }));
    } catch (error) {
      Alert.alert(
        "Ошибка",
        error instanceof Error
          ? error.message
          : "Не удалось обновить профиль"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.grey} />
        <Text>Загрузка профиля...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Настройки профиля</Text>
      </View>

      {profileData && (
        <View style={styles.profileInfo}>
          <Text style={styles.emailText}>Email: {profileData.email}</Text>
        </View>
      )}

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Имя</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Введите ваше имя"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errMsg={errors.firstName?.message}
              />
            )}
            name="firstName"
            rules={{ required: "Обязательное поле" }}
            defaultValue=""
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Фамилия</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Введите вашу фамилию"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errMsg={errors.lastName?.message}
              />
            )}
            name="lastName"
            rules={{ required: "Обязательное поле" }}
            defaultValue=""
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Никнейм</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Введите ваш никнейм"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errMsg={errors.username?.message}
              />
            )}
            name="username"
            rules={{
              required: "Обязательное поле",
              minLength: {
                value: 3,
                message: "Минимум 3 символа",
              },
            }}
            defaultValue=""
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          label="Сохранить изменения"
          onPress={handleSubmit(handleFormSubmit)}
          disabled={isLoading || !isDirty}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
  },
  profileInfo: {
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
    color: COLORS.grey,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.black,
  },
  buttonContainer: {
    marginTop: 20,
  },
});