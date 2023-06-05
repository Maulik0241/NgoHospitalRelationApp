import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,ScrollView,Button,Image, Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import base64 from 'react-native-base64';
import { Buffer } from 'buffer';

const HospitalProfile = ({navigation}) => {
  const [hospitalData, setHospitalData] = useState({});
  const [token, setToken] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isloading,setIsLoading] = useState(true);
  const isFocus = useIsFocused();

  // const base64Image = hospitalData.profileimage ? Buffer.from(hospitalData.profileimage).toString('base64') : '';


  useEffect( () => {
    const fatchData = async()=>{

    const token = await AsyncStorage.getItem('token');
    setToken(token);
    const endpoint = `http://10.0.2.2:3000/hospital/profile`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      // console.log('profileImage:', response.data.profileimage);

      setHospitalData(response.data);
      if(response.data.profileimage){
        setProfileImage(response.data.profileimage.url);
      }else{
        setProfileImage(null);
      }
      setIsLoading(false);
    } catch (err) {
      console.log({err: "Don't get Data from Database"});
    }
  }
  if(isFocus){
  fatchData()
}
  }, []);


  const handleDelete = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            const token = await AsyncStorage.getItem('token');
            const id = await AsyncStorage.getItem('userId');
            const endpoint = `http://10.0.2.2:3000/hospital/delete/${id}`;
            try {
              const response = await axios.delete(endpoint, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(response.data);
              alert('Account Deleted Successfully');
              navigation.navigate('LogIn');
              setIsLoading(false);
            } catch (err) {
              console.error(err.message);
              alert('Failed to delete account');
              setIsLoading(false);
            }
          },
          style: 'destructive',
        },
      ],
    );
  };
    


  if(isloading){
    return <Text style={styles.loading}>Loading...</Text>
  }

  return (
    <ScrollView styles={{backgroundColor:'#FFFFF',flex:1}}> 
      <View style={styles.mainContainer}>
        <View style={styles.profileCard}>
          {profileImage !== null ? (
            <Image source={{uri: profileImage}} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImagePlaceholderText}>
                Add Profile Picture
              </Text>
            </View>
          )}
          <Text style={styles.label}>Organization Name:</Text>
          <Text style={styles.text}>{hospitalData.orgname}</Text>
          <Text style={styles.label}>Contact Name:</Text>
          <Text style={styles.text}>{hospitalData.contactname}</Text>
          <Text style={styles.label}>Contact Email:</Text>
          <Text style={styles.text}>{hospitalData.contactemail}</Text>
          <Text style={styles.label}>Contact Phone:</Text>
          <Text style={styles.text}>{hospitalData.contactphone}</Text>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.text}>{hospitalData.address}</Text>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.description}>{hospitalData.description}</Text>
          <View style={styles.btn}>
          <Button
            style={styles.updateBtn}
            onPress={() => navigation.navigate('UpdateHospitalProfile')}
            title="Edit Profile"
            color="#77A7FF"
          />
          <Button
            style={styles.deleteBtn}
            onPress={handleDelete}
            title="Delete Profile"
            color="red"
          />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFF',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    margin: 20,
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileImagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#ccc',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImagePlaceholderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
    fontStyle: 'italic',
    textAlign: 'justify',
  },
  loading:{
    alignSelf:'center',
    justifyContent:'center',
    marginVertical:300,
    backgroundColor:'#77A7FF',
    fontSize:40,
    borderRadius:5,

  },
  btn:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  updateBtn:{
    flex: 1,
    marginLeft: 40,
  },
  deleteBtn:{
    flex: 1,
    marginRight: 40,
  }
});

export default HospitalProfile;
