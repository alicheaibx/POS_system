import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";
import { useNavigation } from "../navigationContext";

const Login = () => {
  const navigation = useNavigation();
  const [name, setName] = useState(""); // Change email to name
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(""); // Change emailError to nameError
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Home");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const validate = () => {
    let isValid = true;
    setNameError(""); // Reset nameError
    setPasswordError("");

    if (!name) {
      setNameError("Name is required"); // Validate name
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

  const handleLogin = () => {
    if (validate()) {
      // Replace the condition to check name instead of email
      if (name === "testUser" && password === "password123") {
        // Use appropriate credentials for comparison
        navigation.navigate("GetStarted"); // Navigate to GetStarted on successful login
      } else {
        setNameError("Invalid credentials"); // Show error if credentials are incorrect
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Name" // Change placeholder to Name
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate("Signup")}
        >
          Sign Up
        </Text>
      </Text>
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
  signupText: {
    marginTop: 20,
    textAlign: "center",
  },
  signupLink: {
    color: "blue",
  },
  loginButton: {
    backgroundColor: "#F49700",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Login;
