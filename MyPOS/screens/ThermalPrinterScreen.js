import React, { useState } from 'react';
import { SafeAreaView, useColorScheme, Button, TextInput } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import ThermalPrinterModule from 'react-native-thermal-printer';

ThermalPrinterModule.defaultConfig = {
    ...ThermalPrinterModule.defaultConfig,
    ip: '192.168.100.246',
    port: 9100,
    timeout: 30000,
};

const ThermalPrinterScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const [state, setState] = useState({
        text:
            '[C]<img>https://via.placeholder.com/300.jpg</img>\n' +
            '[L]\n' +
            "[C]<u><font size='big'>ORDER N°045</font></u>\n" +
            '[L]\n' +
            '[C]================================\n' +
            '[L]\n' +
            '[L]<b>BEAUTIFUL SHIRT</b>[R]9.99e\n' +
            '[L]  + Size : S\n' +
            '[L]\n' +
            '[L]<b>AWESOME HAT</b>[R]24.99e\n' +
            '[L]  + Size : 57/58\n' +
            '[L]\n' +
            '[C]--------------------------------\n' +
            '[R]TOTAL PRICE :[R]34.98e\n' +
            '[R]TAX :[R]4.23e\n' +
            '[L]\n' +
            '[C]================================\n' +
            '[L]\n' +
            "[L]<font size='tall'>Customer :</font>\n" +
            '[L]Raymond DUPONT\n' +
            '[L]5 rue des girafes\n' +
            '[L]31547 PERPETES\n' +
            '[L]Tel : +33801201456\n' +
            '[L]\n' +
            "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
            "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>",
    });

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const onPress = async () => {
        try {
            console.log('We will invoke the native module here!');
            await ThermalPrinterModule.printTcp({ payload: state.text });

            console.log('done printing');
        } catch (err) {
            //error handling
            console.log(err.message);
        }
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <TextInput
                value={state.text}
                onChangeText={(text) => setState((prev) => ({ ...prev, text }))}
            />
            <Button
                title="Click to invoke your native module!"
                color="#841584"
                onPress={onPress}
            />
        </SafeAreaView>
    );
};

export default ThermalPrinterScreen;