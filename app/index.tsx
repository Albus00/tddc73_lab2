import { View, StyleSheet, Text, SafeAreaView, StatusBar, Image, Button, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import card from '../assets/images/black-card.jpeg';
import Dropdown from '../components/ui/dropdown';
import styles from './styles';
import { TouchableOpacity, Animated } from 'react-native';

export default function HomeScreen() {
  const [month, setMonth] = useState('MM');
  const [year, setYear] = useState('YY');

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('Albin Kjellberg');
  const [cardCVV, setCardCVV] = useState('###');


  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(flipAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={{ width: '100%' }}>
      <StatusBar backgroundColor="#000" />
      <SafeAreaView style={styles.container}>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={flipCard}>
            <Animated.View style={[styles.cardContainer, frontAnimatedStyle, { backfaceVisibility: 'hidden' }]}>
              <View style={[styles.centered, styles.card]}>
                <View style={styles.cardDetailsContainer}>
                  <View>
                    <Text style={[styles.cardDetailsText]}>VISA</Text>
                  </View>
                  <Text style={[styles.cardDetailsText, { marginTop: 20 }]}>#### #### #### ####</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                      <Text style={styles.label}>Card name</Text>
                      <Text style={styles.cardDetailsText}>{cardName}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                      <Text style={styles.label}>Expires</Text>
                      <Text style={styles.cardDetailsText}>{month}/{year}</Text>
                    </View>
                  </View>
                </View>
                <Image
                  source={card}
                  style={[{ width: '100%', height: '96%', borderRadius: 15 }]}
                />
              </View>
            </Animated.View>
            <Animated.View style={[styles.cardContainer, backAnimatedStyle, { backfaceVisibility: 'hidden', position: 'absolute', top: 0 }]}>
              <View style={[styles.centered, styles.card]}>
                <View style={styles.cardDetailsContainer}>
                  <Text style={[styles.cardDetailsText, { marginTop: 20 }]}>CVV: {cardCVV}</Text>
                </View>
                <Image
                  source={card}
                  style={[{ width: '100%', height: '96%', borderRadius: 15 }]}
                />
              </View>
            </Animated.View>
          </TouchableOpacity>
          {/* <View style={[styles.centered, styles.card]}>
            <View style={styles.cardDetailsContainer}>
              <View>
                <Text style={[styles.cardDetailsText]}>VISA</Text>
              </View>
              <Text style={[styles.cardDetailsText, { marginTop: 20 }]}>#### #### #### ####</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <Text style={styles.label}>Card name</Text>
                  <Text style={styles.cardDetailsText}>{cardName}</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <Text style={styles.label}>Expires</Text>
                  <Text style={styles.cardDetailsText}>{month}/{year}</Text>
                </View>

              </View>
            </View>
            <Image
              source={card}
              style={[{ width: '100%', height: '96%', borderRadius: 15 }]}
            />
          </View> */}
        </View>
        <View style={styles.formContainer}>
          <View style={{ width: '100%' }}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput style={styles.input} placeholder="1234 5678 9012 3456" keyboardType="numeric" onChangeText={(text) => setCardNumber(text)} />

            <Text style={styles.label}>Card Name</Text>
            <TextInput style={styles.input} placeholder="John Doe" onChangeText={(text) => setCardName(text)} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: '15' }}>
              <View style={{ width: '60%' }}>
                <Text style={styles.label}>Expiration Date</Text>
                <View style={{ flexDirection: 'row', width: '50%', gap: '5' }}>
                  {/* Dropdown component needs to be at 50% for some reason? */}
                  <Dropdown valueArray={["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]} placeholder="MM" values={month} setValues={setMonth} />
                  <Dropdown valueArray={["24", "25", "26", "27", "28"]} placeholder="YY" values={year} setValues={setYear} />
                </View>
              </View>

              <View style={{ width: '30%' }}>
                <Text style={styles.label}>CVV</Text>
                <TextInput style={styles.input} placeholder="123" keyboardType="numeric" secureTextEntry={true} onChangeText={(text) => setCardCVV(text)} />
              </View>
            </View>
          </View>

          <View style={{ width: '40%', marginTop: 20 }}>
            <Button title="Submit" color={'#0066ff'} onPress={() => { }} />
          </View>
        </View>

      </SafeAreaView >
    </View >
  );
}