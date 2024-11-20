import { View, StyleSheet, Text, SafeAreaView, StatusBar, Image, Button, TextInput } from 'react-native';
import card from '../assets/images/black-card.jpeg';

export default function HomeScreen() {
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
          <View style={styles.row}>
            <Button
              title="BUTTON"
              color="gray" />
            <Button
              title="BUTTON"
              color="gray" />
          </View>
          <View style={styles.row}>
            <Button
              title="BUTTON"
              color="gray" />
            <Button
              title="BUTTON"
              color="gray" />
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#d4eafd',
  },
  centered: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    zIndex: 5,
  },
  card: {
    width: 290,
    height: 180,
    borderRadius: 15,
    elevation: 15,
  },
  formContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 100,
    paddingTop: 130,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  gridContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%',
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  textInput: {
    width: '70%',
    borderColor: 'red',
    borderBottomWidth: 2,
  },
});
