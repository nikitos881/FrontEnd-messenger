import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { styles } from "./email-form.styles";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../../../../../shared/ui/input";
import { Button } from "../../../../../shared/ui/button";

type Props = {
  email: string;
  onSubmit: (code: string) => void;
  onBack: () => void;
  isLoading: boolean;
};

export function EmailVerificationScreen({ email, onSubmit, onBack, isLoading }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm<{ code: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Підтвердження пошти</Text>
      <Text style={styles.subtitle}>
          Ми надіслали 6-значний код на вашу пошту (you@example.com). Введіть його нижче, щоб підтвердити акаунт
      </Text>

      {/* Use Controller to connect Input to react-hook-form */}
      <Controller
        control={control}
        name="code"
        rules={{
          required: "Код обов'язковий",
          pattern: {
            value: /^\d{6}$/,
            message: "Код має містити 6 цифр"
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="123456"
            label="Код підтвердження"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
            errMsg={errors.code?.message}
          />
        )}
      />

      <View style={styles.buttonBlock}>
        <Button
          label={isLoading ? "Перевірка..." : "Підтвердити"}
          onPress={handleSubmit((data) => onSubmit(data.code))}
          disabled={isLoading}
        />
      </View>

      <TouchableOpacity onPress={onBack} style={styles.back}>
        <Text style={styles.backText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
}