import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ToastAndroid, Pressable } from 'react-native';
import firebase from '../firebase_config/firebase';
import { auth } from '../firebase_config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { handleException } from '../firebase_config/firebase_util';
import { authStyle } from '../styles/auth_style';
import { showToastWithGravityAndOffset } from '../toast';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                showToastWithGravityAndOffset("Successfully Singed In")
            })
            .catch(error => {
                const errorMessage = handleException(error);
                Alert.alert('Error', errorMessage);
            });
    };

    return (
        <View style={authStyle.container}>
            <Text style={authStyle.header}>Login</Text>
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
            <Pressable onPress={handleLogin} style={authStyle.button}>
                <Text style={{ color: 'white',fontWeight:'600', alignSelf: 'center' }}>Login</Text>
            </Pressable>
            <Text></Text>
            <Pressable title="Signup" onPress={() => navigation.navigate('Signup')} style={authStyle.secondaryButton} >
            <Text style={{ color: 'black',fontWeight:'600', alignSelf: 'center' }}>SignUp</Text>
            </Pressable>
        </View>
    );
}
