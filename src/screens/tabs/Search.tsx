import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { getTheme } from '../../theme/helper';
import { Calendar1, Clock, MapPin, ChevronRight } from 'lucide-react-native';
import { MainAppStackParamList } from '../../types/navigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '../../hooks/useToast';

type NavType = NativeStackNavigationProp<MainAppStackParamList>;

// ── Accent (same on both themes) ──────────────────────────
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E4C97E';
const GOLD_DIM = 'rgba(201,168,76,0.15)';
const GOLD_BORDER = 'rgba(201,168,76,0.35)';

// ── Build a live palette from the active theme ────────────
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
    gold: theme.gold,
    goldLight: theme.goldLight,
    goldDim: theme.goldDim,
    goldBorder: theme.goldBorder,
    statusBar: theme.statusBar,
    ctaText: theme.ctaText, // always dark on gold button
  };
};

const TRIP_TYPES = [
  { key: 'LOCAL', label: 'Local', emoji: '🏙️' },
  { key: 'ROUND_TRIP', label: 'Round Trip', emoji: '🔄' },
];

// ─────────────────────────────────────────────────────────
const Search = () => {
  const navigation = useNavigation<NavType>();
  const theme = getTheme();
  const C = getPalette(theme);
  const { showError } = useToast();

  const [tripType, setTripType] = useState<'LOCAL' | 'ROUND_TRIP'>('LOCAL');
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const oneHourFromNow = new Date();
  oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
  const [pickupTime, setPickupTime] = useState<Date>(oneHourFromNow);

  const formattedDate = pickupDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = pickupTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleExplore = () => {
    if (!tripType || !pickupLocation || !pickupDate || !pickupTime) {
      return showError('All Fields are required');
    }
    const pad = (n: number) => String(n).padStart(2, '0');
    const pickup_datetime =
      `${pickupDate.getFullYear()}-${pad(pickupDate.getMonth() + 1)}-${pad(
        pickupDate.getDate(),
      )}` +
      `T${pad(pickupTime.getHours())}:${pad(pickupTime.getMinutes())}:${pad(
        pickupTime.getSeconds(),
      )}`;

    navigation.navigate('availableCars', {
      tripType,
      pickupLocation,
      pickupDate: pickupDate.toISOString().split('T')[0],
      pickupTime: formattedTime,
      pickup_datetime,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: C.bg }}
      behavior="padding"
      keyboardVerticalOffset={80}
    >
      <StatusBar barStyle={C.statusBar} backgroundColor={C.bg} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.scroll}
      >
        {/* ── Hero ──────────────────────────────────────── */}
        <View style={styles.hero}>
          {/* Ambient glow — subtle on light, visible on dark */}
          <View
            style={[
              styles.heroGlow,
              { backgroundColor: C.goldDim, shadowColor: C.gold },
            ]}
          />

          <View
            style={[
              styles.heroBadge,
              { backgroundColor: C.goldDim, borderColor: C.goldBorder },
            ]}
          >
            <Text style={[styles.heroBadgeText, { color: C.gold }]}>
              🚗 Premium Car Rental
            </Text>
          </View>

          <Text style={[styles.heroTitle, { color: C.text }]}>
            Where are you{'\n'}
            <Text style={{ color: C.gold }}>headed today?</Text>
          </Text>
          <Text style={[styles.heroSub, { color: C.textMuted }]}>
            Book in seconds · Ride in comfort
          </Text>

          {/* Stats strip */}
          <View
            style={[
              styles.statsRow,
              { backgroundColor: C.surface, borderColor: C.border },
            ]}
          >
            {[
              { value: '500+', label: 'Cars' },
              { value: '50+', label: 'Cities' },
              { value: '4.9★', label: 'Rating' },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: C.goldLight }]}>
                    {s.value}
                  </Text>
                  <Text style={[styles.statLabel, { color: C.textMuted }]}>
                    {s.label}
                  </Text>
                </View>
                {i < 2 && (
                  <View
                    style={[styles.statDivider, { backgroundColor: C.border }]}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* ── Booking Card ───────────────────────────────── */}
        <View
          style={[
            styles.card,
            { backgroundColor: C.surface, borderColor: C.border },
          ]}
        >
          {/* Trip Type Tabs */}
          <View
            style={[styles.tabsWrapper, { backgroundColor: C.surfaceElevated }]}
          >
            {TRIP_TYPES.map(({ key, label, emoji }) => {
              const active = tripType === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.tab,
                    active && {
                      backgroundColor: C.goldDim,
                      borderWidth: 1,
                      borderColor: C.gold,
                    },
                  ]}
                  onPress={() => setTripType(key as any)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.tabEmoji}>{emoji}</Text>
                  <Text
                    style={[
                      styles.tabText,
                      { color: active ? C.gold : C.textMuted },
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Section label */}
          <View style={styles.sectionLabel}>
            <View style={[styles.sectionAccent, { backgroundColor: C.gold }]} />
            <Text style={[styles.sectionLabelText, { color: C.textMuted }]}>
              TRIP DETAILS
            </Text>
          </View>

          {/* Pickup Location */}
          <View style={[styles.inputBlock, { borderBottomColor: C.border }]}>
            <View style={styles.inputIconCol}>
              <View
                style={[
                  styles.inputIconCircle,
                  { backgroundColor: C.goldDim, borderColor: C.goldBorder },
                ]}
              >
                <MapPin size={14} color={C.gold} />
              </View>
              <View style={[styles.inputLine, { backgroundColor: C.border }]} />
            </View>
            <View style={styles.inputContent}>
              <Text style={[styles.inputLabel, { color: C.textMuted }]}>
                FROM
              </Text>
              <TextInput
                placeholder="Enter pickup city or area"
                placeholderTextColor={C.textMuted}
                value={pickupLocation}
                onChangeText={setPickupLocation}
                style={[styles.textInput, { color: C.text }]}
              />
            </View>
          </View>

          {/* Pickup Date */}
          <TouchableOpacity
            style={[styles.inputBlock, { borderBottomColor: C.border }]}
            onPress={() => setShowCalendar(true)}
            activeOpacity={0.75}
          >
            <View style={styles.inputIconCol}>
              <View
                style={[
                  styles.inputIconCircle,
                  { backgroundColor: C.goldDim, borderColor: C.goldBorder },
                ]}
              >
                <Calendar1 size={14} color={C.gold} />
              </View>
              <View style={[styles.inputLine, { backgroundColor: C.border }]} />
            </View>
            <View style={styles.inputContent}>
              <Text style={[styles.inputLabel, { color: C.textMuted }]}>
                PICKUP DATE
              </Text>
              <Text style={[styles.inputValue, { color: C.text }]}>
                {formattedDate}
              </Text>
            </View>
            <ChevronRight size={16} color={C.textMuted} />
          </TouchableOpacity>

          {/* Pickup Time */}
          <TouchableOpacity
            style={styles.inputBlockLast}
            onPress={() => setShowTimePicker(true)}
            activeOpacity={0.75}
          >
            <View style={styles.inputIconCol}>
              <View
                style={[
                  styles.inputIconCircle,
                  { backgroundColor: C.goldDim, borderColor: C.goldBorder },
                ]}
              >
                <Clock size={14} color={C.gold} />
              </View>
            </View>
            <View style={styles.inputContent}>
              <Text style={[styles.inputLabel, { color: C.textMuted }]}>
                PICKUP TIME
              </Text>
              <Text style={[styles.inputValue, { color: C.text }]}>
                {formattedTime}
              </Text>
            </View>
            <ChevronRight size={16} color={C.textMuted} />
          </TouchableOpacity>

          {/* CTA Button */}
          <TouchableOpacity
            style={[styles.ctaBtn, { backgroundColor: C.gold }]}
            onPress={handleExplore}
            activeOpacity={0.85}
          >
            <Text style={[styles.ctaBtnText, { color: C.ctaText }]}>
              Explore Available Cars
            </Text>
            <Text style={[styles.ctaBtnArrow, { color: C.ctaText }]}>→</Text>
          </TouchableOpacity>
        </View>

        {/* ── Features strip ────────────────────────────── */}
        <View style={styles.featuresRow}>
          {[
            { icon: '🔒', text: 'Safe & Secure' },
            { icon: '⚡', text: 'Instant Booking' },
            { icon: '💳', text: 'Easy Payment' },
          ].map(f => (
            <View key={f.text} style={styles.featureItem}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={[styles.featureText, { color: C.textMuted }]}>
                {f.text}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <DatePicker
        modal
        open={showCalendar}
        date={pickupDate}
        mode="date"
        theme={theme.mode}
        minimumDate={new Date()}
        onConfirm={date => {
          setShowCalendar(false);
          setPickupDate(date);
        }}
        onCancel={() => setShowCalendar(false)}
      />
      <DatePicker
        modal
        open={showTimePicker}
        date={pickupTime}
        mode="time"
        theme={theme.mode}
        minimumDate={oneHourFromNow}
        onConfirm={date => {
          setShowTimePicker(false);
          setPickupTime(date);
        }}
        onCancel={() => setShowTimePicker(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default Search;

// ── Static layout styles (zero hardcoded colors) ──────────
const styles = StyleSheet.create({
  scroll: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 24,
  },

  // Hero
  hero: {
    marginBottom: 24,
    position: 'relative',
  },
  heroGlow: {
    position: 'absolute',
    top: -20,
    left: '10%',
    width: '80%',
    height: 120,
    borderRadius: 999,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 16,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  heroSub: {
    fontSize: 14,
    marginBottom: 24,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
  },

  // Card
  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    marginBottom: 16,
  },

  // Tabs
  tabsWrapper: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 9,
    gap: 6,
  },
  tabEmoji: {
    fontSize: 14,
  },
  tabText: {
    fontWeight: '600',
    fontSize: 13,
  },

  // Section label
  sectionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionAccent: {
    width: 3,
    height: 14,
    borderRadius: 2,
  },
  sectionLabelText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  // Input rows
  inputBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 14,
    gap: 12,
  },
  inputBlockLast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  inputIconCol: {
    alignItems: 'center',
    width: 28,
  },
  inputIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLine: {
    width: 1,
    height: 16,
    marginTop: 4,
  },
  inputContent: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 3,
  },
  textInput: {
    fontSize: 15,
    fontWeight: '500',
    padding: 0,
    includeFontPadding: false,
  },
  inputValue: {
    fontSize: 15,
    fontWeight: '500',
  },

  // CTA
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 20,
    gap: 8,
  },
  ctaBtnText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  ctaBtnArrow: {
    fontSize: 18,
    fontWeight: '800',
  },

  // Features
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  featureItem: {
    alignItems: 'center',
    gap: 4,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureText: {
    fontSize: 11,
    fontWeight: '500',
  },
});
