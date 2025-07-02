import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomePage() {
  const navigation = useNavigation() as any;
  const [city, setCity] = useState('Fetching location...');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setCity('Permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const geocode = await Location.reverseGeocodeAsync(location.coords);
      if (geocode.length > 0) {
        const place = geocode[0];
        setCity(`${place.city || place.name || place.region}, ${place.country}`);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <TouchableOpacity
              style={styles.location}
              onPress={() => navigation.navigate('Select_Location')}
            >
              <Text style={styles.changeLocation}>Change Location</Text>
              <AntDesign name="down" size={12} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.selectedLocation}>{city}</Text>
          </View>
          <View style={styles.rightIcons}>
            <Ionicons name="notifications-outline" size={24} color="white" style={{ marginRight: 16 }} />
            <Image source={require('../assets/Card1.png')} style={styles.profileImage} />
          </View>
        </View>

        {/* What's on your mind */}
        <View style={styles.whatsOnMindBox}>
          <TouchableOpacity style={styles.whatsOnMindBtn}>
            <Text style={{ color: '#727272' }}>What’s on your mind?</Text>
            <Feather name="search" size={20} color="#727272" />
          </TouchableOpacity>
        </View>

        {/* Cards */}
        <View style={styles.row}>
          <Image source={require('../assets/Card2.png')} style={styles.card2} />
        </View>

        <View style={styles.whiteLayout}>
          <View style={styles.row}>
            <Image source={require('../assets/Card3.png')} style={styles.card34} />
            <Image source={require('../assets/Card4.png')} style={styles.card34} />
          </View>

          <View style={styles.box}>
            <Image source={require('../assets/Card5.png')} style={styles.card5and6} />
            <Image source={require('../assets/Card6.png')} style={styles.card5and6} />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image source={require('../assets/Card7.png')} style={styles.cardHorizontal} />
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image source={require('../assets/Card9.png')} style={styles.cardHorizontalSmall} />
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image source={require('../assets/images/Card11.png')} style={styles.cardHorizontalLarge} />
          </ScrollView>

          <View style={styles.blackBox}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Image source={require('../assets/Card8.png')} style={styles.card8} />
            </ScrollView>
          </View>

          <Image source={require('../assets/Card10.png')} style={styles.card10} />
          <Image source={require('../assets/Card12.png')} style={styles.card12} />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home_page')}>
          <MaterialIcons name="home-filled" size={24} color="#282828" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('favourites')}>
          <AntDesign name="hearto" size={24} color="#727272" />
          <Text style={styles.navText}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scannerBtn}
          onPress={() => navigation.navigate('scanner')}
        >
          <Feather name="camera" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Near_me')}>
          <Ionicons name="location-outline" size={24} color="#727272" />
          <Text style={styles.navText}>Near Me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('payment')}>
          <Feather name="credit-card" size={24} color="#727272" />
          <Text style={styles.navText}>Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 16,
    height: 100,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeLocation: {
    color: '#fff',
    fontSize: 14,
  },
  selectedLocation: {
    color: '#fff',
    marginTop: 4,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  whatsOnMindBox: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  whatsOnMindBtn: {
    backgroundColor: '#fff',
    borderRadius: 24,
    height: 48,
    width: 335,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  card2: {
    width: 150,
    height: 160,
    borderRadius: 12,
  },
  whiteLayout: {
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 24,
  },
  card34: {
    width: 160,
    height: 224,
    borderRadius: 12,
  },
  box: {
    flexDirection: 'row',
    backgroundColor: '#D8BA8D',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  card5and6: {
    width: 200,
    height: 204,
    borderRadius: 12,
  },
  cardHorizontal: {
    width: 335,
    height: 204,
    marginBottom: 16,
    borderRadius: 12,
  },
  cardHorizontalSmall: {
    width: 335,
    height: 124,
    borderRadius: 12,
  },
  cardHorizontalLarge: {
    width: 335,
    height: 746,
    borderRadius: 12,
  },
  blackBox: {
    backgroundColor: '#282828',
    padding: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  card8: {
    width: 335,
    height: 80,
    borderRadius: 12,
  },
  card10: {
    width: 335,
    height: 392,
    marginBottom: 16,
    borderRadius: 12,
  },
  card12: {
    width: 335,
    height: 192,
    borderRadius: 12,
    marginBottom: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navText: {
    fontSize: 10,
    color: '#727272',
    textAlign: 'center',
  },
  scannerBtn: {
    backgroundColor: '#FE3838',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
});
