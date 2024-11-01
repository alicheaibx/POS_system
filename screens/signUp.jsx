import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { insertUser } from "../database"; // Adjust the path
import { useNavigation } from "../navigationContext";
import { useDatabase } from "../databaseContext"; // Import the context

const Signup = () => {
  const navigation = useNavigation();
  const { dbInitialized } = useDatabase(); // Access dbInitialized
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let isValid = true;
    setNameError("");
    setPasswordError("");

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleSignup = async () => {
    await initDB(); // Ensure the database is initialized

    if (!dbInitialized) {
      alert("Database is not initialized yet. Please wait.");
      return;
    }

    if (validate()) {
      try {
        await insertUser(name, null, password); // Pass null for email
        navigation.navigate("Login"); // Navigate to Login after successful signup
      } catch (error) {
        console.error("Error signing up:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
      {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: "#F49700",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Signup;
