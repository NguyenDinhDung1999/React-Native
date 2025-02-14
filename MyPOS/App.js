import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { useTranslation } from 'react-i18next';

// --- i18n Configuration ---
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          home_title: "Product List",
          cart_title: "Shopping Cart",
          add_product: "Add New Product",
          view_cart: "View Cart",
          checkout: "Checkout",
          total: "Total",
          empty_cart: "Your cart is empty!",
          remove: "Remove",
          quantity: "Quantity",
          product_name: "Product Name",
          product_code: "Product Code",
          product_price: "Price",
          home: "Home",
          cart: "Cart",
          add_product_menu: "Add Product",
          settings: "Settings",
        },
      },
      vi: {
        translation: {
          home_title: "Danh sách sản phẩm",
          cart_title: "Giỏ hàng",
          add_product: "Thêm sản phẩm mới",
          view_cart: "Xem giỏ hàng",
          checkout: "Thanh toán",
          total: "Tổng cộng",
          empty_cart: "Giỏ hàng của bạn đang trống!",
          remove: "Xoá",
          quantity: "Số lượng",
          product_name: "Tên sản phẩm",
          product_code: "Mã sản phẩm",
          product_price: "Giá",
          home: "Trang chủ",
          cart: "Giỏ hàng",
          add_product_menu: "Thêm sản phẩm",
          settings: "Cài đặt",
        },
      },
    },
    lng: Localization.locale.startsWith('vi') ? 'vi' : 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// --- Redux Setup ---
const initialState = {
  cart: [],
  products: [
    { id: '1', name: 'Sản phẩm 1', price: 100, code: 'SP001' },
    { id: '2', name: 'Sản phẩm 2', price: 200, code: 'SP002' },
    { id: '3', name: 'Sản phẩm 3', price: 300, code: 'SP003' },
  ],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProduct = state.cart.find(item => item.id === action.payload.id);
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };

    case 'REMOVE_PRODUCT':
      return { ...state, products: state.products.filter(item => item.id !== action.payload) };

    default:
      return state;
  }
};

const store = createStore(cartReducer);

// --- Screens ---
function HomeScreen({ navigation }) {
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
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title={t('view_cart')} onPress={() => navigation.navigate('Cart')} />
      <Button title={t('add_product')} onPress={() => navigation.navigate('AddProduct')} />
    </View>
  );
}

function CartScreen() {
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
            <View style={styles.cartItem}>
              <Text style={styles.cartItemName}>{item.name} (x{item.quantity})</Text>
              <Text style={styles.cartItemPrice}>{item.price * item.quantity} VNĐ</Text>
              <TouchableOpacity onPress={() => removeFromCartHandler(item.id)} style={styles.removeButton}>
                <Text style={styles.actionText}>x</Text>
              </TouchableOpacity>
            </View>
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
}

function AddProductScreen({ navigation }) {
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
}

function SettingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Language</Text>
      <Button title="English" onPress={() => i18n.changeLanguage('en')} />
      <Button title="Tiếng Việt" onPress={() => i18n.changeLanguage('vi')} />
    </View>
  );
}

// --- Drawer Navigator ---
const Drawer = createDrawerNavigator();

function App() {
  const { t } = useTranslation();  // Translation hook

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerLabel: t('home'),
              title: t('home_title'),
            }}
          />
          <Drawer.Screen
            name="Cart"
            component={CartScreen}
            options={{
              drawerLabel: t('cart'),
              title: t('cart_title'),
            }}
          />
          <Drawer.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{
              drawerLabel: t('add_product_menu'),
              title: t('add_product'),
            }}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingScreen}
            options={{
              drawerLabel: t('settings'),
              title: t('settings'),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCode: {
    fontSize: 14,
    color: '#888',
  },
  productPrice: {
    fontSize: 16,
    color: '#2D2D2D',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 8,
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
  },
  removeButton: {
    marginLeft: 8,
    backgroundColor: '#FF0000',
    padding: 8,
    borderRadius: 4,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#888',
  },
  totalContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
  },
  emptyCart: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default App;
