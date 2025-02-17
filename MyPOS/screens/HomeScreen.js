import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ProductItem from '../components/ProductItem';
import styles from '../styles/styles';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const { t } = useTranslation();

    const addToCartHandler = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeProductHandler = (productId) => {
        dispatch({ type: 'REMOVE_PRODUCT', payload: productId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('home_title')}</Text>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <ProductItem item={item} addToCartHandler={addToCartHandler} removeProductHandler={removeProductHandler} t={t} />
                )}
                keyExtractor={(item) => item.id}
            />
            <Button title={t('view_cart')} onPress={() => navigation.navigate('Cart')} />
            <Button title={t('add_product')} onPress={() => navigation.navigate('AddProduct')} />
        </View>
    );
};

export default HomeScreen;
