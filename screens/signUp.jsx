import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDatabase } from "../databaseContext"; // Ensure this imports your database context
import { addUser } from "../database"; // Make sure to import addUser from the correct path

const Signup = () => {
  const { dbInitialized } = useDatabase();
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
    if (!dbInitialized) {
      alert("Database is not initialized yet. Please wait.");
      return;
    }

    if (validate()) {
      try {
        await addUser({ name, password }); // Use the addUser function
        console.log("User inserted successfully");
        alert("Signup successful!");
        // Clear input fields after successful signup
        setName("");
        setPassword("");
      } catch (error) {
        console.error("Error inserting user:", error);
        alert("An error occurred. Please try again.");
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
