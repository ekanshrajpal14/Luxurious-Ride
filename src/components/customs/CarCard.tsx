import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { getTheme } from '../../theme/helper';
import GradientButton from './GradientButton';

const CarCard = () => {
  const car = {
    id: 2,
    name: 'Tesla Model S',
    image: require('../../../assets/cars/car1.png'),
    price: '$100/day',
    seats: '5 Seats',
    location: 'Chicago, USA',
  };
  const theme = getTheme();
  return (
    <View key={car.id} style={[styles.card, { backgroundColor: theme.card }]}>
      <Image source={car.image} style={styles.carImage} />

      <Text style={[styles.carName, { color: theme.text }]}>{car.name}</Text>

      <Text style={[styles.subText, { color: theme.subText }]}>⭐ 5.0 </Text>
      <Text style={[styles.subText, { color: theme.subText }]}>
        {car.location}
      </Text>

      <View style={styles.cardFooter}>
        {/* <Text style={[styles.subText, { color: theme.subText }]}>
          {car.seats}
        </Text> */}

        <Text style={[styles.price, { color: theme.primary }]}>
          {car.price}
        </Text>
        <GradientButton title='Book Now' style={{paddingHorizontal:10,height:25}} textStyle={{fontSize:11}} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    width: 155,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    // borderWidth:1,
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
    alignItems:"center",
    marginTop: 10,
  },

  price: {
    fontWeight: '700',
    fontSize:13
  },
});
export default CarCard;
