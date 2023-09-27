import { StyleSheet,FlatList, Text, View , Image } from 'react-native';
import SearchBar from './components/SearchBar';
import { useEffect , useState } from 'react';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]); 
  useEffect(() => {
    fetch('https://rsca-0002-prod.novemberfive.co/api/employees')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          const nonStaffEmployees = data.data.filter((employee) => employee.category !== 'STAFF');

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
    
  };

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
        )}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
    marginTop: 200,
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
  
});
