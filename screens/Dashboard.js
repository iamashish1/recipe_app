
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Button, ActivityIndicator, Image, StyleSheet, FlatList, TextInput } from 'react-native';
import { auth, db } from '../firebase_config/firebase';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';

export default function DashboardScreen({ navigation }) {
    const [isDataFetching, setFetchingStatus] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        signOut(auth)
            .then(() => {})
            .catch(error => {
                console.log('Error:', error);
            });
    };
    // const handleNavigation=()=>{}

    useLayoutEffect(() => {
        navigation.setOptions({
            
            headerRight: () => (
                <Button onPress={handleLogout} title="Logout" />
            ),
        });
    }, [navigation]);

    useEffect(() => {
        const dbCollection = collection(db, 'Recipe');
        const dbQuery = query(dbCollection);
        const fetchedRecipes = [];
        getDocs(dbQuery)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    fetchedRecipes.push({ ...data, id: doc.id }); // Include document ID
                });
                setFetchingStatus(false);
                setRecipes(fetchedRecipes);
            })
            .catch((error) => {
                setFetchingStatus(false);
                console.error('Error fetching recipes:', error);
            });
    }, []);

    const filteredRecipes = recipes.filter(recipe =>
        recipe.dish.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search Recipes..."
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            {isDataFetching ? (
                <ActivityIndicator size='large' color='green' />
            ) : (
                <FlatList
                    style={{ flex: 1 }}
                    data={filteredRecipes}
                    renderItem={({ item }) => (
                        <Card
                            dish={item.dish}
                            description={item.description}
                            imageUrl={item.imageUrl}
                            onViewRecipe={() =>{

                                console.log("JHDSBCJHDS")

                                console.log(item.id)
                                console.log(navigation)
                                navigation.navigate('DetailRecipe', { documentId: item.id })
                                // navigation.navigate('DetailRecipe', { documentId: item.id })
                            } } // Navigate to DetailRecipeScreen with document ID
                        />
                    )}
                    keyExtractor={(item) => item.id} // Use document ID as the key
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                />
            )}
        </View>
    );
}

const Card = ({ dish, description, imageUrl, onViewRecipe }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{dish}</Text>
            <Text style={styles.description}>{description}</Text>
            <Button title="View Recipe" onPress={onViewRecipe} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 8,
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        paddingHorizontal: 16,
    },
});
