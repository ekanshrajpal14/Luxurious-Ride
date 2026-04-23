import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Platform,
    FlatList,
    Dimensions,
    ActivityIndicator,
    Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainAppStackParamList } from '../../types/navigationTypes';
import { getTheme } from '../../theme/helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ChevronLeft,
    Star,
    Users,
    Zap,
    Wind,
    Briefcase,
    Gauge,
    Fuel,
    CheckCircle2,
    ChevronRight,
    Share2,
    Heart,
    ArrowLeft,
} from 'lucide-react-native';

const { width: SCREEN_W } = Dimensions.get('window');

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
        surfaceElevated: isDark ? '#2A2A2A' : '#EFEFEF',
        border: theme.border,
        text: theme.text,
        textMuted: theme.subText,
        textSub: theme.grey,
        primary: theme.primary,
        gold: GOLD,
        goldLight: GOLD_LIGHT,
        goldDim: GOLD_DIM,
        goldBorder: GOLD_BORDER,
        statusBar: (isDark ? 'light-content' : 'dark-content') as 'light-content' | 'dark-content',
        ctaText: '#FFFFFF',
        shadow: isDark ? '#000000' : '#c0c0c0',
        overlay: isDark ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.35)',
    };
};

// ── Types ─────────────────────────────────────────────────
interface CarSpec {
    icon: React.ReactNode;
    label: string;
    value: string;
}

interface CarFeature {
    title: string;
    description: string;
}

interface CarDetails {
    id: number;
    name: string;
    subtitle: string;
    category: string;
    description: string;
    price: number;
    priceUnit: string;
    rating: number;
    totalBookings: number;
    seating_capacity: number;
    images: string[];
    specs: CarSpec[];
    features: CarFeature[];
    highlights: string[];
}

type Props = NativeStackScreenProps<MainAppStackParamList, 'carDetails'>;

