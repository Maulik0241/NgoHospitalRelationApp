import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button, ScrollView, } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
// import Textarea from 'react-native-textarea';
import FilePicker, {types} from 'react-native-document-picker';

const UpdateHospitalProfile = ({navigation}) => {
    const [token, setToken] = useState('');
    const [hospitalData, setHospitalData] = useState({});
    const [orgName, setOrgName] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [profileimage, setProfileImage] = useState(null);
    const [isloading,setIsLoading] = useState(true);
    const isFocus = useIsFocused();
  
    useEffect(() => {
      const fetchHospitalData = async () => {
        const token = await AsyncStorage.getItem('token');
        setToken(token);
        const endpoint = `http://10.0.2.2:3000/hospital/profile`;
        try {
          const response = await axios.get(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setHospitalData(response.data);
          setOrgName(response.data.orgname);
          setContactName(response.data.contactname);
          setContactEmail(response.data.contactemail);
          setContactPhone(response.data.contactphone);
          setAddress(response.data.address);
          setDescription(response.data.description);
          if (response.data.profileimage) {
            setProfileImage(response.data.profileimage.url);
          } else {
            setProfileImage(null);
          }
          console.log(response.data);
          setIsLoading(false);
        } catch (err) {
          console.log({ err: "Don't get Data from Database" });
        }
      };
  
      fetchHospitalData();
    }, [isFocus]);
  
  
    const handlePickImage = async () => {
      try {
        const result = await FilePicker.pick({
          type: [FilePicker.types.images],
          
        });
        setProfileImage(result[0].uri);
        if(result.uri==null){
          console.log("result is null");
        }else{
        console.log(result.uri);
      }
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleUpdate = async () => {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
      const endpoint = `http://10.0.2.2:3000/hospital/profile/update`;
      try {
        const formData = new FormData();
        formData.append('orgname', orgName);
        formData.append('contactname', contactName);
        formData.append('contactemail', contactEmail);
        formData.append('contactphone', contactPhone);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('profileimage', {
          uri: profileimage, // file uri
          name: 'profileimage.png', // file name
          type: 'image/png' // file type
        });
        
        const response = await axios.put(
          endpoint,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data', // set content-type header
            },
          }
        );
        if (response.data.profileimage) {
          setProfileImage(response.data.profileimage.url);
        } else {
          setProfileImage(null);
        }
        setHospitalData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log({ err: "Don't get Data from Database and not updated" });
      }
      navigation.navigate('HospitalProfile');
    };
  
  if(isloading){
    return <Text style={styles.loading}>Loading...</Text>
  }

  return (
    <ScrollView>
    <View style={styles.mainContainer}>
       <View style={styles.profileCard}>
       <TouchableOpacity onPress={handlePickImage}>
  {profileimage ? (
    <Image source={{ uri: profileimage }} style={styles.profileImage} />
  ) : (
    <View style={styles.profileImagePlaceholder}>
      <Text style={styles.profileImagePlaceholderText}>Select Profile Image</Text>
    </View>
  )}
</TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Organization Name"
        value={orgName}
        onChangeText={text => setOrgName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Name"
        value={contactName}
        onChangeText={text => setContactName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Email"
        value={contactEmail}
        onChangeText={text => setContactEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Phone"
        value={contactPhone}
        onChangeText={text => setContactPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <TextInput
        style={styles.textarea}
        placeholder="Description"
        value={description}
        multiline={true}
        onChangeText={text => setDescription(text)}
      />
      <Button title="Update" onPress={() => handleUpdate()} />
    </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    margin: 20,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
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
    borderRadius: 75,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImagePlaceholderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textarea: {
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  loading:{
    alignSelf:'center',
    justifyContent:'center',
    marginVertical:300,
    backgroundColor:'#77A7FF',
    fontSize:40,
    borderRadius:5,

  },
});

export default UpdateHospitalProfile;
