import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Continue: undefined;
  Login: undefined;
};

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleContinue = () => {
    if (phone.length > 0) {
      navigation.navigate('Continue');
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.heading}>Welcome back!</Text>

      <Text style={styles.subtext}>
        Provide your number so you earn rewards!
      </Text>

      {/* Input Field with Icon and Conditional Label */}
      <View style={styles.inputBox}>
        {phone.length === 0 && (
          <View style={styles.placeholderWrapper}>
            <Ionicons name="call-outline" size={20} color="#868686" style={{ marginRight: 6 }} />
            <Text style={styles.placeholderLabel}>Your Phone Number</Text>
          </View>
        )}
        <TextInput
          style={[
            styles.inputText,
            { marginLeft: phone.length === 0 ? 28 : 0, color: '#282828' },
          ]}
          keyboardType="phone-pad"
          placeholder=""
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.continueBtn,
          { backgroundColor: phone.length > 0 ? '#FE3838' : '#DDDDDD' },
        ]}
        onPress={handleContinue}
        disabled={phone.length === 0}
      >
        <Text style={styles.continueText}>Continue →</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={styles.bottomTextBox}>
        <Text style={styles.bottomText}>
          Already have an account? <Text style={styles.loginLink}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 104,
    marginTop: 2,
    marginBottom: 40,
  },
  heading: {
    fontFamily: 'Geologica',
    fontSize: 52,
    fontWeight: '800',
    color: '#282828',
    width: 350,
    textAlign: 'left',
    marginBottom: 12,
  },
  subtext: {
    fontFamily: 'Geologica',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.1,
    color: '#868686',
    width: 350,
    textAlign: 'left',
    marginBottom: 28,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 327,
    height: 48,
    borderWidth: 1,
    borderColor: '#282828',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
    position: 'relative',
  },
  placeholderWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    left: 12,
    top: 0,
    bottom: 0,
  },
  placeholderLabel: {
    fontFamily: 'Geologica',
    fontSize: 16,
    fontWeight: '400',
    color: '#868686',
  },
  inputText: {
    fontFamily: 'Geologica',
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
    height: '100%',
    lineHeight: 24,
    letterSpacing: -2,
    marginBottom: 0,
  },
  continueBtn: {
    width: 327,
    height: 52,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 360, // ⬅️ Updated to move button upward
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 1,
  },
  bottomTextBox: {
    width: 327,
    alignItems: 'center',
  },
  bottomText: {
    fontFamily: 'Geologica',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0,
    color: '#868686',
    textAlign: 'center',
  },
  loginLink: {
    color: '#282828',
    textDecorationLine: 'underline',
  },
});
