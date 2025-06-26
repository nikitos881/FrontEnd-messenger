import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ICONS } from '../icons';
import { styles } from './header.styles';
import { COLORS } from '../../constants';
import { ModalWindow } from '../modal';
import { router, usePathname } from 'expo-router';
import { removeAuthToken } from '../../tools/authStorage';

export function HEADER() {
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
                {/* <TouchableOpacity style={styles.iconButton}>
                    <ICONS.AddIcon width={40} height={40} />
                </TouchableOpacity> */}
                <ModalWindow/>

                {pathname === "/settings" || pathname === "/settings-album" ? (
                    <TouchableOpacity style={styles.iconButtonActive}>
                        <ICONS.SettingsIcon width={40} height={40} onPress={() => { router.push("/settings") }} />
                    </TouchableOpacity>
                    ) : (
                    <TouchableOpacity style={styles.iconButton}>
                        <ICONS.SettingsIcon width={40} height={40} onPress={() => { router.push("/settings") }} />
                    </TouchableOpacity>
                    )}
            
                <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
                    <ICONS.LogutIcon width={40} height={40} />
                </TouchableOpacity>
            </View>
        </View>
  );
}

