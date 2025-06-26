import {
	View,
	Text,
	Alert,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
} from "react-native";
import { Input } from "../../../../../shared/ui/input";
import { ICONS } from "../../../../../shared/ui/icons";
import { Button } from "../../../../../shared/ui/button";
import { useForm, Controller } from "react-hook-form";
import { ILogin } from "../../../types";
import { styles } from "./login-form.styles";
import { router } from "expo-router";
import { ModalWindow } from "../../../../../shared/ui/modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveAuthToken } from "../../../../../shared/tools/authStorage";

export function LoginForm() {
	const { handleSubmit, control } = useForm<ILogin>({
		defaultValues: { email: "", password: "" },
	});

	async function login(
		email: string,
		password: string
	): Promise<string | null> {
		try {
			const response = await fetch(
				"http://172.20.10.7:5000/api/usernative/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

			const result = await response.json();

			if (result.status === "ok" && result.data) {
				// Сохраняем токен в AsyncStorage или другом хранилище
				// await AsyncStorage.setItem("authToken", JSON.stringify(result.data));
				if (result.data && typeof result.data === "string") {
                    await saveAuthToken(result.data);
                } else if (result.data && typeof result.data.token === "string") {
                    await saveAuthToken(result.data.token);
                } else {
                    Alert.alert("Ошибка", "Некорректный токен от сервера");
                }
				return null;
			} else {
				return result.message || "Ошибка авторизации";
			}
		} catch (error) {
			console.error("Ошибка авторизации:", error);
			return "Ошибка соединения с сервером";
		}
	}

	const onSubmit = async (data: { email: string; password: string }) => {
		const error = await login(data.email, data.password);
		if (error) {
			Alert.alert("Ошибка", error);
		} else {
			Alert.alert("Успех", "Вы успешно вошли в систему!");
			router.push("/home");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.container3}>
				<View style={styles.container2}>
					<TouchableOpacity
						style={styles.textButtonsUp}
						onPress={() => {
							router.push("/register");
						}}
					>
						<Text style={styles.textButtonsUpReg}>Реєстрація</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.textButtonsUp}>
						<Text style={styles.textButtonsUpLog}>Авторизація</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.textContainer}>
				<Text style={styles.text}>Раді тебе знову бачити!</Text>
			</View>
			<View style={styles.form}>
				<Controller
					control={control}
					name="email"
					rules={{
						required: {
							value: true,
							message: "Email is required",
						},
					}}
					render={({ field, fieldState }) => {
						return (
							<Input
								placeholder="you@example.com"
								// iconLeft={<ICONS.UserIcon width={30} height={30} />}
								onChange={field.onChange}
								onChangeText={field.onChange}
								value={field.value}
								label="Електронна пошта"
								autoCorrect={false}
								errMsg={fieldState.error?.message}
								autoCapitalize="none"
							/>
						);
					}}
				/>
				<Controller
					control={control}
					name="password"
					rules={{
						required: {
							value: true,
							message: "Password is required",
						},
					}}
					render={({ field, fieldState }) => {
						return (
							<Input.Password
								placeholder="Введи пароль"
								onChange={field.onChange}
								onChangeText={field.onChange}
								value={field.value}
								label="Пароль"
								autoCorrect={false}
								errMsg={fieldState.error?.message}
								autoCapitalize="none"
							/>
						);
					}}
				/>
			</View>
			<View style={styles.buttonBlock}>
                <Button label={"Увійти"} onPress={handleSubmit(onSubmit)} style={styles.buttonBlockText as StyleProp<ViewStyle>}/>
            </View>
		</View>
	);
}
