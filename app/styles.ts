import { StyleSheet } from 'react-native';

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
  cardDetailsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
    padding: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardDetailsEntry: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  cardDetailsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    alignSelf: 'flex-start',
  },
  cardNumberText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'normal',
    fontFamily: 'monospace',
  },
  focused: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
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
    paddingBottom: 30,
    marginTop: 100,
    paddingTop: 130,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  label: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
});

export default styles;
