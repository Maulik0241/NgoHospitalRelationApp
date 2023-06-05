import { StyleSheet, Text, View,BackHandler,Alert, Button, ScrollView,Image} from 'react-native'
import React,{useEffect,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { List,Searchbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function NgoHome({navigation}) {

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to leave the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigation.isFocused()) {
          return backAction();
        }
      },
    );
    return () => backHandler.remove();
  }, [navigation]);


  const [hospitalList, setHospitalList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const isFocus = useIsFocused();

  const fetchNGOList = async () => {
    const endpoint = `http://10.0.2.2:3000/hospital-list`;
    try {
      const response = await axios.get(endpoint);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching NGO data: ', error);
      throw new Error('Internal Server Error');
    }
  };

  useEffect(() => {
    if(isFocus){
    const fetchNGOListAsync = async () => {
      const list = await fetchNGOList();
      setHospitalList(list);
    };
    fetchNGOListAsync();
  }
  }, [isFocus]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };


  


  const filteredNGOList = hospitalList.filter((hospital) =>
  hospital.orgname.toLowerCase().includes(searchQuery.toLowerCase()),
);

return (
  <SafeAreaView style={styles.container}> 
  <View style={styles.headerBar}>
          <Text style={styles.headerText}>HOME</Text>
    </View>
  
  <Searchbar
placeholder="Search"
onChangeText={handleSearch}
value={searchQuery}
icon={({ color, size }) => (
  <MaterialCommunityIcons
    name="magnify"
    color={color}
    size={size}
  />
)}
style={styles.searchBar}
/>
<ScrollView contentContainerStyle={{
  padding:10
}}>
  {filteredNGOList.map((hospital,index) => (
    <List.Item 
      key={index} 
      onPress={() => {
        navigation.navigate('ShowMoreNgo', { hospitalData: hospital });
      }}
      style={styles.item}
      title={
        <View style={styles.profile}>
        <View style={styles.profileImage}>
        <Image source={require('../../assets/images/SGVP.jpg')} style={{width:259,height:194}}/>
        </View>
          <View style={styles.textContainer}>
            <Text style={styles.orgName}>Organization Name: {hospital.orgname}</Text>
          </View>
        </View>
      }
    />
  ))}
  </ScrollView>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  headerBar:{
    backgroundColor:"#77A7FF",
    height:55,
    justifyContent:'center',

  },
  headerText:{
    fontSize:22,
    fontWeight:"bold",
    marginLeft:5,
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    elevation: 2, // adds shadow on Android
    // shadowColor: '#ffff', // adds shadow on iOS
    shadowOpacity: 0,
    borderColor: '#77A7FF',
    backgroundColor:'#FFFF',
    borderWidth:2,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profile: {
    flexDirection: 'column',
    width:300,
    height:300,
    backgroundColor:'#fff',
    borderRadius:10,
    margin:30,
    
  },
  textContainer:{
      marginLeft:20,
      textAlign:'justify',
      backgroundColor:'#FFF',
      borderRadius:2,
      height:"10%",
  },
  profileImage: {
    margin:20,
    width: 200, // increase the width
    height: 200, // increase the height
     // make the image rectangular with rounded corners
     // add margin to separate the image from the organization name
  },
  orgName: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  item: {
    backgroundColor: '#77A7FF',
    padding: 25,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2, // adds shadow on Android
    shadowColor: '#000', // adds shadow on iOS
    shadowOpacity: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
});