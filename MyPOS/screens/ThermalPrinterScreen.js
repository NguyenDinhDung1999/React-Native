import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
    Platform,
} from 'react-native';
import { USBPrinter } from '@tumihub/react-native-thermal-receipt-printer';

const ThermalPrinterScreen = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [status, setStatus] = useState('Not connected');
    const [printText, setPrintText] = useState(
        'SAMPLE RECEIPT\n' +
        '------------------------\n' +
        'Item 1          $10.00\n' +
        'Item 2          $15.00\n' +
        '------------------------\n' +
        'Total:          $25.00\n\n' +
        'Thank you for shopping!'
    );

    useEffect(() => {
        scanDevices();

        return () => {
            if (isConnected) {
                USBPrinter.closeConn();
            }
        };
    }, []);

    const scanDevices = async () => {
        try {
            setStatus('Scanning for USB devices...');
            const printerList = await USBPrinter.getDeviceList();
            console.log('Found devices:', printerList);
            setDevices(printerList);
            setStatus(`Found ${printerList.length} devices`);
        } catch (error) {
            console.error('Scan error:', error);
            setStatus(`Error scanning: ${error.message}`);
            Alert.alert('Scan Error', error.message);
        }
    };

    const connectPrinter = async (device) => {
        if (!device) {
            Alert.alert('Error', 'Please select a device first');
            return;
        }

        try {
            setStatus('Connecting...');
            await USBPrinter.connectPrinter(device.vendorId, device.productId);
            setIsConnected(true);
            setSelectedDevice(device);
            setStatus(`Connected to ${device.name}`);
        } catch (error) {
            console.error('Connection error:', error);
            setStatus(`Connection error: ${error.message}`);
            setIsConnected(false);
            Alert.alert('Connection Error', error.message);
        }
    };

    const printReceipt = async () => {
        if (!isConnected) {
            Alert.alert('Error', 'Please connect to a printer first');
            return;
        }

        try {
            setStatus('Printing...');

            await USBPrinter.printText(`${'\u001b'}!\u0020`); // Double height and width
            await USBPrinter.printText('MY STORE\n');
            await USBPrinter.printText(`${'\u001b'}!\u0000`); // Reset text size

            await USBPrinter.printText(`Date: ${new Date().toLocaleString()}\n`);
            await USBPrinter.printText('--------------------------------\n');

            await USBPrinter.printText(printText);

            await USBPrinter.printText('\n');
            await USBPrinter.printQR('https://mystore.com/receipt');

            await USBPrinter.printText('\n\n\n\n');
            await USBPrinter.cutPaper();

            setStatus('Print successful');
        } catch (error) {
            console.error('Print error:', error);
            setStatus(`Print error: ${error.message}`);
            Alert.alert('Print Error', error.message);
        }
    };

    const disconnectPrinter = async () => {
        try {
            await USBPrinter.closeConn();
            setIsConnected(false);
            setSelectedDevice(null);
            setStatus('Disconnected');
        } catch (error) {
            console.error('Disconnect error:', error);
            setStatus(`Disconnect error: ${error.message}`);
            Alert.alert('Disconnect Error', error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Status: {status}</Text>
                <Text style={styles.connectionText}>
                    {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Available Devices</Text>
                <TouchableOpacity style={styles.scanButton} onPress={scanDevices}>
                    <Text style={styles.buttonText}>Scan for Devices</Text>
                </TouchableOpacity>

                <View style={styles.deviceList}>
                    {devices.map((device, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.deviceItem,
                                selectedDevice?.vendorId === device.vendorId &&
                                styles.selectedDevice
                            ]}
                            onPress={() => connectPrinter(device)}
                        >
                            <Text style={styles.deviceName}>{device.name}</Text>
                            <Text style={styles.deviceInfo}>
                                VID: {device.vendorId}, PID: {device.productId}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Print Content</Text>
                <TextInput
                    style={styles.printInput}
                    multiline
                    value={printText}
                    onChangeText={setPrintText}
                    placeholder="Enter text to print"
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.printButton]}
                    onPress={printReceipt}
                    disabled={!isConnected}
                >
                    <Text style={styles.buttonText}>Print Receipt</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.disconnectButton]}
                    onPress={disconnectPrinter}
                    disabled={!isConnected}
                >
                    <Text style={styles.buttonText}>Disconnect</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    statusContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    statusText: {
        fontSize: 16,
        marginBottom: 8,
    },
    connectionText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    section: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    scanButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    deviceList: {
        gap: 8,
    },
    deviceItem: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    selectedDevice: {
        borderColor: '#007AFF',
        backgroundColor: '#E3F2FD',
    },
    deviceName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    deviceInfo: {
        fontSize: 12,
        color: '#666',
    },
    printInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        minHeight: 120,
        textAlignVertical: 'top',
        fontFamily: Platform.select({
            ios: 'Courier',
            android: 'monospace',
        }),
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    button: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    printButton: {
        backgroundColor: '#007AFF',
    },
    disconnectButton: {
        backgroundColor: '#FF3B30',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ThermalPrinterScreen;