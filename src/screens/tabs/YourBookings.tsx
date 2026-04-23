import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    Dimensions,
    Modal,
    Pressable,
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { getTheme } from '../../theme/helper';
import {
    Calendar,
    MapPin,
    Clock,
    ChevronRight,
    Car,
    CircleDot,
    MoreVertical,
    X,
    CreditCard,
    Phone,
    Shield,
    Hash,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

type BookingStatus =
    | 'confirmed'
    | 'rejected'
    | 'pending'
    | 'onTheWay'
    | 'completed'
    | 'cancelled';

interface Booking {
    id: string;
    carName: string;
    color: string;
    status: BookingStatus;
    price: string;
    package: string;
    startDate: string;
    endDate: string;
    location: string;
    bookingId: string;
}

const SAMPLE_BOOKINGS: Booking[] = [
    {
        id: '1',
        carName: 'Mercedes Benz S-Class Maybach',
        color: 'Obsidian Black',
        status: 'confirmed',
        price: '₹5,000',
        package: '8HR / 80KM',
        startDate: new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }),
        endDate: new Date(Date.now() + 86400000).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }),
        location: 'New Delhi, Delhi',
        bookingId: 'LR-2026-0042',
    },
    {
        id: '2',
        carName: 'BMW 7 Series',
        color: 'Alpine White',
        status: 'completed',
        price: '₹4,200',
        package: '4HR / 40KM',
        startDate: '15 Apr 2026',
        endDate: '15 Apr 2026',
        location: 'Mumbai, Maharashtra',
        bookingId: 'LR-2026-0038',
    },
    {
        id: '3',
        carName: 'Audi A8 L',
        color: 'Mythos Black',
        status: 'pending',
        price: '₹3,800',
        package: '8HR / 80KM',
        startDate: '25 Apr 2026',
        endDate: '26 Apr 2026',
        location: 'Bangalore, Karnataka',
        bookingId: 'LR-2026-0051',
    },
];

const TABS = ['All', 'Active', 'Completed', 'Cancelled'];

