import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../common/common';
import { api } from '../auth/api';
import { lastMotivationIdStore } from '../common/lastMotivationIdStore';
import { tokenStore } from '../auth/tokenStore';
import * as SecureStore from 'expo-secure-store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function MotivationScreen({ navigation }) {
    const [motivation, setMotivation] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(false);
    const [motivationId, setMotivationId] = useState(0);
    const [liked, setLiked] = useState(false);


    useEffect(() => {

        async function getMotivation() {
            const accessToken = tokenStore.get();
            const lastMotivationId = lastMotivationIdStore.get();
            setLoading(true);
            api.get(baseURL + 'motivation/nextMotivation', {
                params: {
                    lastMotivationId: lastMotivationId
                },
                headers: {
                    authorization: accessToken
                }
            })
                .then(res => {
                    setMotivation(res.data.nextData);
                    setMotivationId(lastMotivationId + 1);
                })
                .catch()
                .finally(() => {
                    setLoading(false);
                })
        }
        getMotivation();
    }, []);


    function nextMotivation() {
        const accessToken = tokenStore.get();
        setLoading(true);
        api.get(baseURL + 'motivation/nextMotivation', {
            params: {
                lastMotivationId: motivationId
            },
            headers: {
                authorization: accessToken
            }
        })
            .then(res => {
                setMotivation(res.data.nextData);
                setMotivationId(motivationId + 1);
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false);
            })
    }

    function explainMotivation() {
        axios.get(baseURL + 'motivation')
            .then(res => {

            })
    }

    function signOut() {
        tokenStore.set(null);
        lastMotivationIdStore.set(null);
        SecureStore.deleteItemAsync('refreshToken');
        navigation.navigate('InitialScreen');
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color='black' />
            </View>
        )
    }

    if (!motivation || motivation.length === 0) {
        return <View>
            <Text style={styles.storyText}>There is no Data</Text>
        </View>
    }

    return <View>
        <ScrollView>
            <View>
                <Text style={styles.storyText}>{motivation[0].text}</Text>
            </View>
            <View>
                <Text style={styles.storyText}>{motivation[0].author}</Text>
            </View>
            <View style={styles.buttonStyle}>
                <Button title='next'
                    onPress={nextMotivation}
                />
            </View>
            <View style={styles.buttonStyle}>
                <Button title='explain'
                    onPress={explainMotivation}
                />
            </View>
            <View style={styles.buttonStyle}>
                <Button title='sign out'
                    onPress={signOut}
                />
            </View>
        </ScrollView>
    </View>
}

export default MotivationScreen;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    storyText: {
        fontSize: 30
    },
    nextButton: {
        margin: 20,
        borderWidth: 2
    },
    buttonStyle: {
        marginTop: 5,
        width: 100,
        height: 50
    },
    test: {
        width: 33,
        justifyContent: 'center',
        alignItems: 'center'
    }
})