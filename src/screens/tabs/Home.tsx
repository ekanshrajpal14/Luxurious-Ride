import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { getTheme } from '../../theme/helper';
import { Filter, Search } from 'lucide-react-native';
import CarCard from '../../components/customs/CarCard';
import { useAppSelector } from '../../hooks/useAppSelector';
import { brandImages } from '../../constants/brandImages';
import BrandShimmer from '../../shimmers/BrandShimmer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchCars } from '../../store/slices/carSlice';
import Loader from '../../components/customs/Loader';
import CarCardShimmer from '../../shimmers/CarCardShimmer';

// const cars = [
//   {
//     id: 1,
//     name: 'Ferrari-FF',
//     image: require('../../../assets/images/bgimage.jpg'),
//     price: '$200/day',
//     seats: '4 Seats',
//     location: 'Washington DC',
//   },
//   {
//     id: 2,
//     name: 'Tesla Model S',
//     image: require('../../../assets/images/bgimage.jpg'),
//     price: '$100/day',
//     seats: '5 Seats',
//     location: 'Chicago, USA',
//   },

//   {
//     id: Date.now() + Math.floor(Math.random()),
//     name: 'Tesla Model S',
//     image: require('../../../assets/images/bgimage.jpg'),
//     price: '$100/day',
//     seats: '5 Seats',
//     location: 'Chicago, USA',
//   },
//   {
//     id: Date.now() + Math.floor(Math.random() * 1100),
//     name: 'Tesla Model S',
//     image: require('../../../assets/images/bgimage.jpg'),
//     price: '$100/day',
//     seats: '5 Seats',
//     location: 'Chicago, USA',
//   },
// ];

export default function Home() {
  const theme = getTheme();
  const {
    brands,
    brandLoading,
    cars,
    carLoading,
    carCurrentPage,
    carTotalPages,
  } = useAppSelector(state => state.cars);
  const dispatch = useAppDispatch();

  const handleLoadMore = () => {
    // ⛔ Prevent duplicate calls
    if (carLoading) return;

    // ⛔ Stop when last page reached
    if (carCurrentPage >= carTotalPages) return;

    dispatch(fetchCars({ page: carCurrentPage + 1 }));
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchRow}>
          <View
            style={[
              styles.searchBox,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Search size={17} color={theme.grey} />
            <TextInput
              placeholder="Search your dream car..."
              placeholderTextColor={theme.grey}
              style={{ color: theme.text }}
            />
          </View>

          <View style={[styles.filterBtn, { backgroundColor: theme.card }]}>
            <Filter color={theme.grey} size={19} />
          </View>
        </View>

        {/* Brands */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Brands</Text>

        <View style={styles.brandsRow}>
          {brandLoading ? (
            <BrandShimmer />
          ) : (
            brands &&
            brands.map((item, i) => (
              <View key={i} style={styles.brandItem}>
                <View
                  style={[styles.brandIcon, { backgroundColor: theme.card }]}
                >
                  <Image
                    source={brandImages[item.brand_name]}
                    style={styles.brandImage}
                  />
                </View>
                <Text style={[styles.brandText, { color: theme.subText }]}>
                  {item.brand_name}
                </Text>
              </View>
            ))
          )}
        </View>

        {/* Best Cars */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Best Cars
          </Text>
          <Text style={[styles.viewAll, { color: theme.link }]}>View All</Text>
        </View>

        <View style={styles.cardRow}>
          {cars.length === 0 && carLoading ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {[1, 2].map(i => (
                <CarCardShimmer key={i} />
              ))}
            </View>
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={cars}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <CarCard car={item} />}
              contentContainerStyle={{ gap: 20, paddingHorizontal: 2 }}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.7}
              ListFooterComponent={
                carLoading && cars.length > 0 ? <CarCardShimmer /> : null
              }
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    fontSize: 22,
    fontWeight: '800',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  notification: {
    marginRight: 12,
  },

  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },

  searchRow: {
    flexDirection: 'row',
    marginTop: 20,
  },

  searchBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingRight: 20,
    flexDirection: 'row',
  },

  filterBtn: {
    marginLeft: 10,
    backgroundColor: '#fff',
    borderRadius: 14,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 24,
  },

  brandsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  brandItem: {
    alignItems: 'center',
  },

  brandIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#000',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  brandText: {
    marginTop: 8,
    fontSize: 12,
    includeFontPadding: false,
    textTransform: 'uppercase',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  viewAll: {
    color: '#888',
    fontSize: 13,
    marginTop: 10,
  },

  cardRow: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 14,
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
  },

  carImage: {
    width: '100%',
    height: 90,
    resizeMode: 'contain',
  },

  carName: {
    fontWeight: '700',
    marginTop: 6,
  },

  subText: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  price: {
    fontWeight: '700',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 30,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
