import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { getTheme } from '../../theme/helper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainAppStackParamList } from '../../types/navigationTypes';
import { Car } from '../../types/cars/carTypes';
import { fetchAvailableCars } from '../../api/api';
import { AvailableCarsTypes } from '../../types/auth/requestTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../../components/customs/Loader';

type Props = NativeStackScreenProps<MainAppStackParamList, 'availableCars'>;
const AvailableCars = ({ route, navigation }: Props) => {
  const theme = getTheme();
  const { tripType, pickupLocation, pickupDate, pickupTime } = route.params;

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<'LOW' | 'HIGH'>('LOW');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const isInitialLoad = useRef(true);
  const onEndReachedCalledDuringMomentum = useRef(false);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      resetAndFetch();
    } else {
      resetAndFetch();
    }
  }, [sortOrder]);

  const resetAndFetch = () => {
    setCars([]);
    setCurrentPage(0);
    setTotalPages(1);
    fetchCars(1, true);
  };
  useEffect(() => {
    console.log(currentPage, totalPages);
  }, [totalPages, currentPage]);

  const fetchCars = useCallback(
    async (page = currentPage + 1, reset = false) => {
      if (loading) return;
      if (!reset && page > totalPages) return;

      try {
        setLoading(true);

        const body: AvailableCarsTypes = {
          pickup_location: pickupLocation,
          trip_type: tripType,
          pickup_date: pickupDate,
          pickup_time: pickupTime,
          sort_by: sortOrder === 'LOW' ? 'newest' : 'price_high',
        };

        const response = await fetchAvailableCars(page, body);

        setCars(prev =>
          reset ? response.data.cars : [...prev, ...response.data.cars],
        );

        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, totalPages, loading, sortOrder],
  );

  const renderCar = ({ item }: { item: Car }) => (
    <View style={styles.card}>
      <View style={{ width: '70%' }}>
        <Text style={styles.carName}>{item.name}</Text>
        <Text style={styles.carMeta}>
          {item.CarCategory.category} • {item.seating_capacity} Seats
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.price}>₹{item.CarsPricings[0].base_price}</Text>
        <TouchableOpacity
          style={[styles.selectBtn, { backgroundColor: theme.primary }]}
          onPress={() =>
            navigation.navigate('booking', {
              car_id: item.id,
              pickupDate,
              pickupTime,
              pickupLocation,
            })
          }
        >
          <Text style={styles.selectText}>Select Car</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && currentPage === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: 0 }}
      edges={['bottom', 'left', 'right']}
    >
      <View style={styles.container}>
        {/* SORT */}
        <View style={styles.sortRow}>
          <Text style={styles.sortLabel}>Sort by Price</Text>
          <TouchableOpacity
            onPress={() => setSortOrder(sortOrder === 'LOW' ? 'HIGH' : 'LOW')}
          >
            <Text style={[styles.sortAction, { color: theme.primary }]}>
              {sortOrder === 'LOW' ? 'Low → High' : 'High → Low'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* LIST */}
        <FlatList
          data={cars}
          keyExtractor={item => String(item.id + Math.random() * 100)} // ✅ never use index
          renderItem={renderCar}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum.current) {
              fetchCars();
              onEndReachedCalledDuringMomentum.current = true;
            }
          }}
          ListFooterComponent={
            loading ? (
              <View style={{ height: 25 }}>
                <Loader color={theme.primary} size={25} />
              </View>
            ) : currentPage === totalPages ? (
              <View style={{ height: 25 }}></View>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};
export default AvailableCars;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sortLabel: {
    fontWeight: '600',
  },
  sortAction: {
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carName: {
    // maxWidth: '0%',
    fontSize: 16,
    fontWeight: '700',
  },
  carMeta: {
    color: '#777',
    marginTop: 4,
  },
  right: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  selectBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  selectText: {
    color: '#fff',
    fontWeight: '700',
  },
});
