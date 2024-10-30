import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { useNavigation } from "../navigationContext";

const AddCategoryScreen = () => {
  const navigation = useNavigation();
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const handleAddCategoryToList = () => {
    if (!categoryName.trim()) {
      Alert.alert("Error", "Please enter a category name!");
      return;
    }
    setCategoryList((prevList) => [...prevList, categoryName]);
    setCategoryName("");
  };

  const handleNext = () => {
    if (categoryList.length === 0) {
      Alert.alert("Error", "No categories to save!");
      return;
    }

    Alert.alert("Success", "Categories saved successfully!");
    setCategoryList([]); // Clear the list after saving
    navigation.navigate("AddSize", { categoryList }); // Navigate to the next screen
  };

  const clearCategories = () => {
    setCategoryList([]);
    Alert.alert("Success", "All categories have been removed!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Category name"
        value={categoryName}
        onChangeText={setCategoryName}
      />
      <Button title="Add Category" onPress={handleAddCategoryToList} />
      <FlatList
        data={categoryList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
      />
      <Button title="Next" onPress={handleNext} />
      <Button
        title="Clear All Categories"
        onPress={clearCategories}
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  listItem: {
    fontSize: 18,
    paddingVertical: 5,
  },
});

export default AddCategoryScreen;
