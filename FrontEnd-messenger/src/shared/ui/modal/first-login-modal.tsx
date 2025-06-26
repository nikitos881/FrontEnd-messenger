import React, { useState } from "react";
import {
	Modal,
	View,
	Text,
	Alert,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "../../constants";
import { Input } from "../input";
import { Button } from "../button";
import { styles } from "./modal.styles";
import { ICONS } from "../icons";

type FormData = {
	firstName: string;
	lastName: string;
	username: string;
};

type Props = {
	visible: boolean;
	onClose: () => void;
	onSuccess: () => void;
	authToken: string ;
};

export const FirstLoginModal: React.FC<Props> = ({
    visible,
    onClose,
    onSuccess,
    authToken,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);

    // Если токен не получен, показываем индикатор загрузки
    if (visible && !authToken) {
        return (
            <Modal visible={visible} animationType="slide" transparent={false}>
                <View style={styles.mainContainer}>
                    <ActivityIndicator size="large" color={COLORS.grey} />
                    <Text>Загрузка токена...</Text>
                </View>
            </Modal>
        );
    }

    const handleFormSubmit = async (data: FormData) => {
		setIsLoading(true);
		try {
			if (!authToken) {
				throw new Error("Токен авторизации не найден");
			}

			const response = await fetch(
				"http://172.20.10.7:5000/api/usernative/profile",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authToken}`,
					},
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) {
				const errorText = await response.text();
				console.log("Ошибка сервера:", errorText); // Для отладки
				let errorMessage = "Ошибка сервера";
				try {
					const errorData = JSON.parse(errorText);
					errorMessage = errorData.message || errorMessage;
				} catch {
					// errorText не JSON, возможно HTML
					if (errorText.startsWith("<")) {
						errorMessage =
							"Сервер вернул HTML вместо JSON. Проверьте адрес и работу бэкенда.";
					} else {
						errorMessage = errorText;
					}
				}
				throw new Error(errorMessage);
			}

			Alert.alert("Успех", "Профиль сохранен!");
			onSuccess();
		} catch (error) {
			Alert.alert(
				"Ошибка",
				error instanceof Error
					? error.message
					: "Не удалось сохранить профиль"
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Modal
				visible={visible}
				//arnimationType="slide"
				onRequestClose={onClose}
				transparent={true}
				
				// isVisible={isModalVisible}
				// onBackdropPress={handleModal}
				// onBackButtonPress={handleModal}
				// onSwipeComplete={handleModal}
				// avoidKeyboard
			>

				<View style={styles.containerFirstLogin}>
					<View style={styles.modalContent}>
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
					<Text style={styles.krestText}>×</Text>
					</TouchableOpacity>

					<Text style={styles.textCreate}>Додай деталі про себе</Text>

					<View style={styles.containerSettings}>
						<View style={styles.containerName}>
							<Text style={styles.textNameCreate}>Ім’я</Text>
							<Controller
								control={control}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<Input
										placeholder="Введіть Ваше ім’я"
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

						<View style={styles.containerName}>
							<Text style={styles.textNameCreate}>Прізвище</Text>
							<Controller
								control={control}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<Input
										placeholder="Введіть Ваше прізвище"
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

						<View style={styles.containerName}>
							<Text style={styles.textNameCreate}>Ім’я користувача</Text>
							<Controller
								control={control}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<Input
										placeholder="@"
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

					<View style={styles.footerButtons}>
						<Button
							label="Продовжити"
							onPress={handleSubmit(handleFormSubmit)}
							disabled={isLoading}
						/>
					</View>
				</View>
				</View>
			</Modal>
		</View>
	);
};
