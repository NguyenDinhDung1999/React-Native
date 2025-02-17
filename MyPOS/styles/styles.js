import { StyleSheet } from 'react-native';

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
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    productItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDetails: {
        fontSize: 14,
        color: '#555',
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    cartItemText: {
        fontSize: 16,
    },
    removeButton: {
        backgroundColor: '#FF0000',
        padding: 8,
        borderRadius: 8,
    },
    removeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emptyCart: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 20,
        color: '#888',
    },
    totalContainer: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    checkoutButton: {
        marginTop: 16,
        backgroundColor: '#28A745',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default styles;
