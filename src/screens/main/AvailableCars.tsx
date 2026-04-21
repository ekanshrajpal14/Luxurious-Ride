import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import { getTheme } from '../../theme/helper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainAppStackParamList } from '../../types/navigationTypes';
import { Car } from '../../types/cars/carTypes';
import { fetchAvailableCars } from '../../api/api';
import { AvailableCarsTypes } from '../../types/auth/requestTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../../components/customs/Loader';
import {
  MapPin,
  Calendar,
  Clock,
  ArrowUpDown,
  Users,
  Tag,
  ChevronRight,
} from 'lucide-react-native';

// ── Accent ────────────────────────────────────────────────
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E4C97E';
const GOLD_DIM = 'rgba(201,168,76,0.15)';
const GOLD_BORDER = 'rgba(201,168,76,0.35)';

const getPalette = (theme: ReturnType<typeof getTheme>) => {
  const isDark = theme.mode === 'dark';
  return {
    bg: theme.background,
    surface: theme.card,
    surfaceElevated: isDark ? '#2A2A2A' : '#E8E8E8',
    border: theme.border,
    text: theme.text,
    textMuted: theme.subText,
    textSub: theme.grey,
    primary: theme.primary,
    gold: GOLD,
    goldLight: GOLD_LIGHT,
    goldDim: GOLD_DIM,
    goldBorder: GOLD_BORDER,
    statusBar: (isDark ? 'light-content' : 'dark-content') as
      | 'light-content'
      | 'dark-content',
    ctaText: '#FFFFFF',
    shadow: isDark ? '#000000' : '#c0c0c0',
  };
};

// ─────────────────────────────────────────────────────────
type Props = NativeStackScreenProps<MainAppStackParamList, 'availableCars'>;

