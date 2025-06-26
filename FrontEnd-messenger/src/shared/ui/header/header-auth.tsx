import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from './header-auth.styles';

export function HEADERAUTH() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../images/logo.png')} 
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
  );
}

