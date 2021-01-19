import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MySubscriptions } from './MySubscriptions';
import { Me } from './Me';
import { LoginScreen } from './Login';
import { GoogleLogin } from './GoogleLogin';
import { ClassDetailScreen } from './classes/classDetails';
import { ClassVideoScreen } from './classes/classVideo';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="MySubscriptions"
      activeColor="white"
      labelStyle={{ fontSize: 12 }}
      barStyle={{backgroundColor: "#b22222"}}
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
      <Stack.Screen name="GoogleLogin" component={GoogleLogin} options={{headerShown: false}} />
      <Stack.Screen name="MyTabs" component={MyTabs} options={{headerShown: false}} />
      <Stack.Screen
        name="ClassDetailScreen"
        component={ClassDetailScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: route.params.style,
          headerTintColor: route.params.tintColor,
          headerTitleStyle: route.params.titleStyle,
        })}
        />
        <Stack.Screen
          name="ClassVideoScreen"
          component={ClassVideoScreen}
          options={({ route }) => ({
            title: route.params.name,
            headerStyle: route.params.style,
            headerTintColor: route.params.tintColor,
            headerTitleStyle: route.params.titleStyle,
          })}
          />
    </Stack.Navigator>
  );
}
