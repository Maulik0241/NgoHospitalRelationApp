import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NgoHome from './NgoHomeScreen';
import NgoActivity from './NgoActivity';
import NgoProfile from './NgoProfile';
import NgoMore from './NgoMore';

const Tab = createMaterialBottomTabNavigator();

export default function BottemTab() {

  return (
    <Tab.Navigator
    initialRouteName="NgoHomeScreen"
    activeColor="#1c92d2"
    barStyle={ {backgroundColor:'#f2fcfe',height:70}}
    screenOptions={{
    }}
    
   
  
  >
  <Tab.Screen
      name="NgoHomeScreen"
      component={NgoHome}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="NgoActivity"
      component={NgoActivity}
      options={{
        tabBarLabel: 'Activity',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="heart-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="NgoProfile"
      component={NgoProfile}
      options={{
        title:'Profile',
        tabBarLabel: 'Account',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-outline" color={color} size={26} />
        ),
        
      }}
    />
     <Tab.Screen
      name="NgoMore"
      component={NgoMore}
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