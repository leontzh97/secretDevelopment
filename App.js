import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MyStack } from './Home';

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
