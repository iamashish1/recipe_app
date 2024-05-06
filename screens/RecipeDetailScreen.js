import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView,ActivityIndicator, StyleSheet, Button } from 'react-native';
import { db } from '../firebase_config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import * as FileSystem from 'expo-file-system';

const DetailRecipeScreen = ({ route }) => {
    const { documentId } = route.params;
    const [recipe, setRecipe] = useState(null);
    const [isDataFetching, setFetchingStatus] = useState(true);
    const stringsList = ['String 1', 'String 2', 'String 3'];

    const handleDownload = async () => {
        try {
            // Convert the list of strings into a CSV format
            const csvData = stringsList.join('\n');

            // Define the file path
            const filePath = FileSystem.documentDirectory + 'strings.txt';

            // Write the CSV data to a file
            await FileSystem.writeAsStringAsync(filePath, csvData, { encoding: FileSystem.EncodingType.UTF8 });

            // Open a download dialog for the user
            await FileSystem.downloadAsync(filePath, FileSystem.documentDirectory + 'strings.txt');

            console.log('File downloaded successfully');
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const docRef = doc(db, 'Recipe', documentId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const recipeData = docSnap.data();
                    setRecipe(recipeData);
                    setFetchingStatus(false);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
                setFetchingStatus(false);
            }
        }
        fetchData();
    }, []);

    return (
        isDataFetching ?
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View> :
            <ScrollView style={styles.container}>
                {recipe &&
                    <>
                        <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
                        <Text style={styles.title}>{recipe.dish}</Text>
                        <Text style={styles.description}>{recipe.description}</Text>
                        <Text style={styles.sectionTitle}>Ingredients:</Text>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            ingredient.name &&
                            <View key={index} style={styles.ingredientContainer}>
                                {ingredient.image && <Image source={{ uri: ingredient.image }} style={styles.ingredientImage} />}
                                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                            </View>
                        ))}
                        <Text style={styles.sectionTitle}>Instructions:</Text>
                        {recipe.instructions && recipe.instructions.map((instruction, index) => (
                            instruction &&
                            <View style={styles.instructionContainer} key={index}>
                                <Text style={styles.instruction}>{instruction}</Text>
                            </View>
                        ))}
                    </>
                }
            </ScrollView>
    );
};

   const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    ingredientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ingredientImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 8,
    },
    ingredientName: {
        fontSize: 16,
    },
    instructionContainer: {
        marginBottom: 16,
        borderLeftWidth: 4,
        borderColor: '#2E8B57',
        paddingLeft: 12,
    },
    instruction: {
        fontSize: 14,
    },
});

export default DetailRecipeScreen;
