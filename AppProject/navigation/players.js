import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function Settings() {
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    fetch('https://rsca-0002-prod.novemberfive.co/api/employees')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          const nonStaffEmployees = data.data.filter(
            (employee) => employee.category !== 'STAFF'
          );

          setAllPlayers(nonStaffEmployees);
        } else {
          console.error('Data is not an array:');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>All Players</Text>
      {allPlayers.map((player) => (
        <View key={player.id} style={styles.playerContainer}>
          {player.avatar && (
            <Image
              source={{ uri: player.avatar }}
              style={styles.playerAvatar}
            />
          )}
          <View style={styles.playerDetails}>
            <Text style={styles.playerName}>
              {player.first_name} {player.last_name}
            </Text>
            <Text style={styles.playerInfo}>
              Shirt Number: {player.shirt_number}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
    paddingTop: 20,
  },
  text: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 30,
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: 'purple',
    borderWidth: 2,
    padding: 10,
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  playerDetails: {
    flex: 0.8,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerInfo: {
    fontSize: 16,
  },
});
