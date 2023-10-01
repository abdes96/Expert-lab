import { StyleSheet, Text, View } from 'react-native';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <Text style={styles.description}>
         settings for the app.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 30,
  },
  description: {
    fontSize: 16,
    marginTop: 20,
  },
});
