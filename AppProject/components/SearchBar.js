import { useState } from 'react';
import { View, TextInput, TouchableOpacity ,  Text , StyleSheet} from 'react-native';

const SearchBar = ( {onSearch}) => {
    const [searchText, setSearchText] = useState('');
  
    const handleSearch = () => {
      onSearch(searchText);

    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.Bar}
          placeholder="Search Player"
          onChangeText={(text) => {
            setSearchText(text);
            handleSearch(); 
          }} 
           value={searchText}
        />
        
      
      </View>
    );
  };


const styles = StyleSheet.create({
Bar: {
    borderColor: 'purple',
    borderWidth: 2,
    padding: 12,
    marginTop : 10,
    width: 300

},

button: {
    backgroundColor: 'purple',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
    display : 'flex',
    justifyContent : 'right'
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  container : {
    flexDirection : 'column',
    alignItems: 'center' ,
    justifyContent : 'center'

  }

});


  export default SearchBar 