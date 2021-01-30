import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MySubscriptions } from './MySubscriptions';
import { Me } from './Me';
import { GoogleLogin } from './GoogleLogin';
import { ClassDetailScreen } from './classes/classDetails';
import { ClassVideoScreen } from './classes/classVideo';
import { LeaveFormScreen } from './hands2/LeaveForm';
import { LeaveDisplayScreen } from './hands2/LeaveDisplay';

const Tab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function MyTopTabs() {
  return (
    <TopTab.Navigator
      initialRouteName="LeaveFormScreen"
    >
      <TopTab.Screen name="LeaveFormScreen" component={LeaveFormScreen} options={{
        tabBarLabel: 'Leave Application',
      }}/>
      <TopTab.Screen name="LeaveDisplayScreen" component={LeaveDisplayScreen} options={
        {tabBarLabel: 'Leave Submission'}
      } />
    </TopTab.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="MySubscriptions"
      activeColor="white"
      labelStyle={{ fontSize: 12 }}
      barStyle={{backgroundColor: "#b22222"}}
    >
      <Tab.Screen
        name="MyTopTabs"
        component={MyTopTabs}
        options={({route}) => (
          {
            tabBarLabel: 'Hands2',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="hand-peace" color={color} size={26} />
            ),
            route: {route}
          }
        )}
        initialParams={{dates: [], times: [], reasons: []}}
      />
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
