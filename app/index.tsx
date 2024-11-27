import { View, StyleSheet, Text, SafeAreaView, StatusBar, Image, Button, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import card from '../assets/images/black-card.jpeg';
import Dropdown from '../components/ui/dropdown';
import styles from './styles';
import { TouchableOpacity, Animated } from 'react-native';

export default function HomeScreen() {
  const [month, setMonth] = useState('MM');
  const [year, setYear] = useState('YY');

  const [cardNumber, setCardNumber] = useState('#### #### #### ####');
  const [cardName, setCardName] = useState('Albin Kjellberg');
  const [cardCVV, setCardCVV] = useState('###');


  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCard = (isCCV: boolean) => {
    if (isCCV !== isFlipped) {
      return;
    }

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

  const changeNumber = (text: string) => {
    let newText = text;

    if (text.length > 19) {
      newText = text.slice(0, 19);
    }

    while (newText.length < 19) {
      newText += '#';
    }

    setCardNumber(newText);
  }

  return (
    <View style={{ width: '100%' }}>
      <StatusBar backgroundColor="#000" />
      <SafeAreaView style={styles.container}>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => flipCard}>
            <Animated.View style={[styles.cardContainer, frontAnimatedStyle, { backfaceVisibility: 'hidden' }]}>
              <View style={[styles.centered, styles.card]}>
                <View style={styles.cardDetailsContainer}>
                  <View>
                    <Text style={[styles.cardDetailsText]}>VISA</Text>
                  </View>
                  <View style={{ marginTop: 20, flexDirection: 'row', gap: 5 }}>
                    <Text style={styles.cardDetailsText}>{cardNumber.slice(0, 4)}</Text>
                    <Text style={styles.cardDetailsText}>{cardNumber.slice(5, 9)}</Text>
                    <Text style={styles.cardDetailsText}>{cardNumber.slice(10, 14)}</Text>
                    <Text style={styles.cardDetailsText}>{cardNumber.slice(15, 19)}</Text>
                  </View>
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
        </View>
        <View style={styles.formContainer}>
          <View style={{ width: '100%' }}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              maxLength={19}
              onChangeText={(text) => changeNumber(text)}
              onPress={() => flipCard(true)}
            />

            <Text style={styles.label}>Card Name</Text>
            <TextInput style={styles.input} placeholder="John Doe" onChangeText={(text) => setCardName(text)} onPress={() => flipCard(true)} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: '15' }}>
              <View style={{ width: '60%' }}>
                <Text style={styles.label}>Expiration Date</Text>
                <TouchableOpacity style={{ flexDirection: 'row', width: '50%', gap: '5' }} onPress={() => flipCard(true)}>
                  {/* Dropdown component needs to be at 50% for some reason? */}
                  <Dropdown valueArray={["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]} placeholder="MM" values={month} setValues={setMonth} />
                  <Dropdown valueArray={["24", "25", "26", "27", "28"]} placeholder="YY" values={year} setValues={setYear} />
                </TouchableOpacity>
              </View>

              <View style={{ width: '30%' }}>
                <Text style={styles.label}>CVV</Text>
                <TextInput style={styles.input} placeholder="123" keyboardType="numeric" secureTextEntry={true} onChangeText={(text) => setCardCVV(text)} onFocus={() => flipCard(false)} />
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