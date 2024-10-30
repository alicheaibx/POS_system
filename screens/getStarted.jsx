import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-paper'; // Optional, you can replace this with a native button
import {useNavigation} from '../navigationContext';

const GetStarted = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Let's Get Started with Your POS System</Text>

      <View style={styles.stepsContainer}>
        <Text style={styles.step}>1. Install the POS app on your device.</Text>
        <Text style={styles.step}>2. Set up your business details.</Text>
        <Text style={styles.step}>3. Add your products and categories.</Text>
        <Text style={styles.step}>
          4. Customize your settings for payments.
        </Text>
        <Text style={styles.step}>
          5. Start making sales and track reports.
        </Text>
      </View>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('StartPOSScreen')} // Replace with your next screen
        style={styles.button}>
        Get Started
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  stepsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  step: {
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});

export default GetStarted;
