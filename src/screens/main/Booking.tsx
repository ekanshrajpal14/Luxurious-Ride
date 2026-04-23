import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainAppStackParamList } from '../../types/navigationTypes';
import Input from '../../components/customs/Input';
import RazorpayCheckout from 'react-native-razorpay';
import CheckBox from '@react-native-community/checkbox';
import { getTheme } from '../../theme/helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MoveLeft, MoveLeftIcon } from 'lucide-react-native';

type Props = NativeStackScreenProps<MainAppStackParamList, 'booking'>;

// ── Accent (same on both themes) ──────────────────────────
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E4C97E';
const GOLD_DIM = 'rgba(201,168,76,0.15)';
const GOLD_BORDER = 'rgba(201,168,76,0.35)';

// ── Build live palette from active theme ──────────────────
const getPalette = (theme: ReturnType<typeof getTheme>) => {
  const isDark = theme.mode === 'dark';
  return {
    bg: theme.background,
    surface: theme.card,
    surfaceElevated: isDark ? '#2A2A2A' : '#EFEFEF',
    border: theme.border,
    text: theme.text,
    textMuted: theme.subText,
    textSub: theme.grey,
    gold: GOLD,
    goldLight: GOLD_LIGHT,
    goldDim: GOLD_DIM,
    goldBorder: GOLD_BORDER,
    statusBar: (isDark ? 'light-content' : 'dark-content') as
      | 'light-content'
      | 'dark-content',
    ctaText: '#0D0D0F',
  };
};

// ─────────────────────────────────────────────────────────
// Sub-components accept C so they stay theme-aware
// ─────────────────────────────────────────────────────────

const Divider = ({ C }: { C: ReturnType<typeof getPalette> }) => (
  <View style={{ height: 1, backgroundColor: C.border, marginVertical: 10 }} />
);

const SectionLabel = ({
  label,
  C,
}: {
  label: string;
  C: ReturnType<typeof getPalette>;
}) => (
  <View style={styles.sectionLabelRow}>
    <View style={[styles.sectionLabelAccent, { backgroundColor: C.gold }]} />
    <Text style={[styles.sectionLabelText, { color: C.text }]}>{label}</Text>
  </View>
);

const DetailRow = ({
  label,
  value,
  highlight,
  C,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  C: ReturnType<typeof getPalette>;
}) => (
  <View style={styles.detailRow}>
    <Text style={[styles.detailLabel, { color: C.textMuted }]}>{label}</Text>
    <Text
      style={[
        styles.detailValue,
        { color: highlight ? C.goldLight : C.textSub },
        highlight && { fontWeight: '700' },
      ]}
    >
      {value}
    </Text>
  </View>
);

const StyledInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  icon,
  C,
}: {
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  keyboardType?: any;
  icon: string;
  C: ReturnType<typeof getPalette>;
}) => (
  <View
    style={[
      styles.inputWrapper,
      { backgroundColor: C.surfaceElevated, borderColor: C.border },
    ]}
  >
    <Text style={styles.inputIcon}>{icon}</Text>
    <Input
      placeholder={placeholder}
      placeholderTextColor={C.textMuted}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      style={[styles.inputField, { color: C.text }]}
    />
  </View>
);

