import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ICONS } from '../icons';
import { styles } from './header.styles';
import { COLORS } from '../../constants';
import { ModalWindow } from '../modal';
import { removeAuthToken } from '../../tools/authStorage';
import { router, usePathname } from 'expo-router';

export function HEADERCHATS() {
    const pathname = usePathname();
    // const { logout } = useUserContext();
    const handleLogout = async () => {
        try {
            await removeAuthToken();
            router.replace("/login");
        } catch (error) {
            console.error("Ошибка при логауте:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../images/logo.png')} 
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={styles.rightSection}>
                {pathname === "/settings" || pathname === "/settings-album" ? (
                    <TouchableOpacity style={styles.iconButtonActive}>
                        <ICONS.SettingsIcon width={40} height={40} onPress={() => { router.push("/settings") }} />
                    </TouchableOpacity>
                    ) : (
                    <TouchableOpacity style={styles.iconButton}>
                        <ICONS.SettingsIcon width={40} height={40} onPress={() => { router.push("/settings") }} />
                    </TouchableOpacity>
                    )}
                {/* <ModalWindow/> */}
                {/* <TouchableOpacity style={styles.iconButton}>
                    <ICONS.SettingsIcon width={40} height={40} />
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
                    <ICONS.LogutIcon width={40} height={40} />
                </TouchableOpacity>
            </View>
        </View>
  );
}

