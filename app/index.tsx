import { View, StyleSheet, Text, SafeAreaView, StatusBar, Image, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import card from '../assets/images/black-card.jpeg';
import Dropdown from '../components/ui/dropdown';
import styles from './styles';

export default function HomeScreen() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  return (
    <View style={{ width: '100%' }}>
      <StatusBar backgroundColor="#000" />
      <SafeAreaView style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={[styles.centered, styles.card]}>
            <Image
              source={card}
              style={[{ width: '100%', height: '96%', borderRadius: 15 }]}
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={{ width: '100%' }}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput style={styles.input} placeholder="1234 5678 9012 3456" keyboardType="numeric" />

            <Text style={styles.label}>Card Name</Text>
            <TextInput style={styles.input} placeholder="John Doe" />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '60%' }}>
                <Text style={styles.label}>Expiration Date</Text>
                <View style={{ flexDirection: 'row', width: '50%' }}>
                  {/* Dropdown component needs to be at 50% for some reason? */}
                  <Dropdown valueArray={["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]} placeholder="MM" values={month} setValues={setMonth} />
                  <Dropdown valueArray={["24", "25", "26", "27", "28"]} placeholder="YY" values={year} setValues={setYear} />
                </View>
              </View>

              <View style={{ width: '40%' }}>
                <Text style={styles.label}>CVV</Text>
                <TextInput style={styles.input} placeholder="123" keyboardType="numeric" secureTextEntry={true} />
              </View>
            </View>
          </View>

          <Button title="Submit" onPress={() => { }} />
        </View>

      </SafeAreaView >
    </View >
  );
}