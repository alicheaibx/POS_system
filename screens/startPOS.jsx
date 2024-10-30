import { useNavigation } from "../navigationContext";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const StartPOSScreen = () => {
  const navigation = useNavigation();
  const [shopTitle, setShopTitle] = useState("");

  const handleNext = () => {
    // Handle next button click here, e.g., navigate to the next screen
    if (shopTitle.trim()) {
      navigation.navigate("AddCategory"); // Change 'NextScreen' to your target screen
    } else {
      alert("Please enter a title for your shop!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>
        Let's start building up your POS system
      </Text>
      <Text style={styles.subText}>
        First, let's start with a good title for your shop
      </Text>

      <TextInput
        style={styles.textInput}
        placeholder="Enter shop title"
        value={shopTitle}
        onChangeText={setShopTitle}
      />

      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  mainText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 20,
  },
});

export default StartPOSScreen;
