import {
  View,
  Text,
  StyleSheet,
  Linking,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import { getTheme } from '../theme/helper';
import { textSizes } from '../theme/text';
import { Check } from 'lucide-react-native';
import GradientButton from '../components/customs/GradientButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigationTypes';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

// const ScreenData1 = [
//   {
//     title: 'Be yourself',
//     description: 'Make sure your photos, age and bio are true to who you are.',
//   },
//   {
//     title: 'Stay safe',
//     description: "Don't be too quick to give out personal information.",
//     link: {
//       text: 'Date safely',
//       url: 'https://ekanshrajpal.tech',
//     },
//   },
//   {
//     title: 'Play it cool',
//     description:
//       'Respect others and treat them as you would like to be treated.',
//   },
//   {
//     title: 'Be proactive',
//     description: 'Always report bad behaviour.',
//   },
// ];

const OnboardScreen = (props: NativeStackScreenProps<RootStackParamsList>) => {
  const theme = getTheme();
  return (
    <View style={[styles.main, { backgroundColor: theme.background }]}>
      <ImageBackground
        // source={require('../../assets/images/bgimage.jpg')}
        source={{
          uri: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.bgimage}
      >
        <LinearGradient
          colors={[
            'rgb(0, 0, 0)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0)',
          ]}
          style={styles.overlay}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[styles.welcomeView]}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/LR_LOGO.png')}
                style={styles.logo_img}
              />
              <Text style={[styles.heading]}>
                Welcome to{'\n'}Luxurious Ride
              </Text>

              <Text style={[styles.subhead, { color: '#b4b4b4' }]}>
                Start where comfort meets control.
              </Text>
            </View>

            <View style={styles.btnWrapper}>
              <GradientButton
                title="Get Started"
                onPress={() =>
                  props.navigation.replace('auth', {
                    screen: 'register',
                  })
                }
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  bgimage: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
  },
  logo_img: {
    width: 100,
    height: 100,
  },
  welcomeView: {
    marginTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: textSizes.xl4,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  subhead: {
    textAlign: 'center',
    fontSize: textSizes.md,
    marginTop: 10,
  },
  rule: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 20,
    width: '100%',
  },
  title: {
    fontSize: textSizes.lg,
    fontWeight: '600',
  },
  btnWrapper: {
    marginBottom: 30,
  },
});

export default OnboardScreen;
