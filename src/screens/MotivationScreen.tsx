import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { baseURL } from '../common/common';
import { api } from '../auth/api';
import { tokenStore } from '../auth/tokenStore';
import * as SecureStore from 'expo-secure-store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearLastMotivationId, increseMotivationId } from '../store/slices/motivationSlice';

function MotivationScreen({ navigation }) {
    const dispatch = useAppDispatch();
    const lastMotivationId = useAppSelector(state => state.motivation.lastMotivationId);
    const [motivation, setMotivation] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getMotivation() {
            setLoading(true);
            const accessToken = tokenStore.get();
            api.get(baseURL + 'motivation/nextMotivation', {
                params: {
                    lastMotivationId
                },
                headers: {
                    authorization: accessToken
                }
            })
                .then(res => {
                    setMotivation(res.data.nextData);
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
                lastMotivationId
            },
            headers: {
                authorization: accessToken
            }
        })
            .then(res => {
                setMotivation(res.data.nextData);
                dispatch(increseMotivationId());
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false);
            })
    }

    function signOut() {
        tokenStore.set(null);
        dispatch(clearLastMotivationId());
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