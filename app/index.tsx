import { View, StyleSheet, Text, SafeAreaView, StatusBar, Image, Button, TextInput, TouchableOpacity, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useRef } from 'react';
// @ts-ignore This import is working fine
import card from '../assets/images/black-card.jpeg';
import Dropdown from '../components/ui/dropdown';
import styles from './styles';
import getCardIcon from './cardIcons';

export default function HomeScreen() {
  const [month, setMonth] = useState('MM');
  const [year, setYear] = useState('YY');

  const [cardNumber, setCardNumber] = useState('#### #### #### ####');
  const [cardName, setCardName] = useState('John Doe');
  const [cardCVV, setCardCVV] = useState('###');

  const [numberIsFocused, setNumberIsFocused] = useState(false);
  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [dateIsFocused, setDateIsFocused] = useState(false);
  const [cvvIsFocused, setCVVIsFocused] = useState(false);

  const numberInputRef = useRef<TextInput>(null);
  const nameInputRef = useRef<TextInput>(null);
  const ccvInputRef = useRef<TextInput>(null);

  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const focusField = (fieldName: string) => {
    const fields = ['cardNumber', 'cardName', 'cardCVV', 'cardDate'];

    // Clear focus from all fields
    setNumberIsFocused(false);
    setNameIsFocused(false);
    setDateIsFocused(false);
    setCVVIsFocused(false);

    // If dropdown is focused, manually unfocus all other input fields
    if (fieldName === 'cardDate') {
      nameInputRef.current != null && nameInputRef.current.blur();
    }

    // Focus on the selected field
    switch (fieldName) {
      case 'cardNumber':
        setNumberIsFocused(true);
        break;
      case 'cardName':
        setNameIsFocused(true);
        break;
      case 'cardDate':
        setDateIsFocused(true);
        break;
      case 'cardCVV':
        setCVVIsFocused(true);
        break;
    }

    if (fieldName === 'cardCVV') {
      flipCard(true);
    } else {
      flipCard(false);
    }
  }

  const flipCard = (isCCV: boolean) => {
    // console.log(isCCV, isFlipped);

    if (isCCV === isFlipped) {
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

  const changeCVV = (text: string) => {
    let newText = text;

    if (text.length > 3) {
      newText = text.slice(0, 3);
    }

    while (newText.length < 3) {
      newText += '#';
    }

    setCardCVV(newText);
  }

  return (
    <View style={{ width: '100%' }}>
      <StatusBar backgroundColor="#000" />
      <SafeAreaView style={styles.container}>
        <View style={styles.cardContainer}>
          <Animated.View style={[styles.cardContainer, frontAnimatedStyle, { backfaceVisibility: 'hidden' }]}>
            <View style={[styles.centered, styles.card]}>
              <View style={styles.cardDetailsContainer}>
                <View style={{ height: 40, width: 80, alignSelf: 'flex-end', }}>
                  <Image source={getCardIcon(cardNumber)} style={{ width: '100%', height: '100%', objectFit: 'contain', alignSelf: 'flex-end' }} />
                </View>
                <View
                  style={[
                    { marginTop: 0, flexDirection: 'row', gap: 5, },
                    styles.cardDetailsEntry,
                    numberIsFocused && styles.focused
                  ]}
                >
                  <Text style={[styles.cardDetailsText, styles.cardNumberText]}>{cardNumber.slice(0, 4)}</Text>
                  <Text style={[styles.cardDetailsText, styles.cardNumberText]}>
                    {cardNumber.slice(5, 9).split('').map((char, index) => isNaN(Number(char)) ? char : '*').join('')}
                  </Text>
                  <Text style={[styles.cardDetailsText, styles.cardNumberText]}>
                    {cardNumber.slice(10, 14).split('').map((char, index) => isNaN(Number(char)) ? char : '*').join('')}
                  </Text>
                  <Text style={[styles.cardDetailsText, styles.cardNumberText]}>
                    {isNaN(Number(cardNumber[15])) ? cardNumber[15] : '*'}
                    {cardNumber.slice(16, 19)}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                  <View
                    style={[
                      { flexDirection: 'column', justifyContent: 'flex-start' },
                      styles.cardDetailsEntry,
                      nameIsFocused && styles.focused
                    ]}
                  >
                    <Text style={styles.label}>Card name</Text>
                    <Text style={styles.cardDetailsText}>{cardName}</Text>
                  </View>
                  <View style={[{ flexDirection: 'column', justifyContent: 'flex-start' }, dateIsFocused && styles.focused]}>
                    <Text style={styles.label}>Expires</Text>
                    <Text style={styles.cardDetailsText}>{month}/{year}</Text>
                  </View>
                </View>
              </View>
              <Image
                source={card}
                style={{ width: '100%', height: '96%', borderRadius: 15 }}
              />
            </View>
          </Animated.View>
          <Animated.View
            style={[
              styles.cardContainer,
              backAnimatedStyle,
              { backfaceVisibility: 'hidden', position: 'absolute', top: 0 }
            ]}
          >
            <View style={[styles.centered, styles.card]}>
              <View id='cardCVV' style={styles.cardDetailsContainer}>
                <Text
                  style={[
                    styles.cardDetailsText,
                    styles.cardDetailsEntry,
                    { marginTop: 20 },
                    cvvIsFocused && styles.focused
                  ]}
                >
                  CVV: {cardCVV}
                </Text>
              </View>
              <Image
                source={card}
                style={[{ width: '100%', height: '96%', borderRadius: 15 }]}
              />
            </View>
          </Animated.View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.formContainer}
        >
          <View style={{ width: '100%' }}>
            <Text style={styles.label}>Card Name</Text>
            <TextInput
              ref={nameInputRef}
              style={styles.input}
              placeholder="John Doe"
              onChangeText={(text) => setCardName(text)}
              onFocus={() => focusField('cardName')}
            />

            <Text style={styles.label}>Card Number</Text>
            <TextInput
              ref={numberInputRef}
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              maxLength={19}
              onChangeText={(text) => changeNumber(text)}
              onFocus={() => focusField('cardNumber')}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: '15' }}>
              <View style={{ width: '60%' }}>
                <Text style={styles.label}>Expiration Date</Text>
                <TouchableOpacity style={{ flexDirection: 'row', width: '50%', gap: '5' }} activeOpacity={1.0} onPress={() => focusField('cardDate')}>
                  {/* Dropdown component needs to be at 50% for some reason? */}
                  <Dropdown valueArray={["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]} placeholder="MM" values={month} setValues={setMonth} onFocus={() => focusField('cardDate')} />
                  <Dropdown valueArray={["24", "25", "26", "27", "28"]} placeholder="YY" values={year} setValues={setYear} onFocus={() => focusField('cardDate')} />
                </TouchableOpacity>
              </View>

              <View style={{ width: '30%' }}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  ref={ccvInputRef}
                  style={styles.input}
                  placeholder="123"
                  keyboardType="numeric"
                  secureTextEntry={true}
                  onChangeText={(text) => changeCVV(text)}
                  onFocus={() => focusField('cardCVV')}
                  maxLength={3}
                />
              </View>
            </View>
          </View>

          <View style={{ width: '40%', marginTop: 20, borderRadius: 10, backgroundColor: 'black' }}>
            <Button title="Submit" color={'transparent'} onPress={() => { }} />
          </View>
        </KeyboardAvoidingView>

      </SafeAreaView >
    </View >
  );
}