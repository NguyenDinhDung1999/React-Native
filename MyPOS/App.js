import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import store from './redux/store';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import AddProductScreen from './screens/AddProductScreen';
import SettingScreen from './screens/SettingScreen';
import ThermalPrinterScreen from './screens/ThermalPrinterScreen';

const Drawer = createDrawerNavigator();

function App() {
  const { t } = useTranslation();

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
             <Drawer.Screen
                 name="ThermalPrinter"
                 component={ThermalPrinterScreen}
                 options={{ title: 'Thermal Printer' }}
             />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
  );
}

export default App;
