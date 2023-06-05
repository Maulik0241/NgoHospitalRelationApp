import {View, Text, Image, StyleSheet,ScrollView} from 'react-native';
import React from 'react'

export default function ShowMoreNgo({route}) {
    const {hospitalData} = route.params;
  return (
    <ScrollView  style={styles.mainContainer} contentContainerStyle={{
        padding:20,
        marginTop:100,
        justifyContent:'center',
        }}>
    <View style={styles.container}>
      <Image source={require('../../assets/images/ngoimage.jpg')} style={styles.profileImage} />
      <Text style={styles.orgName}>{hospitalData.orgname}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Contact Name: </Text>
        <Text style={styles.value}>{hospitalData.contactname}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Address: </Text>
        <Text style={styles.value}>{hospitalData.address}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Description: </Text>
        <Text style={styles.description}>{hospitalData.description}</Text>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor:'#77A7FF',
    },
    container: {
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: 20,
    },
    profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      marginBottom: 20,
    },
    orgName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#003f5c',
    },
    infoContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'center',
    },
    label: {
      fontWeight: 'bold',
      marginRight: 5,
      color: '#003f5c',
      width: 100,
    },
    value: {
      flex: 1,
      color: '#000000',
    },
    description: {
      fontSize: 16,
      marginBottom: 15,
      textAlign: 'justify',
      flex: 1,
      color: '#000000',
    },
  });