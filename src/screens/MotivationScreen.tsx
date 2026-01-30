import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { baseURL } from '../common/common';
import { api } from '../auth/api';
import { tokenStore } from '../auth/tokenStore';
import * as SecureStore from 'expo-secure-store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearLastMotivationId, increseMotivationId } from '../store/slices/motivationSlice';
import { clearFavorite, setIsFavored } from '../store/slices/favoriteSlice';
import { clearLanguage, setLanguage } from '../store/slices/languageSlice';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Langs } from '../common/language';

function MotivationScreen({ navigation }) {
    const dispatch = useAppDispatch();
    const lastMotivationId = useAppSelector(state => state.motivation.lastMotivationId);
    const [motivationText, setMotivationText] = useState(null);
    const [motivationAuthor, setMotivationAuthor] = useState(null);
    const [loading, setLoading] = useState(false);
    const language = useAppSelector(state => state.language.language);
    const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => {
        async function getMotivation() {
            setLoading(true);
            api.get(baseURL + 'motivation/nextMotivation', {
                params: {
                    lastMotivationId,
                    isMotivationScreen: true,
                    language
                },
            })
                .then(res => {
                    setMotivationText(res.data.text.text);
                    setMotivationAuthor(res.data.author.text);
                    dispatch(setIsFavored(res.data.isFavored));
                })
                .catch()
                .finally(() => {
                    setLoading(false);
                })
        }
        getMotivation();
    }, [language]);


    function nextMotivation() {
        setLoading(true);
        api.get(baseURL + 'motivation/nextMotivation', {
            params: {
                lastMotivationId,
                isMotivationScreen: true,
                language
            },
        })
            .then(res => {
                setMotivationText(res.data.text.text);
                setMotivationAuthor(res.data.author.text);
                dispatch(setIsFavored(res.data.isFavored));
                dispatch(increseMotivationId());
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false);
            })
    }


    function changeLanguage() {
        const options = ['cancle', ...Langs.map((lang) => lang.label)];
        const cancelButtonIndex = 0;

        showActionSheetWithOptions({ options, cancelButtonIndex },
            (selectedIndex) => {
                if (selectedIndex === 0) {
                    return;
                }

                const picked = Langs.map((lang) => lang.value)[selectedIndex - 1];
                dispatch(setLanguage(picked));
            }
        )
    }

    function signOut() {
        dispatch(clearFavorite());
        dispatch(clearLastMotivationId());
        dispatch(clearLanguage());
        SecureStore.deleteItemAsync('refreshToken');
        tokenStore.set(null);
        navigation.reset({ index: 0, routes: [{ name: 'InitialScreen' }] });
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color='black' />
            </View>
        )
    }

    if (!motivationText || !motivationAuthor ||
        motivationText.length === 0 || motivationAuthor.length === 0) {
        return <View style={styles.noDataContainer}>
            <View style={styles.noDataText}>
                <Text style={styles.storyText}>There is no Data</Text>
            </View>
            <View style={styles.signOutButtonStyle}>
                <Button
                    title='sign out'
                    onPress={signOut}
                />
            </View>
        </View>
    }

    return <View style={styles.rootContainer}>
        <View style={styles.textContainer}>
            <View>
                <Text style={styles.storyText}>{motivationText}</Text>
            </View>
            <View>
                <Text style={styles.authorText}>- {motivationAuthor}</Text>
            </View>
        </View>
        <View style={styles.buttonContainer}>
            <View style={styles.nextButonStyle}>
                <Button
                    title='next'
                    onPress={nextMotivation}
                />
            </View>
            <View style={styles.signOutButtonStyle}>
                <Button
                    title='sign out'
                    onPress={signOut}
                />
            </View>
            <View style={styles.changeLanguageButtonStyle}>
                <Button
                    title='language'
                    onPress={changeLanguage}
                />
            </View>
        </View>
    </View>
}

export default MotivationScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },

    textContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    storyText: {
        fontSize: 30,
        textAlign: 'center',
        marginHorizontal: 45,
        marginBottom: 10
    },
    authorText: {
        fontSize: 25,
        textAlign: 'right',
        marginRight: 25
    },

    buttonContainer: {
        flex: 0.6,
        width: '100%',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        marginTop: 140,
    },
    nextButonStyle: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        marginHorizontal: 10
    },
    signOutButtonStyle: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        marginHorizontal: 10
    },
    changeLanguageButtonStyle: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        marginHorizontal: 10
    },

    noDataContainer: {
        width: '100%',

    },
    noDataText: {
        paddingTop: 10
    },
    noDataSignOutButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20
    }
})