const YourBookings = () => {
    const theme = getTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;
    const modalSlide = useRef(new Animated.Value(Dimensions.get('window').height)).current;
    const modalOverlay = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const openModal = (booking: Booking) => {
        setSelectedBooking(booking);
        setModalVisible(true);
        Animated.parallel([
            Animated.timing(modalOverlay, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(modalSlide, {
                toValue: 0,
                tension: 65,
                friction: 11,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const closeModal = () => {
        Animated.parallel([
            Animated.timing(modalOverlay, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(modalSlide, {
                toValue: Dimensions.get('window').height,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setModalVisible(false);
            setSelectedBooking(null);
        });
    };

    const isDark = theme.mode === 'dark';

    const statusConfig: Record<
        BookingStatus,
        { color: string; bg: string; label: string; icon: string }
    > = {
        confirmed: {
            color: '#10B981',
            bg: isDark ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.08)',
            label: 'Confirmed',
            icon: '✓',
        },
        rejected: {
            color: '#EF4444',
            bg: isDark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.08)',
            label: 'Rejected',
            icon: '✕',
        },
        pending: {
            color: '#F59E0B',
            bg: isDark ? 'rgba(245,158,11,0.12)' : 'rgba(245,158,11,0.08)',
            label: 'Pending',
            icon: '⏳',
        },
        onTheWay: {
            color: '#3B82F6',
            bg: isDark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.08)',
            label: 'On the Way',
            icon: '🚗',
        },
        completed: {
            color: '#10B981',
            bg: isDark ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.08)',
            label: 'Completed',
            icon: '✓',
        },
        cancelled: {
            color: '#EF4444',
            bg: isDark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.08)',
            label: 'Cancelled',
            icon: '✕',
        },
    };

    const filteredBookings = SAMPLE_BOOKINGS.filter(booking => {
        if (activeTab === 0) return true;
        if (activeTab === 1)
            return ['confirmed', 'pending', 'onTheWay'].includes(booking.status);
        if (activeTab === 2) return booking.status === 'completed';
        if (activeTab === 3)
            return ['cancelled', 'rejected'].includes(booking.status);
        return true;
    });

    const renderBookingCard = (booking: Booking, index: number) => {
        const status = statusConfig[booking.status];
        const cardDelay = index * 100;

        return (
            <Animated.View
                key={booking.id}
                style={[
                    styles.card,
                    {
                        backgroundColor: theme.card,
                        borderColor: isDark ? theme.border : 'transparent',
                        borderWidth: isDark ? 1 : 0,
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                    !isDark && styles.cardShadow,
                ]}>
                {/* Card Header */}
                <View style={styles.cardHeader}>
                    <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                        <View
                            style={[styles.statusDot, { backgroundColor: status.color }]}
                        />
                        <Text style={[styles.statusText, { color: status.color }]}>
                            {status.label}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.moreBtn}>
                        <MoreVertical size={18} color={theme.grey} />
                    </TouchableOpacity>
                </View>

                {/* Car Info */}
                <View style={styles.carInfoRow}>
                    <View style={styles.carDetails}>
                        <Text style={[styles.carName, { color: theme.text }]}>
                            {booking.carName}
                        </Text>
                        <View style={styles.colorRow}>
                            <Car size={13} color={theme.grey} />
                            <Text style={[styles.colorText, { color: theme.subText }]}>
                                {booking.color}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.priceBlock}>
                        <Text style={[styles.price, { color: theme.gold }]}>
                            {booking.price}
                        </Text>
                        <View
                            style={[
                                styles.packageBadge,
                                { backgroundColor: theme.goldDim },
                            ]}>
                            <Text style={[styles.packageText, { color: theme.gold }]}>
                                {booking.package}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Divider */}
                <View
                    style={[
                        styles.divider,
                        {
                            borderColor: isDark
                                ? 'rgba(255,255,255,0.06)'
                                : 'rgba(0,0,0,0.06)',
                        },
                    ]}
                />

                {/* Route Timeline */}
                <View style={styles.routeSection}>
                    {/* Date Row */}
                    <View style={styles.infoRow}>
                        <View
                            style={[
                                styles.iconCircle,
                                { backgroundColor: isDark ? '#1a2332' : '#EEF4FF' },
                            ]}>
                            <Calendar size={14} color="#3B82F6" />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={[styles.infoLabel, { color: theme.grey }]}>
                                Schedule
                            </Text>
                            <Text style={[styles.infoValue, { color: theme.text }]}>
                                {booking.startDate}
                                <Text style={{ color: theme.grey }}> → </Text>
                                {booking.endDate}
                            </Text>
                        </View>
                    </View>

                    {/* Connector Line */}
                    <View style={styles.connectorContainer}>
                        <View
                            style={[
                                styles.connectorLine,
                                {
                                    borderColor: isDark
                                        ? 'rgba(255,255,255,0.08)'
                                        : 'rgba(0,0,0,0.08)',
                                },
                            ]}
                        />
                    </View>

                    {/* Location Row */}
                    <View style={styles.infoRow}>
                        <View
                            style={[
                                styles.iconCircle,
                                { backgroundColor: isDark ? '#1f2a1f' : '#ECFDF5' },
                            ]}>
                            <MapPin size={14} color="#10B981" />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={[styles.infoLabel, { color: theme.grey }]}>
                                Pickup Location
                            </Text>
                            <Text style={[styles.infoValue, { color: theme.text }]}>
                                {booking.location}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Card Footer */}
                <View
                    style={[
                        styles.cardFooter,
                        {
                            backgroundColor: isDark
                                ? 'rgba(255,255,255,0.03)'
                                : 'rgba(0,0,0,0.02)',
                            borderTopColor: isDark
                                ? 'rgba(255,255,255,0.06)'
                                : 'rgba(0,0,0,0.04)',
                        },
                    ]}>
                    <View style={styles.bookingIdRow}>
                        <Clock size={12} color={theme.grey} />
                        <Text style={[styles.bookingIdText, { color: theme.grey }]}>
                            {booking.bookingId}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => openModal(booking)}
                        style={[styles.detailsBtn, { backgroundColor: theme.goldDim }]}>
                        <Text style={[styles.detailsBtnText, { color: theme.gold }]}>
                            Details
                        </Text>
                        <ChevronRight size={14} color={theme.gold} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    };

    return (
        <View style={[styles.root, { backgroundColor: theme.background }]}>
            {/* Header */}
            <Animated.View
                style={[styles.header, { opacity: fadeAnim }]}>
                <Text style={[styles.subtitle, { color: theme.gold }]}>
                    ACTIVE SCHEDULE
                </Text>
                <Text style={[styles.title, { color: theme.text }]}>Your Bookings</Text>
            </Animated.View>

            {/* Filter Tabs */}
            <View style={styles.tabContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabScroll}>
                    {TABS.map((tab, index) => {
                        const isActive = activeTab === index;
                        return (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(index)}
                                style={[
                                    styles.tab,
                                    {
                                        backgroundColor: isActive
                                            ? theme.gold
                                            : isDark
                                                ? 'rgba(255,255,255,0.05)'
                                                : 'rgba(0,0,0,0.04)',
                                        borderColor: isActive
                                            ? theme.gold
                                            : isDark
                                                ? 'rgba(255,255,255,0.08)'
                                                : 'rgba(0,0,0,0.06)',
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.tabText,
                                        {
                                            color: isActive
                                                ? theme.ctaText
                                                : theme.grey,
                                            fontWeight: isActive ? '700' : '500',
                                        },
                                    ]}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Bookings List */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}>
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking, index) =>
                        renderBookingCard(booking, index),
                    )
                ) : (
                    <View style={styles.emptyState}>
                        <View
                            style={[
                                styles.emptyIcon,
                                { backgroundColor: isDark ? '#1E1E1E' : '#F5F5F5' },
                            ]}>
                            <Car size={40} color={theme.grey} />
                        </View>
                        <Text style={[styles.emptyTitle, { color: theme.text }]}>
                            No bookings found
                        </Text>
                        <Text style={[styles.emptySubtitle, { color: theme.grey }]}>
                            You don't have any bookings in this category yet.
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Booking Details Modal */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="none"
                onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                    <Animated.View
                        style={[styles.modalOverlay, { opacity: modalOverlay }]}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal} />
                    </Animated.View>

                    <Animated.View
                        style={[
                            styles.modalSheet,
                            {
                                backgroundColor: theme.background,
                                transform: [{ translateY: modalSlide }],
                            },
                        ]}>
                        {/* Handle Bar */}
                        <View style={styles.modalHandle}>
                            <View style={[styles.handleBar, { backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)' }]} />
                        </View>

                        {/* Modal Header */}
                        <View style={styles.modalHeader}>
                            <View>
                                <Text style={[styles.modalSubtitle, { color: theme.gold }]}>BOOKING DETAILS</Text>
                                <Text style={[styles.modalTitle, { color: theme.text }]}>
                                    {selectedBooking?.carName}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={closeModal} style={[styles.closeBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}>
                                <X size={18} color={theme.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                            {selectedBooking && (() => {
                                const status = statusConfig[selectedBooking.status];
                                return (
                                    <>
                                        {/* Status + Price Banner */}
                                        <View style={[styles.modalBanner, { backgroundColor: theme.card, borderColor: isDark ? theme.border : 'transparent', borderWidth: isDark ? 1 : 0 }]}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                                                    <View style={[styles.statusDot, { backgroundColor: status.color }]} />
                                                    <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                                                </View>
                                                <View style={{ alignItems: 'flex-end' }}>
                                                    <Text style={[styles.modalPrice, { color: theme.gold }]}>{selectedBooking.price}</Text>
                                                    <View style={[styles.packageBadge, { backgroundColor: theme.goldDim }]}>
                                                        <Text style={[styles.packageText, { color: theme.gold }]}>{selectedBooking.package}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Info Sections */}
                                        <View style={styles.modalSections}>
                                            {/* Booking ID */}
                                            <View style={styles.modalInfoRow}>
                                                <View style={[styles.modalIconCircle, { backgroundColor: isDark ? '#2a2020' : '#FFF5F5' }]}>
                                                    <Hash size={15} color={theme.gold} />
                                                </View>
                                                <View style={styles.modalInfoContent}>
                                                    <Text style={[styles.modalInfoLabel, { color: theme.grey }]}>BOOKING ID</Text>
                                                    <Text style={[styles.modalInfoValue, { color: theme.text }]}>{selectedBooking.bookingId}</Text>
                                                </View>
                                            </View>

                                            <View style={[styles.modalDivider, { borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }]} />

                                            {/* Car Color */}
                                            <View style={styles.modalInfoRow}>
                                                <View style={[styles.modalIconCircle, { backgroundColor: isDark ? '#1c1c2e' : '#F0F0FF' }]}>
                                                    <Car size={15} color="#6366F1" />
                                                </View>
                                                <View style={styles.modalInfoContent}>
                                                    <Text style={[styles.modalInfoLabel, { color: theme.grey }]}>CAR COLOR</Text>
                                                    <Text style={[styles.modalInfoValue, { color: theme.text }]}>{selectedBooking.color}</Text>
                                                </View>
                                            </View>

                                            <View style={[styles.modalDivider, { borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }]} />

                                            {/* Schedule */}
                                            <View style={styles.modalInfoRow}>
                                                <View style={[styles.modalIconCircle, { backgroundColor: isDark ? '#1a2332' : '#EEF4FF' }]}>
                                                    <Calendar size={15} color="#3B82F6" />
                                                </View>
                                                <View style={styles.modalInfoContent}>
                                                    <Text style={[styles.modalInfoLabel, { color: theme.grey }]}>SCHEDULE</Text>
                                                    <Text style={[styles.modalInfoValue, { color: theme.text }]}>
                                                        {selectedBooking.startDate}  →  {selectedBooking.endDate}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={[styles.modalDivider, { borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }]} />

                                            {/* Pickup Location */}
                                            <View style={styles.modalInfoRow}>
                                                <View style={[styles.modalIconCircle, { backgroundColor: isDark ? '#1f2a1f' : '#ECFDF5' }]}>
                                                    <MapPin size={15} color="#10B981" />
                                                </View>
                                                <View style={styles.modalInfoContent}>
                                                    <Text style={[styles.modalInfoLabel, { color: theme.grey }]}>PICKUP LOCATION</Text>
                                                    <Text style={[styles.modalInfoValue, { color: theme.text }]}>{selectedBooking.location}</Text>
                                                </View>
                                            </View>

                                            <View style={[styles.modalDivider, { borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }]} />

                                            {/* Payment */}
                                            <View style={styles.modalInfoRow}>
                                                <View style={[styles.modalIconCircle, { backgroundColor: isDark ? '#2a2520' : '#FFFBEB' }]}>
                                                    <CreditCard size={15} color="#F59E0B" />
                                                </View>
                                                <View style={styles.modalInfoContent}>
                                                    <Text style={[styles.modalInfoLabel, { color: theme.grey }]}>PAYMENT STATUS</Text>
                                                    <Text style={[styles.modalInfoValue, { color: theme.text }]}>Paid via UPI</Text>
                                                </View>
                                            </View>

                                            <View style={[styles.modalDivider, { borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }]} />

                                            {/* Support */}
                                            <View style={styles.modalInfoRow}>
                                                <View style={[styles.modalIconCircle, { backgroundColor: isDark ? '#1c2a2a' : '#F0FDFA' }]}>
                                                    <Phone size={15} color="#14B8A6" />
                                                </View>
                                                <View style={styles.modalInfoContent}>
                                                    <Text style={[styles.modalInfoLabel, { color: theme.grey }]}>SUPPORT</Text>
                                                    <Text style={[styles.modalInfoValue, { color: theme.text }]}>+91 98765 43210</Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Action Buttons */}
                                        <View style={styles.modalActions}>
                                            <TouchableOpacity style={[styles.modalSecondaryBtn, { borderColor: isDark ? theme.border : 'rgba(0,0,0,0.1)' }]}>
                                                <Phone size={16} color={theme.text} />
                                                <Text style={[styles.modalSecondaryText, { color: theme.text }]}>Contact Support</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.modalPrimaryBtn, { backgroundColor: theme.gold }]}>
                                                <Shield size={16} color={theme.ctaText} />
                                                <Text style={[styles.modalPrimaryText, { color: theme.ctaText }]}>Download Invoice</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                );
                            })()}
                        </ScrollView>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },

    // ── Header ──────────────────────────────
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 4,
    },
    subtitle: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 2.5,
        marginBottom: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        letterSpacing: -0.3,
    },

    // ── Tabs ────────────────────────────────
    tabContainer: {
        paddingTop: 16,
        paddingBottom: 8,
    },
    tabScroll: {
        paddingHorizontal: 20,
        gap: 8,
    },
    tab: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    tabText: {
        fontSize: 13,
        letterSpacing: 0.2,
    },

    // ── List ────────────────────────────────
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
        gap: 16,
    },

    // ── Card ────────────────────────────────
    card: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingTop: 16,
        paddingBottom: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 6,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    moreBtn: {
        padding: 4,
    },

    // ── Car Info ────────────────────────────
    carInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 14,
    },
    carDetails: {
        flex: 1,
        marginRight: 12,
        gap: 4,
    },
    carName: {
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: -0.2,
    },
    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 2,
    },
    colorText: {
        fontSize: 12,
        fontWeight: '500',
    },
    priceBlock: {
        alignItems: 'flex-end',
        gap: 6,
    },
    price: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    packageBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    packageText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    // ── Divider ─────────────────────────────
    divider: {
        borderTopWidth: 1,
        marginHorizontal: 18,
    },

    // ── Route Section ───────────────────────
    routeSection: {
        paddingHorizontal: 18,
        paddingVertical: 14,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContent: {
        flex: 1,
        gap: 2,
    },
    infoLabel: {
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
    },
    infoValue: {
        fontSize: 13,
        fontWeight: '600',
    },
    connectorContainer: {
        paddingLeft: 16,
        height: 16,
        justifyContent: 'center',
    },
    connectorLine: {
        borderLeftWidth: 1.5,
        borderStyle: 'dashed',
        height: '100%',
    },

    // ── Card Footer ─────────────────────────
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderTopWidth: 1,
    },
    bookingIdRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    bookingIdText: {
        fontSize: 11,
        fontWeight: '500',
        letterSpacing: 0.3,
    },
    detailsBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 14,
        gap: 2,
    },
    detailsBtnText: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.2,
    },

    // ── Empty State ─────────────────────────
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        gap: 12,
    },
    emptyIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    emptySubtitle: {
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 40,
    },

    // ── Modal ───────────────────────────────
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.55)',
    },
    modalSheet: {
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        maxHeight: '85%',
        paddingBottom: 20,
    },
    modalHandle: {
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 4,
    },
    handleBar: {
        width: 40,
        height: 4,
        borderRadius: 2,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 16,
    },
    modalSubtitle: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 2,
        marginBottom: 4,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: -0.3,
        maxWidth: width - 100,
    },
    closeBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBanner: {
        marginHorizontal: 24,
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
    },
    modalPrice: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.3,
        marginBottom: 4,
    },
    modalSections: {
        paddingHorizontal: 24,
    },
    modalInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 14,
    },
    modalIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalInfoContent: {
        flex: 1,
        gap: 3,
    },
    modalInfoLabel: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
    },
    modalInfoValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    modalDivider: {
        borderTopWidth: 1,
        marginLeft: 54,
    },
    modalActions: {
        paddingHorizontal: 24,
        paddingTop: 24,
        gap: 12,
    },
    modalSecondaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 1,
        gap: 8,
    },
    modalSecondaryText: {
        fontSize: 14,
        fontWeight: '600',
    },
    modalPrimaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 14,
        gap: 8,
    },
    modalPrimaryText: {
        fontSize: 14,
        fontWeight: '700',
    },
});

export default YourBookings;