import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

export default function MapLocation() {
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState<import('react-native-maps').LatLng | null>(null);
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');

  const handleMapPress = async (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);

    try {
      const [place] = await Location.reverseGeocodeAsync(coordinate);
      setLocationName(place.name || place.city || 'Selected Place');
      setLocationAddress(
        `${place.street || ''}, ${place.city || ''}, ${place.region || ''}, ${place.country || ''}`
      );
    } catch {
      setLocationName('Unknown Place');
      setLocationAddress('Unable to retrieve address');
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
      }
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Select location</Text>
      </View>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.209,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>

      {/* Location Info */}
      {selectedLocation && (
        <View style={styles.locationInfo}>
          <View style={styles.nameRow}>
            <Ionicons name="location-outline" size={24} color="#000" style={{ marginRight: 8 }} />
            <Text style={styles.locationName}>{locationName}</Text>
          </View>
          <Text style={styles.locationAddress}>{locationAddress}</Text>
        </View>
      )}

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmBtn}>
        <Text style={styles.confirmText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 30,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Geologica',
    letterSpacing: -0.03,
    color: '#000',
  },
  map: {
    width: '100%',
    height: 468,
    borderRadius: 12,
    marginBottom: 24,
  },
  locationInfo: {
    marginBottom: 24,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationName: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Geologica',
    lineHeight: 32,
    letterSpacing: -0.03,
    color: '#000',
  },
  locationAddress: {
    width: 335,
    height: 20,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Geologica',
    lineHeight: 20,
    letterSpacing: -0.02,
    color: '#868686',
  },
  confirmBtn: {
    backgroundColor: '#FE3838',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: 327,
    alignSelf: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Geologica',
  },
});
