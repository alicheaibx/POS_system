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

const AddMaterialSizeScreen = () => {
  const navigation = useNavigation();
  const [sizeName, setSizeName] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [sizeList, setSizeList] = useState([]);
  const [materialList, setMaterialList] = useState([]);

  const handleAddSizeToList = () => {
    if (!sizeName.trim()) {
      Alert.alert("Error", "Please enter a size!");
      return;
    }
    setSizeList((prevList) => [...prevList, sizeName]);
    setSizeName("");
  };

  const handleAddMaterialToList = () => {
    if (!materialName.trim()) {
      Alert.alert("Error", "Please enter a material!");
      return;
    }
    setMaterialList((prevList) => [...prevList, materialName]);
    setMaterialName("");
  };

  const handleNext = () => {
    if (sizeList.length === 0 && materialList.length === 0) {
      Alert.alert("Error", "No sizes or materials to save!");
      return;
    }

    Alert.alert("Success", "Sizes and materials saved successfully!");
    setSizeList([]); // Clear the list after saving
    setMaterialList([]); // Clear the list after saving
    navigation.navigate("SizeListScreen", { sizeList, materialList });
  };

  const clearSizes = () => {
    setSizeList([]);
    Alert.alert("Success", "All sizes have been removed!");
  };

  const clearMaterials = () => {
    setMaterialList([]);
    Alert.alert("Success", "All materials have been removed!");
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

      <TextInput
        style={styles.input}
        placeholder="Material name"
        value={materialName}
        onChangeText={setMaterialName}
      />
      <Button title="Add Material" onPress={handleAddMaterialToList} />

      <FlatList
        data={sizeList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        ListHeaderComponent={<Text style={styles.listHeader}>Sizes:</Text>}
      />
      <Button title="Clear All Sizes" onPress={clearSizes} color="red" />

      <FlatList
        data={materialList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        ListHeaderComponent={<Text style={styles.listHeader}>Materials:</Text>}
      />
      <Button
        title="Clear All Materials"
        onPress={clearMaterials}
        color="red"
      />

      <Button title="Next" onPress={handleNext} />
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
  listHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  listItem: {
    fontSize: 18,
    paddingVertical: 5,
  },
});

export default AddMaterialSizeScreen;
