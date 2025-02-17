import React from 'react';
import { View, Text, Button } from 'react-native';
import i18n from '../i18n/i18n';
import styles from '../styles/styles';

const SettingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Language</Text>
            <Button title="English" onPress={() => i18n.changeLanguage('en')} />
            <Button title="Tiếng Việt" onPress={() => i18n.changeLanguage('vi')} />
        </View>
    );
};

export default SettingScreen;
