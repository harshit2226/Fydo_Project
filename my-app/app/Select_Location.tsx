import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home_page: undefined;
  map_location: undefined; // 👈 Ensure this is registered in your stack navigator
};

const initialLocations = [
  {
    id: '1',
    name: 'Connaught Place',
    address: 'Central Delhi, New Delhi, Delhi',
  },
  {
    id: '2',
    name: 'Saket',
    address: 'South Delhi, New Delhi, Delhi',
  },
  {
    id: '3',
    name: 'Noida Sector 18',
    address: 'Noida, Uttar Pradesh',
  },
  {
    id: '4',
    name: 'Cyber Hub',
    address: 'Gurugram, Haryana',
  },
];

export default function SelectLocation() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [recentLocations, setRecentLocations] = useState(initialLocations);
  const [allLocations, setAllLocations] = useState(initialLocations);
  const [showAll, setShowAll] = useState(false);

  const handleSearch = () => {
    if (search.trim() === '') return;
    const newEntry = {
      id: Date.now().toString(),
      name: search,
      address: `${search}, India`,
    };
    const updatedList = [newEntry, ...recentLocations.slice(0, 4)];
    const updatedAll = [newEntry, ...allLocations].slice(0, 20);
    setRecentLocations(updatedList);
    setAllLocations(updatedAll);
    setSearch('');
  };

  const renderLocationItem = ({ item }: any) => (
    <View style={styles.locationItem}>
      <Ionicons name="location-outline" size={16} color="#000" style={styles.locationIcon} />
      <View>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationAddress}>{item.address}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ height: 20 }} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home_page')}>
          <Ionicons name="arrow-back" size={20} color="#868686" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Select location</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search for location"
          style={styles.input}
          placeholderTextColor="#A6A6A6"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Feather name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Recent Locations */}
      <Text style={styles.sectionTitle}>Recent location</Text>
      <FlatList
        data={showAll ? allLocations : recentLocations}
        keyExtractor={(item) => item.id}
        renderItem={renderLocationItem}
      />

      {!showAll && (
        <TouchableOpacity
          onPress={() => setShowAll(true)}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
        >
          <Text style={styles.viewMore}>View more </Text>
          <AntDesign name="down" size={12} color="#000" />
        </TouchableOpacity>
      )}

      {/* Last searched */}
      <Text style={styles.sectionTitle}>Last searched for</Text>
      <FlatList
        data={recentLocations}
        keyExtractor={(item) => item.id + 'last'}
        renderItem={renderLocationItem}
      />

      {/* Use My Current Location Button */}
      <TouchableOpacity
        style={styles.currentLocationBtn}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="location" size={20} color="#fff" />
        <Text style={styles.currentLocationText}>Use my current Location</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Ionicons name="location" size={48} color="#FE3838" style={{ marginBottom: 16 }} />
            <Text style={styles.modalTitle}>Allow us to access your location?</Text>
            <Text style={styles.modalDesc}>
              This will help us provide you with the best options available near you!
            </Text>
            <TouchableOpacity
              style={styles.allowBtn}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('map_location');
              }}
            >
              <Text style={styles.allowText}>Allow access</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
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
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  backIcon: {
    marginRight: 10,
    marginTop: 3.33,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'Geologica',
    letterSpacing: -0.03,
    lineHeight: 28,
    width: 307,
    color: '#282828',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Geologica',
    letterSpacing: -0.03,
    lineHeight: 28,
    color: '#212121',
    marginBottom: 12,
  },
  locationItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
    gap: 8,
  },
  locationIcon: {
    marginTop: 4,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#282828',
    fontFamily: 'Geologica',
    lineHeight: 24,
  },
  locationAddress: {
    fontSize: 12,
    color: '#A6A6A6',
    lineHeight: 16,
    fontFamily: 'Geologica',
  },
  viewMore: {
    color: '#000',
    textAlign: 'left',
  },
  currentLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FE3838',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
  },
  currentLocationText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Geologica',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 24,
    width: 320,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 30,
    textAlign: 'center',
    fontFamily: 'Geologica',
    marginBottom: 20,
  },
  modalDesc: {
    fontSize: 16,
    fontWeight: '500',
    color: '#BBBBBB',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Geologica',
    marginBottom: 24,
  },
  allowBtn: {
    backgroundColor: '#000',
    padding: 16,
    width: 279,
    borderRadius: 12,
    marginBottom: 12,
  },
  allowText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  skipText: {
    color: '#282828',
    fontWeight: '500',
    fontSize: 16,
  },
});