// ── Main Component ────────────────────────────────────────
const Booking = ({ route, navigation }: Props) => {
  const theme = getTheme();
  const C = getPalette(theme);

  const {
    car_id,
    pickupDate,
    pickupLocation,
    pickupTime,
    pickup_datetime,
    tripType,
  } = route.params;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [pickUp, setPickUp] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  const handlePay = () => {
    const options: any = {
      description: 'Car Rental Booking',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_SEog53sowqO5ch',
      amount: '50000',
      name: 'Sunvenus Rental Cars',
      order_id: 'order_SEogv0LAK2Jy1Y',
      prefill: { email, contact: number, name },
      theme: { color: C.gold },
    };
    RazorpayCheckout.open(options)
      .then((data: any) =>
        Alert.alert('Payment Successful', data.razorpay_payment_id),
      )
      .catch((error: any) =>
        Alert.alert('Payment Failed', `${error.code} | ${error.description}`),
      );
  };

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: theme.background }]}>

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: C.bg }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
      >
        <StatusBar barStyle={C.statusBar} backgroundColor={C.bg} />

        {/* ── Header ── */}
        <View
          style={[
            styles.header,
            { backgroundColor: C.bg, borderBottomColor: C.border },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}

          >
            <ArrowLeft size={22} color={C.text} />
          </TouchableOpacity>

          <View>
            <Text style={[styles.headerTitle, { color: C.text }]}>
              Complete Booking
            </Text>
            <Text style={[styles.headerSub, { color: C.textMuted }]}>
              Review & pay securely
            </Text>
          </View>

          <View
            style={[
              styles.headerBadge,
              { backgroundColor: C.goldDim, borderColor: C.gold },
            ]}
          >
            <Text style={styles.headerBadgeText}>🔒</Text>
          </View>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Trip Summary Card ── */}
          <View
            style={[
              styles.card,
              { backgroundColor: C.surface, borderColor: C.border },
            ]}
          >
            <SectionLabel label="Trip Summary" C={C} />
            <Divider C={C} />

            <DetailRow label="Pickup City" value={pickupLocation ?? '—'} C={C} />
            <DetailRow label="Trip Type" value={tripType ?? 'Local'} C={C} />
            <DetailRow
              label="Pickup Date & Time"
              value={`${pickupDate ?? '—'}  |  ${pickupTime ?? '—'}`}
              C={C}
            />
            <DetailRow label="Car & Details" value="Sedan · AC · 4 Seats" C={C} />

            <Divider C={C} />

            {/* Total Fare */}
            <View style={styles.fareRow}>
              <View>
                <Text style={[styles.fareLabel, { color: C.text }]}>
                  Total Fare
                </Text>
                <Text style={[styles.fareSub, { color: C.textMuted }]}>
                  Inclusive of all taxes
                </Text>
              </View>
              <View
                style={[
                  styles.farePill,
                  { backgroundColor: C.goldDim, borderColor: C.gold },
                ]}
              >
                <Text style={[styles.fareAmount, { color: C.gold }]}>₹1,234</Text>
              </View>
            </View>
          </View>

          {/* ── Passenger Details Card ── */}
          <View
            style={[
              styles.card,
              { backgroundColor: C.surface, borderColor: C.border },
            ]}
          >
            {/* <SectionLabel label="Passenger Details" C={C} />
            <Divider C={C} />

            <StyledInput
              icon="👤"
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              C={C}
            />
            <StyledInput
              icon="✉️"
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              C={C}
            />
            <StyledInput
              icon="📞"
              placeholder="Phone Number"
              value={number}
              onChangeText={setNumber}
              keyboardType="phone-pad"
              C={C}
            />
            <StyledInput
              icon="📍"
              placeholder="Full Pickup Address"
              value={pickUp}
              onChangeText={setPickUp}
              C={C}
            /> */}

            {/* Terms checkbox */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setCheckbox(!checkbox)}
              activeOpacity={0.7}
            >
              <CheckBox
                value={checkbox}
                tintColors={{ true: C.gold, false: C.border }}
                onValueChange={() => setCheckbox(!checkbox)}
              />
              <Text style={[styles.checkboxLabel, { color: C.textMuted }]}>
                I agree to the{' '}
                <Text style={[styles.checkboxLink, { color: C.gold }]}>
                  Terms & Conditions
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* ── Pay Now Button ── */}
          <TouchableOpacity
            style={[
              styles.payBtn,
              { backgroundColor: C.gold },
              !checkbox && styles.payBtnDisabled,
            ]}
            onPress={checkbox ? handlePay : undefined}
            activeOpacity={0.85}
          >
            <Text style={[styles.payBtnText, { color: C.ctaText }]}>
              Proceed to Payment
            </Text>
            <Text style={[styles.payBtnIcon, { color: C.ctaText }]}>→</Text>
          </TouchableOpacity>

          {/* ── Pay Later ── */}
          <TouchableOpacity
            style={[styles.payLaterBtn, { borderColor: C.border }]}
          >
            <Text style={[styles.payLaterText, { color: C.textSub }]}>
              Pay Later at Pickup
            </Text>
          </TouchableOpacity>

          {/* ── Trust strip ── */}
          <View style={styles.trustStrip}>
            {[
              '🔒 Secure Payment',
              '✅ Instant Confirmation',
              '🚗 Free Cancellation',
            ].map(item => (
              <Text key={item} style={[styles.trustItem, { color: C.textMuted }]}>
                {item}
              </Text>
            ))}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
};

export default Booking;

// ── Static layout styles (zero hardcoded colors) ──────────
const styles = StyleSheet.create({
  scroll: {
    padding: 16,
    paddingTop: 8,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 54 : 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 20,
    lineHeight: 22,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  headerSub: {
    fontSize: 12,
    marginTop: 1,
    textAlign: 'center',
  },
  headerBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  headerBadgeText: {
    fontSize: 16,
  },

  // Card
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
  },

  // Section label
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sectionLabelAccent: {
    width: 3,
    height: 16,
    borderRadius: 2,
  },
  sectionLabelText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  // Detail rows
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
  },
  detailLabel: {
    fontSize: 13,
    flex: 1,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
  },

  // Fare row
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  fareLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  fareSub: {
    fontSize: 11,
    marginTop: 2,
  },
  farePill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
  },
  fareAmount: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Input
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 13,
    backgroundColor: 'transparent',
  },

  // Checkbox
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  checkboxLabel: {
    fontSize: 13,
    flex: 1,
  },
  checkboxLink: {
    fontWeight: '600',
  },

  // Pay button
  payBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    paddingVertical: 16,
    gap: 8,
    marginBottom: 10,
  },
  payBtnDisabled: {
    opacity: 0.45,
  },
  payBtnText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  payBtnIcon: {
    fontSize: 18,
    fontWeight: '800',
  },

  // Pay later
  payLaterBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
    borderRadius: 14,
    borderWidth: 1,
  },
  payLaterText: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Trust strip
  trustStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
    paddingHorizontal: 4,
  },
  trustItem: {
    fontSize: 11,
    fontWeight: '500',
  },
});
