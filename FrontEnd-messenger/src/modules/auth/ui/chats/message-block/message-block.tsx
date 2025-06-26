import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import { styles } from "./message-block.styles";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "../../../../../shared/constants";
import { ICONS } from "../../../../../shared/ui/icons";

export function MessageBlock() {

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <ICONS.ChatIcon width={20} height={20} fill={COLORS.lightGrey} />

            <Text style={styles.headerText}>Повідомлення</Text>
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
            {[...Array(5)].map((_, index) => (
                <TouchableOpacity key={index} style={styles.contactItem}>
                    <View style={styles.contactAvatar}>
                        <Image source={require("../../../../../../assets/icon.png")} style={styles.avatar} />
                    </View>
                    <View style={styles.contactDetails}>
                        <Text style={styles.contactName}>Mona Lisa</Text>
                        <Text style={styles.textMessage}>Привіт, як справи?</Text>
                    </View>
                </TouchableOpacity>
            ))}

        </ScrollView>



      
    </View>
  );
}