const AvailableCars = ({ route, navigation }: Props) => {
  const theme = getTheme();
  const C = getPalette(theme);

  const { tripType, pickupLocation, pickupDate, pickupTime, pickup_datetime } =
    route.params;

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

  const fetchCars = useCallback(
    async (page = currentPage + 1, reset = false) => {
      if (loading) return;
      if (!reset && page > totalPages) return;
      try {
        setLoading(true);
        const body: AvailableCarsTypes = {
          pickup_location: pickupLocation,
          trip_type: tripType,
          pickup_datetime,
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

  // ── Car Card ────────────────────────────────────────────
  const renderCar = ({ item }: { item: Car }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: C.surface,
          borderColor: C.border,
          shadowColor: C.shadow,
        },
      ]}
    >
      {/* Top row */}
      <View style={styles.cardTop}>
        {/* Car info */}
        <View style={styles.cardLeft}>
          {/* Category badge */}
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: C.goldDim, borderColor: C.goldBorder },
            ]}
          >
            <Text style={[styles.categoryBadgeText, { color: C.gold }]}>
              {item.CarCategory.category}
            </Text>
          </View>
          <Text style={[styles.carName, { color: C.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.metaRow}>
            <Users size={12} color={C.textMuted} />
            <Text style={[styles.metaText, { color: C.textMuted }]}>
              {item.seating_capacity} Seats
            </Text>
          </View>
        </View>

        {/* Price */}
        <View style={styles.cardRight}>
          <Text style={[styles.priceLabel, { color: C.textMuted }]}>
            Base fare
          </Text>
          <Text style={[styles.price, { color: C.gold }]}>
            ₹{item.CarsPricings[0].base_price}
          </Text>
          <Text style={[styles.perKm, { color: C.textMuted }]}>per trip</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={[styles.cardDivider, { backgroundColor: C.border }]} />

      {/* Select button */}
      <TouchableOpacity
        style={[styles.selectBtn, { backgroundColor: C.primary }]}
        activeOpacity={0.82}
        onPress={() =>
          navigation.navigate('booking', {
            car_id: item.id,
            pickupDate,
            pickupTime,
            pickupLocation,
            pickup_datetime,
            tripType,
          })
        }
      >
        <Text style={styles.selectText}>Select This Car</Text>
        <ChevronRight size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  // ── Full-screen loader ──────────────────────────────────
  if (loading && currentPage === 0) {
    return (
      <View style={[styles.loaderFull, { backgroundColor: C.bg }]}>
        <StatusBar barStyle={C.statusBar} backgroundColor={C.bg} />
        <ActivityIndicator size="large" color={C.gold} />
        <Text style={[styles.loaderText, { color: C.textMuted }]}>
          Finding best cars…
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: C.bg }}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar barStyle={C.statusBar} backgroundColor={C.bg} />

      <View style={[styles.container, { backgroundColor: C.bg }]}>
        {/* ── Trip summary strip ── */}
        <View
          style={[
            styles.summaryStrip,
            { backgroundColor: C.surface, borderColor: C.border },
          ]}
        >
          <View style={styles.summaryItem}>
            <MapPin size={13} color={C.gold} />
            <Text
              style={[styles.summaryText, { color: C.textMuted }]}
              numberOfLines={1}
            >
              {pickupLocation}
            </Text>
          </View>
          <View style={[styles.summaryDot, { backgroundColor: C.border }]} />
          <View style={styles.summaryItem}>
            <Calendar size={13} color={C.gold} />
            <Text style={[styles.summaryText, { color: C.textMuted }]}>
              {pickupDate}
            </Text>
          </View>
          <View style={[styles.summaryDot, { backgroundColor: C.border }]} />
          <View style={styles.summaryItem}>
            <Clock size={13} color={C.gold} />
            <Text style={[styles.summaryText, { color: C.textMuted }]}>
              {pickupTime}
            </Text>
          </View>
        </View>

        {/* ── Controls row ── */}
        <View style={styles.controlsRow}>
          <View>
            <Text style={[styles.resultsCount, { color: C.text }]}>
              {cars.length} Cars Available
            </Text>
            <Text style={[styles.tripTypeLabel, { color: C.textMuted }]}>
              {tripType.replace('_', ' ')} Trip
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.sortBtn,
              { backgroundColor: C.surface, borderColor: C.border },
            ]}
            onPress={() => setSortOrder(sortOrder === 'LOW' ? 'HIGH' : 'LOW')}
            activeOpacity={0.75}
          >
            <ArrowUpDown size={14} color={C.gold} />
            <Text style={[styles.sortBtnText, { color: C.text }]}>
              {sortOrder === 'LOW' ? 'Low → High' : 'High → Low'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Car list ── */}
        <FlatList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={renderCar}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
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
          ListEmptyComponent={
            !loading ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🚗</Text>
                <Text style={[styles.emptyTitle, { color: C.text }]}>
                  No cars found
                </Text>
                <Text style={[styles.emptySubtitle, { color: C.textMuted }]}>
                  Try adjusting your pickup location or date
                </Text>
              </View>
            ) : null
          }
          ListFooterComponent={
            loading ? (
              <View style={styles.footerLoader}>
                <Loader color={C.gold} size={25} />
              </View>
            ) : currentPage === totalPages ? (
              cars.length > 0 ? (
                <Text style={[styles.endText, { color: C.textMuted }]}>
                  ✦ All cars loaded ✦
                </Text>
              ) : null
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default AvailableCars;

// ── Static layout styles (zero hardcoded colors) ──────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 12,
  },

  // Full-screen loader
  loaderFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loaderText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },

  // Trip summary strip
  summaryStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
    gap: 8,
    flexWrap: 'nowrap',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  summaryText: {
    fontSize: 11,
    fontWeight: '500',
    flexShrink: 1,
  },
  summaryDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },

  // Controls row
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '700',
  },
  tripTypeLabel: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sortBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Car card
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  cardLeft: {
    flex: 1,
    paddingRight: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 6,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  carName: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Price side
  cardRight: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  perKm: {
    fontSize: 10,
    marginTop: 1,
  },

  // Divider
  cardDivider: {
    height: 1,
    marginBottom: 12,
  },

  // Select button
  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 11,
    gap: 6,
  },
  selectText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.2,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 20,
  },

  // Footer
  footerLoader: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    paddingVertical: 16,
  },
});
