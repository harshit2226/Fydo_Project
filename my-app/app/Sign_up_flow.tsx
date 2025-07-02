import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Continue: undefined;
  Login: undefined;
};

export default function SignUpIntro() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const isButtonEnabled = name.trim() !== '' && phone.trim() !== '';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: isButtonEnabled ? '#FE3838' : '#DDDDDD' },
          ]}
          disabled={!isButtonEnabled}
          onPress={() => navigation.navigate('Continue')}
        >
          <View style={styles.continueInner}>
            <Text style={styles.continueText}>Continue</Text>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>

        {/* Already have an account */}
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 40,
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
    width: 400,
    height: 200,
  },
  heading: {
    width: 292,
    height: 156,
    fontFamily: 'Geologica',
    fontWeight: '800',
    fontSize: 52,
    lineHeight: 52,
    letterSpacing: -2,
    color: '#282828',
    marginBottom: 10,
    marginTop: 50,
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
    paddingVertical: 1,
    marginBottom: 10,
    width: 327,
    height: 48,
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
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  continueButton: {
    width: 327,
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  continueInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  arrow: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Geologica',
    lineHeight: 20,
    color: '#A6A6A6',
  },
  loginLink: {
    color: '#282828',
    fontWeight: 'bold',
  },
});
