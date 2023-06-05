import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HospitalHome from './HospitalHomeScreen';
import HospitalActivity from './HospitalActivity';
import HospitalProfile from './HospitalProfile';
import HospitalMore from './HospitalMore';


const Tab = createMaterialBottomTabNavigator();

export default function HospitalBottem() {

  return (
    <Tab.Navigator
    initialRouteName="HospitalHomeScreen"
    activeColor="#1c92d2"
    barStyle={{ backgroundColor: '#f2fcfe' ,height:70}}
    screenOptions={{
    }}
    
   
  
  >
  <Tab.Screen
      name="HospitalHomeScreen"
      component={HospitalHome}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="HospitalActivity"
      component={HospitalActivity}
      options={{
        tabBarLabel: 'Activity',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="heart-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="HospitalProfile"
      component={HospitalProfile}
      options={{
        title:'Profile',
        tabBarLabel: 'Account',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-outline" color={color} size={26} />
        ),
        
      }}
    />
     <Tab.Screen
      name="HospitalMore"
      component={HospitalMore}
      options={{
        tabBarLabel: 'More',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="menu" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})