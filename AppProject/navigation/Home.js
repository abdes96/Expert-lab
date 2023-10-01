import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import Modal from 'react-native-modal'; 

import * as Animatable from 'react-native-animatable';



export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  
  const toggleModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalVisible(!isModalVisible);
  };
  
  const renderModal = () => {
    return (
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Employee Details</Text>
          <View style={styles.employeeDetails}>
          <Animatable.View animation="rubberBand" duration={1000} style={styles.employeeDetails}>
  <Text style={styles.employeeName}>
    {selectedEmployee.first_name} {selectedEmployee.last_name}
  </Text>
  <Text style={styles.employeeInfo}>
    Shirt Number: {selectedEmployee.shirt_number}
  </Text>
  <Text style={styles.employeeInfo}>
    Birth Date: {selectedEmployee.birth_date}
  </Text>
  <Text style={styles.employeeInfo}>
    Category: {selectedEmployee.category}
  </Text>
</Animatable.View>

            {selectedEmployee.avatar && (
              <Image
                source={{ uri: selectedEmployee.avatar }}
                style={styles.employeeAvatar}
              />
            )}
          </View>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  
  
  
  useEffect(() => {
    fetch('https://rsca-0002-prod.novemberfive.co/api/employees')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          const nonStaffEmployees = data.data.filter(
            (employee) => employee.category !== 'STAFF'
          );

          setEmployees(nonStaffEmployees);
        } else {
          console.error('Data is not an array:');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchText(query);
    if (query === '') {
      setFilteredEmployees([]);
      return;
    }
    const filtered = employees.filter((employee) => {
      const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });
    setFilteredEmployees(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, I'm testing React Native!</Text>
      <SearchBar onSearch={handleSearch} />
  
      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleModal(item)}
          >
            <View style={styles.employeeContainer}>
              <Text style={styles.employeeName}>
                {item.first_name} {item.last_name}
              </Text>
              {item.avatar && (
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.employeeAvatar}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
      {isModalVisible && renderModal()} 
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },
  text: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 30,
  },
  employeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: 'purple',
    borderWidth: 2,
    padding: 10,
  },
  employeeName: {
    fontSize: 18,
    marginRight: 10,
  },
  employeeAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  employeeDetails: {
    alignItems: 'center',
  },
  employeeName: {
    fontSize: 18,
    marginBottom: 10,
  },
  employeeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  employeeInfo: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black', 
  },
  closeButton: {
    backgroundColor: 'purple',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});