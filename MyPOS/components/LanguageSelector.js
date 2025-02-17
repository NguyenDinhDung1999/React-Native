import React from 'react';
import { View, Button } from 'react-native';
import styles from '../styles/styles';

const LanguageSelector = () => (
    <View style={styles.container}>
        <Button title="English" onPress={() => i18n.changeLanguage('en')} />
        <Button title="Tiếng Việt" onPress={() => i18n.changeLanguage('vi')} />
    </View>
);

export default LanguageSelector;
