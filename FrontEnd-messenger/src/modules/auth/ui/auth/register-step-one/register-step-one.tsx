import { View, Text, Alert, TouchableOpacity } from "react-native";
    import { Input } from "../../../../../shared/ui/input";
    import { Button } from "../../../../../shared/ui/button";
    import { Controller, useForm } from "react-hook-form";
    import { styles } from "./register-step-one.styles";
    import { router } from "expo-router";
    import { useState } from "react";
    import { EmailVerificationScreen } from "../email-form";
    import { saveAuthToken } from "../../../../../shared/tools/authStorage";

    type FormData = {
    email: string;
    password: string;
    };

    export function RegisterStepOne() {
    const [step, setStep] = useState<"register" | "verify">("register");
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    
    const { 
        control, 
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>();

    const handleRegister = async (data: FormData) => {
        setIsLoading(true);
        try {
        setEmail(data.email);
        
        const response = await fetch(`http://172.20.10.7:5000/api/usernative/registration/start`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (response.ok) {
            Alert.alert("Успіх", "Код підтвердження відправлено на вашу пошту");
            setStep("verify");
        } else {
            Alert.alert("Помилка", result.message || "Не вдалося розпочати реєстрацію");
        }
        } catch (error) {
        console.error("Registration error:", error);
        Alert.alert("Помилка", "Не вдалося відправити дані");
        } finally {
        setIsLoading(false);
        }
    };

    const handleVerification = async (code: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://172.20.10.7:5000/api/usernative/registration/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    email, 
                    code 
                }),
            });

            const result = await response.json();
            console.log("Ответ сервера:", result); // <-- добавьте эту строку

            if (response.ok) {
                Alert.alert("Успех", "Регистрация завершена!");
                if (result.data && typeof result.data === "string") {
                    await saveAuthToken(result.data);
                } else if (result.data && typeof result.data.token === "string") {
                    await saveAuthToken(result.data.token);
                } else {
                    Alert.alert("Ошибка", "Некорректный токен от сервера");
                    return;
                }
                router.replace("/login");
            } else {
                Alert.alert("Ошибка", result.message || "Неверный код подтверждения");
            }
        } catch (error) {
            console.error("Verification error:", error);
            Alert.alert("Ошибка", "Не удалось подтвердить код");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View >
        
        {/* <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.text}>
            {step === "register" ? "Реєстрація" : "Підтвердження пошти"}
            </Text>
        </View> */}

        {/* <View style={styles.textContainer}>
            <Text style={styles.text}>Приєднуйся до World IT!</Text>
        </View> */}

        {step === "register" ? (
        <View style={styles.container}>
            <View style={styles.container3}>
                <View style={styles.container2}>
                    <TouchableOpacity style={styles.textButtonsUp}><Text style={styles.textButtonsUpReg}>
                        {step === "register" ? "Реєстрація" : "Підтвердження пошти"}
                    </Text></TouchableOpacity>
                    <TouchableOpacity style={styles.textButtonsUp}><Text style={styles.textButtonsUpLog} onPress={() => {router.push("/login")}}>Авторизація</Text></TouchableOpacity>
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Приєднуйся до World IT!</Text>
            </View>
            <View style={styles.form}>
            <Controller
                control={control}
                name="email"
                rules={{
                required: "Пошта обов'язкова",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Невірний формат пошти"
                }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="you@example.com"
                    label="Електронна пошта"
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    errMsg={errors.email?.message}
                />
                )}
            />

            {/* Use Controller to wrap Input.Password */}
            <Controller
                control={control}
                name="password"
                rules={{
                required: "Пароль обов'язковий",
                minLength: {
                    value: 6,
                    message: "Пароль має містити щонайменше 6 символів"
                }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <Input.Password
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Введи пароль"
                    label="Пароль"
                    autoCorrect={false}
                    autoCapitalize="none"
                    errMsg={errors.password?.message}
                />
                )}
            />


            <Controller
                control={control}
                name="password"
                rules={{
                required: "Пароль обов'язковий",
                minLength: {
                    value: 6,
                    message: "Пароль має містити щонайменше 6 символів"
                }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <Input.Password
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Повтори пароль"
                    label="Підтверди пароль"
                    autoCorrect={false}
                    autoCapitalize="none"
                    errMsg={errors.password?.message}
                />
                )}
            />

            <View style={styles.buttonBlock}>
                <Button 
                label={isLoading ? "Обробка..." : "Створити акаунт"} 
                onPress={handleSubmit(handleRegister)} 
                disabled={isLoading}
                />
            </View>
            </View>
        </View>
        ) : (
            <EmailVerificationScreen
            email={email}
            onSubmit={handleVerification}
            onBack={() => setStep("register")}
            isLoading={isLoading}
            />
        )}
        </View>
    );
    }