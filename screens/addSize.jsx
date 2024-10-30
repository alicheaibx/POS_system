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

const AddSizeScreen = () => {
  const navigation = useNavigation();
  const [sizeName, setSizeName] = useState("");
  const [sizeList, setSizeList] = useState([]);

  const handleAddSizeToList = () => {
    if (!sizeName.trim()) {
      Alert.alert("Error", "Please enter a size!");
      return;
    }
    setSizeList((prevList) => [...prevList, sizeName]);
    setSizeName("");
  };

  const handleNext = () => {
    if (sizeList.length === 0) {
      Alert.alert("Error", "No sizes to save!");
      return;
    }

    Alert.alert("Success", "Sizes saved successfully!");
    setSizeList([]); // Clear the list after saving

    // Ensure navigation to AddMaterial screen in a stack manner
    navigation.navigate("AddMaterial", { sizeList });
  };

  const clearSizes = () => {
    setSizeList([]);
    Alert.alert("Success", "All sizes have been removed!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Size</Text>
      <TextInput
        style={styles.input}
        placeholder="Size name"
        value={sizeName}
        onChangeText={setSizeName}
      />
      <Button title="Add Size" onPress={handleAddSizeToList} />
      <FlatList
        data={sizeList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
      />
      <Button title="Next" onPress={handleNext} />
      <Button title="Clear All Sizes" onPress={clearSizes} color="red" />
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

export default AddSizeScreen;
