import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const CartItem = ({ item, removeFromCartHandler }) => (
    <View style={styles.cartItem}>
        <Text style={styles.cartItemName}>{item.name} (x{item.quantity})</Text>
        <Text style={styles.cartItemPrice}>{item.price * item.quantity} VNĐ</Text>
        <TouchableOpacity onPress={() => removeFromCartHandler(item.id)} style={styles.removeButton}>
            <Text style={styles.actionText}>x</Text>
        </TouchableOpacity>
    </View>
);

export default CartItem;