// ─────────────────────────────────────────────────────────
const CarDetails = ({ route, navigation }: Props) => {
    const theme = getTheme();
    const C = getPalette(theme);

    // From route — your API call goes here
    const { car_id, pickupDate, pickupTime, pickupLocation, pickup_datetime, tripType } =
        route.params;

    const [car, setCar] = useState<CarDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState(0);
    const [wishlist, setWishlist] = useState(false);
    const flatRef = useRef<FlatList>(null);

    // ── Fetch car details ─────────────────────────────────
    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                // TODO: replace with your real API call
                // const res = await fetchCarDetails(car_id);
                // setCar(res.data);

                // ── Mock data (mirrors your website structure) ──
                setCar({
                    id: car_id,
                    name: 'Range Rover',
                    subtitle: 'Range Rover Vogue',
                    category: 'Luxury SUV',
                    description:
                        'British royalty in pristine white. The new shape Range Rover Vogue is Mumbai\'s most prestigious white luxury SUV — the single most requested car season after season.',
                    price: 25000,
                    priceUnit: '8 Hrs / 80 Km',
                    rating: 5.0,
                    totalBookings: 43,
                    seating_capacity: 5,
                    images: [
                        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
                        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
                        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
                    ],
                    // specs: [], // filled dynamically below
                    features: [
                        {
                            title: 'New Shape White Exterior',
                            description:
                                '2024 new shape Range Rover Vogue with sharper design lines, a cleaner silhouette, and regal white finish.',
                        },
                        {
                            title: 'Four-Zone Climate Control',
                            description:
                                'Individual temperature zones for driver and all three passenger zones — every person perfectly comfortable.',
                        },
                        {
                            title: 'Windsor Leather Interior',
                            description:
                                'Full Windsor leather with contrast stitching, heated and ventilated seats, and an elevated driving position.',
                        },
                        {
                            title: 'Professional Chauffeur',
                            description:
                                'Range Rover specialist chauffeur in formal uniform — the perfect complement to the vehicle.',
                        },
                        {
                            title: 'All-Inclusive Pricing',
                            description:
                                'Fuel, toll, parking, and driver at ₹25,000 for 8 hours. Completely transparent pricing.',
                        },
                        {
                            title: '20% Pre-Booking Discount',
                            description:
                                'The white Vogue is our fastest-booked vehicle in wedding season — advance booking is essential.',
                        },
                    ],
                    highlights: [
                        '4-Zone AC Climate Control',
                        'Air Suspension (Adaptive Ride)',
                        'Panoramic Sunroof',
                        'Meridian Sound System',
                        'Night Vision Camera',
                        'Massage Seats',
                    ],
                    specs: [
                        { icon: null, label: '0–100 km/h', value: '5.4s' },
                        { icon: null, label: 'Engine', value: '3.0L Petrol' },
                        { icon: null, label: 'Total Power', value: '400 hp' },
                        { icon: null, label: 'Seating', value: '5 Luxury' },
                        { icon: null, label: 'Boot Space', value: '3 Bags' },
                    ],
                });
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [car_id]);

    // ── Loaders ───────────────────────────────────────────
    if (loading || !car) {
        return (
            <View style={[styles.loaderFull, { backgroundColor: C.bg }]}>
                <StatusBar barStyle={C.statusBar} backgroundColor={C.bg} />
                <ActivityIndicator size="large" color={C.gold} />
                <Text style={[styles.loaderText, { color: C.textMuted }]}>Loading car details…</Text>
            </View>
        );
    }

    const specIcons = [
        <Gauge size={18} color={C.gold} />,
        <Fuel size={18} color={C.gold} />,
        <Zap size={18} color={C.gold} />,
        <Users size={18} color={C.gold} />,
        <Briefcase size={18} color={C.gold} />,
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['bottom']}>
            <StatusBar barStyle={C.statusBar} backgroundColor="transparent" translucent />

            <ScrollView showsVerticalScrollIndicator={false} bounces>

                {/* ── Image Carousel ── */}
                <View style={styles.carouselWrapper}>
                    <FlatList
                        ref={flatRef}
                        data={car.images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, i) => String(i)}
                        onMomentumScrollEnd={e => {
                            const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
                            setActiveImg(idx);
                        }}
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: item }}
                                style={styles.carouselImage}
                                resizeMode="cover"
                            />
                        )}
                    />

                    {/* Overlay gradient feel */}
                    <View style={[styles.carouselOverlay, { backgroundColor: C.overlay }]} />

                    {/* Top bar — back + actions */}
                    <View style={[styles.topBar, { paddingTop: Platform.OS === 'ios' ? 54 : 36 }]}>
                        <TouchableOpacity
                            // style={[styles.topBtn, { backgroundColor: C.surface }]}
                            onPress={() => navigation.goBack()}
                        >
                            <ArrowLeft size={22} color={C.text} />
                        </TouchableOpacity>

                        <View style={styles.topBtnGroup}>
                            <TouchableOpacity
                                style={[styles.topBtn, { backgroundColor: C.surface }]}
                                onPress={() => setWishlist(!wishlist)}
                            >
                                <Heart
                                    size={18}
                                    color={wishlist ? '#FF5A5A' : C.textMuted}
                                    fill={wishlist ? '#FF5A5A' : 'transparent'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.topBtn, { backgroundColor: C.surface }]}>
                                <Share2 size={18} color={C.textMuted} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Category badge */}
                    <View style={[styles.categoryBadge, { backgroundColor: C.goldDim, borderColor: C.goldBorder }]}>
                        <Text style={[styles.categoryBadgeText, { color: C.gold }]}>{car.category}</Text>
                    </View>

                    {/* Dot indicators */}
                    <View style={styles.dots}>
                        {car.images.map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.dot,
                                    { backgroundColor: i === activeImg ? C.gold : 'rgba(255,255,255,0.4)' },
                                    i === activeImg && styles.dotActive,
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/* ── Content ── */}
                <View style={[styles.content, { backgroundColor: C.bg }]}>

                    {/* ── Name + Rating ── */}
                    <View style={styles.nameRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.carName, { color: C.text }]}>{car.name}</Text>
                            <Text style={[styles.carSubtitle, { color: C.textMuted }]}>{car.subtitle}</Text>
                        </View>
                        <View style={styles.ratingCol}>
                            <View style={[styles.ratingPill, { backgroundColor: C.goldDim, borderColor: C.goldBorder }]}>
                                <Star size={13} color={C.gold} fill={C.gold} />
                                <Text style={[styles.ratingText, { color: C.gold }]}>{car.rating.toFixed(1)}</Text>
                            </View>
                            <Text style={[styles.bookingsText, { color: C.textMuted }]}>
                                {car.totalBookings}+ bookings
                            </Text>
                        </View>
                    </View>

                    {/* ── Description ── */}
                    <Text style={[styles.description, { color: C.textMuted }]}>{car.description}</Text>

                    {/* ── Price ── */}
                    <View style={[styles.priceBar, { backgroundColor: C.surface, borderColor: C.border }]}>
                        <View>
                            <Text style={[styles.priceLabel, { color: C.textMuted }]}>Starting from</Text>
                            <View style={styles.priceRow}>
                                <Text style={[styles.priceRupee, { color: C.gold }]}>₹</Text>
                                <Text style={[styles.priceAmount, { color: C.gold }]}>
                                    {car.price.toLocaleString('en-IN')}
                                </Text>
                            </View>
                            <Text style={[styles.priceUnit, { color: C.textMuted }]}>{car.priceUnit}</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.bookNowBtn, { backgroundColor: C.primary }]}
                            activeOpacity={0.85}
                            onPress={() =>
                                navigation.navigate('booking', {
                                    car_id: car.id,
                                    pickupDate,
                                    pickupTime,
                                    pickupLocation,
                                    pickup_datetime,
                                    tripType,
                                })
                            }
                        >
                            <Text style={styles.bookNowText}>Book Now</Text>
                            <ChevronRight size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* ── Specs ── */}
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionAccent, { backgroundColor: C.gold }]} />
                        <Text style={[styles.sectionTitle, { color: C.text }]}>Engineering Masterpiece</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.specsScroll}>
                        {car.specs.map((spec, i) => (
                            <View
                                key={i}
                                style={[styles.specCard, { backgroundColor: C.surface, borderColor: C.border }]}
                            >
                                <View style={[styles.specIconWrap, { backgroundColor: C.goldDim }]}>
                                    {specIcons[i] ?? <Zap size={18} color={C.gold} />}
                                </View>
                                <Text style={[styles.specValue, { color: C.text }]}>{spec.value}</Text>
                                <Text style={[styles.specLabel, { color: C.textMuted }]}>{spec.label}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    {/* ── Highlights ── */}
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionAccent, { backgroundColor: C.gold }]} />
                        <Text style={[styles.sectionTitle, { color: C.text }]}>Key Highlights</Text>
                    </View>

                    <View style={[styles.highlightsCard, { backgroundColor: C.surface, borderColor: C.border }]}>
                        {car.highlights.map((h, i) => (
                            <View key={i} style={[styles.highlightRow, i < car.highlights.length - 1 && { borderBottomWidth: 1, borderBottomColor: C.border }]}>
                                <CheckCircle2 size={16} color={C.gold} />
                                <Text style={[styles.highlightText, { color: C.text }]}>{h}</Text>
                            </View>
                        ))}
                    </View>

                    {/* ── Features Grid ── */}
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionAccent, { backgroundColor: C.gold }]} />
                        <Text style={[styles.sectionTitle, { color: C.text }]}>Premium Features</Text>
                    </View>

                    <View style={styles.featuresGrid}>
                        {car.features.map((f, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.featureCard,
                                    { backgroundColor: C.surface, borderColor: C.border },
                                ]}
                            >
                                <View style={[styles.featureDot, { backgroundColor: C.goldDim, borderColor: C.goldBorder }]}>
                                    <Text style={styles.featureDotText}>✦</Text>
                                </View>
                                <Text style={[styles.featureTitle, { color: C.text }]}>{f.title}</Text>
                                <Text style={[styles.featureDesc, { color: C.textMuted }]}>{f.description}</Text>
                                <Text style={[styles.featureTag, { color: C.gold }]}>PREMIUM FEATURE</Text>
                            </View>
                        ))}
                    </View>

                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            {/* ── Sticky CTA ── */}
            <View style={[styles.stickyBar, { backgroundColor: C.bg, borderTopColor: C.border }]}>
                <View>
                    <Text style={[styles.stickyPrice, { color: C.gold }]}>
                        ₹{car.price.toLocaleString('en-IN')}
                    </Text>
                    <Text style={[styles.stickyUnit, { color: C.textMuted }]}>{car.priceUnit}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.stickyBtn, { backgroundColor: C.gold }]}
                    activeOpacity={0.85}
                    onPress={() =>
                        navigation.navigate('booking', {
                            car_id: car.id,
                            pickupDate,
                            pickupTime,
                            pickupLocation,
                            pickup_datetime,
                            tripType,
                        })
                    }
                >
                    <Text style={[styles.stickyBtnText, { color: C.ctaText }]}>Book Now  →</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CarDetails;

