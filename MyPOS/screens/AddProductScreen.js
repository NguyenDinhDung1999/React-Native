import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from '../styles/styles';

const AddProductScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [code, setCode] = useState('');

    const addProductHandler = () => {
        if (name && price && code) {
            const newProduct = {
                id: (Math.random() * 1000).toString(),
                name,
                price: parseFloat(price),
                code,
            };
            dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
            navigation.goBack();
        } else {
            alert(t('add_product'));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('add_product')}</Text>
            <TextInput
                style={styles.input}
                placeholder={t('product_name')}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder={t('product_price')}
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
            />
            <TextInput
                style={styles.input}
                placeholder={t('product_code')}
                value={code}
                onChangeText={setCode}
            />
            <Button title={t('add_product')} onPress={addProductHandler} />
        </View>
    );
};

export default AddProductScreen;