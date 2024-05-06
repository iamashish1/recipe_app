
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import firebase from './firebase_config/firebase';
import LoginScreen from './screens/LoginScreen';
import DetailRecipeScreen from './screens/RecipeDetailScreen';
import SignupScreen from './screens/SignupScreen';
import DashboardScreen from './screens/Dashboard';
import LoadingScreen from './common_components/loading';
const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);


    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen name="Loading" component={LoadingScreen} />
        ) : user ? (
          <>
            <Stack.Screen name="Home" component={DashboardScreen} />
            <Stack.Screen name="DetailRecipe" component={DetailRecipeScreen} />

          </>
        ) : (
          <>
            <Stack.Screen name="Signin" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