// ── Static layout styles ──────────────────────────────────
const styles = StyleSheet.create({
    loaderFull: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    loaderText: {
        fontSize: 14,
        fontWeight: '500',
    },

    // Carousel
    carouselWrapper: {
        width: SCREEN_W,
        height: SCREEN_W * 0.72,
        position: 'relative',
    },
    carouselImage: {
        width: SCREEN_W,
        height: SCREEN_W * 0.72,
    },
    carouselOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    topBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBtnGroup: {
        flexDirection: 'row',
        gap: 8,
    },
    categoryBadge: {
        position: 'absolute',
        bottom: 44,
        left: 16,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    categoryBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
    },
    dots: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    dotActive: {
        width: 20,
        borderRadius: 3,
    },

    // Content
    content: {
        padding: 16,
    },

    // Name + Rating
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 4,
        marginBottom: 10,
    },
    carName: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    carSubtitle: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 2,
        fontStyle: 'italic',
    },
    ratingCol: {
        alignItems: 'flex-end',
        gap: 4,
    },
    ratingPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '700',
    },
    bookingsText: {
        fontSize: 11,
    },

    description: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 16,
    },

    // Price bar
    priceBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        marginBottom: 24,
    },
    priceLabel: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.4,
        marginBottom: 2,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 1,
    },
    priceRupee: {
        fontSize: 18,
        fontWeight: '800',
        marginTop: 2,
    },
    priceAmount: {
        fontSize: 30,
        fontWeight: '800',
        letterSpacing: -1,
    },
    priceUnit: {
        fontSize: 11,
        marginTop: 2,
    },
    bookNowBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 12,
    },
    bookNowText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },

    // Section header
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 14,
    },
    sectionAccent: {
        width: 3,
        height: 18,
        borderRadius: 2,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: -0.2,
    },

    // Specs
    specsScroll: {
        marginBottom: 24,
    },
    specCard: {
        alignItems: 'center',
        borderRadius: 14,
        borderWidth: 1,
        padding: 14,
        marginRight: 10,
        minWidth: 90,
    },
    specIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    specValue: {
        fontSize: 15,
        fontWeight: '800',
        marginBottom: 2,
    },
    specLabel: {
        fontSize: 10,
        fontWeight: '500',
        textAlign: 'center',
    },

    // Highlights
    highlightsCard: {
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 24,
        overflow: 'hidden',
    },
    highlightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 13,
    },
    highlightText: {
        fontSize: 14,
        fontWeight: '500',
    },

    // Features grid
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 16,
    },
    featureCard: {
        width: (SCREEN_W - 42) / 2,
        borderRadius: 14,
        borderWidth: 1,
        padding: 14,
    },
    featureDot: {
        width: 30,
        height: 30,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    featureDotText: {
        color: GOLD,
        fontSize: 12,
    },
    featureTitle: {
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 6,
        lineHeight: 18,
    },
    featureDesc: {
        fontSize: 11,
        lineHeight: 16,
        marginBottom: 10,
        flex: 1,
    },
    featureTag: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.8,
    },

    // Sticky bar
    stickyBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderTopWidth: 1,
        paddingBottom: Platform.OS === 'ios' ? 24 : 14,
    },
    stickyPrice: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    stickyUnit: {
        fontSize: 11,
        marginTop: 1,
    },
    stickyBtn: {
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 14,
    },
    stickyBtnText: {
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.3,
        color: '#0D0D0F',
    },
});