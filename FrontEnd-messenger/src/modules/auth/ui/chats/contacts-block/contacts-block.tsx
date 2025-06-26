import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, Alert } from "react-native";

import { styles } from "./contacts-block.styles";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "../../../../../shared/constants";
import { ICONS } from "../../../../../shared/ui/icons";
import { Input } from "../../../../../shared/ui/input";
import { getAuthToken } from "../../../../../shared/tools/authStorage";
import { UserData } from "../../../types/user";


export function ContactsBlock() {
    const [userFriends, setUserFriends] = useState<UserData['friends'] | null>(null); // Переменная для хранения данных пользователя>
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
            async function fetchUser() {
                const token = await getAuthToken();
            // setToken(token);
                console.log("Токен получен:", token);
                try {
                if (!token || token === "null") {
                    setIsLoading(false);
                    console.log("Токен не найден");
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
                setUserFriends(result.data.friends);
                console.log("User data fetched:", result.data.friends);
            } catch (error) {
                Alert.alert("Ошибка", error instanceof Error ? error.message : "Ошибка при загрузке профиля");
            } finally {
                setIsLoading(false);
            }
            }
            fetchUser();
            }, []);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <ICONS.PeopleIcon width={20} height={20} fill={COLORS.lightGrey} />

            <Text style={styles.headerText}>Контакти</Text>
        </View>
        <View style={styles.searchContainer}>
            <Controller
                control={useForm().control}
                name="search"
                render={({ field: { onChange, value } }) => (
                    <Input
                        value={value}
                        onChangeText={onChange}
                        placeholder="Пошук"
                        placeholderTextColor={COLORS.lightGrey}
                        style={styles.searchInput}
                        iconLeft={<ICONS.SearchIcon width={20} height={20} fill={COLORS.lightGrey} />}
                    />
                )}
            />
        </View>
        {/* <FlatList 
            data={[]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.contactItem}>
                    <View style={styles.contactAvatar}>
                        <Image source={require("../../../../../assets/icon.png")} style={styles.avatar} />
                    </View>
                    <Text style={styles.contactName}>Ім'я Контакту</Text>
                </TouchableOpacity>
            )}
        /> */}

        <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={true}
        indicatorStyle= "default"
        >
            {userFriends && userFriends.map((friend) => (
                <TouchableOpacity key={friend.id} style={styles.contactItem}>
                    <View style={styles.contactAvatar}>
                        {/* <Image source={require("../../../../../../assets/icon.png")} style={styles.avatar} /> */}
                        <Image source={{ uri: friend.image }} style={styles.avatar} />
                                
                    </View>
                    <Text style={styles.contactName}>{friend.username}</Text>
                </TouchableOpacity>
            ))}

        </ScrollView>



      
    </View>
  );
}