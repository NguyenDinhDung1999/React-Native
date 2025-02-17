import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CartItem from '../components/CartItem';
import styles from '../styles/styles';

const CartScreen = () => {
    const cartItems = useSelector(state => state.cart);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const removeFromCartHandler = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('cart_title')}</Text>
            {cartItems.length === 0 ? (
                <Text style={styles.emptyCart}>{t('empty_cart')}</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    renderItem={({ item }) => (
                        <CartItem item={item} removeFromCartHandler={removeFromCartHandler} />
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>{t('total')}: {total} VNĐ</Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={() => alert(t('checkout'))}>
                    <Text style={styles.checkoutText}>{t('checkout')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CartScreen;
