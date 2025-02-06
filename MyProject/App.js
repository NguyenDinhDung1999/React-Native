import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon

const App = () => {
  const [listData, setListData] = useState([
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
  ]);

  const [inputValue, setInputValue] = useState('');

  const handlePress = () => {
    alert("You have pressed the button!");
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setListData([
        ...listData,
        { id: String(listData.length + 1), title: inputValue },
      ]);
      setInputValue(''); // Clear input field after adding item
    } else {
      alert('Please enter a valid item');
    }
  };

  const handleDeleteItem = (id) => {
    // Remove item from the list by id
    setListData(listData.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to my application!</Text>
      </View>

      {/* Avatar and User's Name */}
      <View style={styles.profile}>
        <Image
          source={require('./assets/avatar.jpg')}  // Avatar
          style={styles.avatar}
          onError={(error) => console.log("Error loading image:", error)}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Andrew</Text>
          <Text style={styles.bio}>I'm a robotics intern.</Text>
        </View>
      </View>

      {/* Card Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>My application</Text>
        <Text style={styles.cardDescription}>
        This application helps you manage your work effectively.
        </Text>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>

      {/* List Section */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Item List</Text>
        <FlatList
          data={listData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{item.title}</Text>
              {/* Delete Button */}
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(item.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter new item"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      {/* Footer with Icons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="home" size={30} color="white" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search" size={30} color="white" />
          <Text style={styles.iconText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="cog" size={30} color="white" />
          <Text style={styles.iconText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginTop: 20,
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  bio: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingBottom: 20,
    marginTop: 20,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    color: 'white',
  },
  listContainer: {
    marginBottom: 30,
    marginTop: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  inputField: {
    flex: 1,
    borderColor: '#6200EE',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
