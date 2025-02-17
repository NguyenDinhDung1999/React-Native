import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

const ProductItem = ({ item, addToCartHandler, removeProductHandler, t }) => (
    <View style={styles.productItem}>
        <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productCode}>{t('product_code')}: {item.code}</Text>
            <Text style={styles.productPrice}>{item.price} VNĐ</Text>
        </View>
        <View style={styles.actions}>
            <TouchableOpacity onPress={() => addToCartHandler(item)} style={styles.actionButton}>
                <Text style={styles.actionText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeProductHandler(item.id)} style={styles.removeButton}>
                <Text style={styles.actionText}>x</Text>
            </TouchableOpacity>
        </View>
    </View>
);

export default ProductItem;
