import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MySubscriptions } from './MySubscriptions';
import { Me } from './Me';
import { LoginScreen } from './Login';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="MySubscriptions"
      activeColor="white"
      labelStyle={{ fontSize: 12 }}
      barStyle={{backgroundColor: "red"}}
    >
      <Tab.Screen
        name="MySubscriptions"
        component={MySubscriptions}
        options={{
          tabBarLabel: 'My Subscriptions',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="youtube-subscription" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={Me}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="MyTabs" component={MyTabs} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}
