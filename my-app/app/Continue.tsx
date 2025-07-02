import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home_page: undefined;
};

export default function OTPPage() {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const correctOTP = '123456';

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((val) => val !== '')) {
      const fullOtp = newOtp.join('');
      if (fullOtp === correctOTP) {
        setError('');
        setShowPopup(true);
      } else {
        setError('OTP Invalid. Please check again.');
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(Array(6).fill(''));
    setError('');
    setTimer(60);
    inputRefs.current[0]?.focus();
  };

  const goToHome = () => {
    setShowPopup(false);
    navigation.navigate('Home_page');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />

      <Text style={styles.heading}>Enter the OTP sent.</Text>

      <Text style={styles.subtext}>
        Please enter the 4-digit OTP sent to you at{' '}
        <Text style={styles.editText}>******3326 Edit number</Text>
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => { inputRefs.current[index] = ref; }}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      {error !== '' && (
        <View style={styles.errorBox}>
          <Ionicons name="close-circle" size={20} color="#FF4C4C" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Text style={styles.timerText}>Resend in {timer}s</Text>

      {timer === 0 && (
        <TouchableOpacity style={styles.resendBtn} onPress={handleResend}>
          <Text style={styles.resendText}>Resend OTP</Text>
          <Ionicons name="refresh" size={18} color="#000000" />
        </TouchableOpacity>
      )}

      {/* Popup on correct OTP */}
      <Modal visible={showPopup} transparent animationType="fade">
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Ionicons name="location-outline" size={48} color="#EB2D27" />
            <Text style={styles.popupTitle}>Allow us to access your location?</Text>
            <Text style={styles.popupDescription}>
              This will help us provide you with the best options available near you!
            </Text>

            <TouchableOpacity style={styles.allowButton} onPress={goToHome}>
              <Text style={styles.allowText}>Allow access</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipButton} onPress={goToHome}>
              <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  logo: {
    width: 375,
    height: 100,
    marginBottom: 40,
    alignSelf: 'center',
  },
  heading: {
    fontFamily: 'Geologica',
    fontSize: 52,
    fontWeight: '800',
    lineHeight: 52,
    color: '#282828',
    width: 292,
    height: 156,
    marginBottom: 0,
  },
  subtext: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#A6A6A6',
    width: 327,
    height: 40,
    marginBottom: 24,
  },
  editText: {
    color: '#282828',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 327,
    height: 48,
    gap: 4,
    marginBottom: 16,
  },
  otpInput: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  timerText: {
    fontSize: 14,
    color: '#A6A6A6',
    marginBottom: 8,
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: '80%',
    gap: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000000',
    alignSelf: 'center',
    marginTop: 40,
  },
  resendText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffeaea',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    marginTop: 4,
  },
  errorText: {
    color: '#FF4C4C',
    marginLeft: 8,
    fontSize: 16,
  },
  popupContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    width: 320,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
    color: '#222',
  },
  popupDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  allowButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  allowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  skipText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
