import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import firebase from '../firebase_config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase_config/firebase';
import { handleException } from '../firebase_config/firebase_util';
import { authStyle } from '../styles/auth_style';
import { showToastWithGravityAndOffset } from '../toast';

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                showToastWithGravityAndOffset("Successfully Signed Up")

            })
            .catch(error => {
                const errorMessage = handleException(error);
                Alert.alert('Error', errorMessage);
            });



    };

    return (
        <View style={authStyle.container}>
            <Text style={authStyle.header}>Signup</Text>
            <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={authStyle.textInput}
            />
            <TextInput
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                style={authStyle.textInput}
            />
            <Button title="Signup" onPress={handleSignup} />
        </View>
    );
}
