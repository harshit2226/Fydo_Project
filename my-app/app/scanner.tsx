import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Sign_up_flow: undefined;
  // add other routes here if needed
};

export default function SignUpIntro() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const isButtonEnabled = name.trim() !== '' && phone.trim() !== '';

  return (
    <View style={styles.container}>

      {/* Logo at top */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Heading */}
      <Text style={styles.heading}>Shopping turned into rewards 🎉</Text>

      {/* Subtext */}
      <Text style={styles.subtext}>Fill in your details to create an account!</Text>

      {/* Full Name Input */}
      <View style={styles.inputBox}>
        <Feather name="user" size={16} color="#868686" style={styles.icon} />
        <TextInput
          placeholder="Your Full Name"
          placeholderTextColor="#868686"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputBox}>
        <Feather name="phone" size={16} color="#868686" style={styles.icon} />
        <TextInput
          placeholder="Your Phone Number"
          placeholderTextColor="#868686"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      {/* Terms and Policies */}
      <Text style={styles.terms}>
        By tapping <Text style={styles.bold}>“Continue”</Text> below, you agree to the{' '}
        <Text style={styles.bold}>Terms</Text> and <Text style={styles.bold}>Policies</Text>.
      </Text>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          { backgroundColor: isButtonEnabled ? '#FE3838' : '#DDDDDD' },
        ]}
        disabled={!isButtonEnabled}
        onPress={() => navigation.navigate('Sign_up_flow')}
      >
        <Text style={styles.continueText}>Continue</Text>
        <MaterialIcons name="arrow-forward-ios" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 24,
    width: 375,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 40,
  },
  heading: {
    width: 292,
    height: 156,
    fontFamily: 'Geologica',
    fontWeight: '600',
    fontSize: 52,
    lineHeight: 52,
    letterSpacing: -2,
    color: '#282828',
    marginBottom: 16,
  },
  subtext: {
    width: 327,
    height: 20,
    fontFamily: 'Geologica',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.28,
    color: '#A6A6A6',
    marginBottom: 24,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    fontFamily: 'Geologica',
  },
  terms: {
    width: 327,
    fontFamily: 'Geologica',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.28,
    fontWeight: '500',
    color: '#A6A6A6',
    marginBottom: 24,
  },
  bold: {
    color: '#282828',
    fontWeight: 'bold',
  },
  continueButton: {
    width: 327,
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
