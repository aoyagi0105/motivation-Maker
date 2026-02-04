import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../common/common';
import * as SecureStore from 'expo-secure-store';
import { tokenStore } from '../auth/tokenStore';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLastMotivationId } from '../store/slices/motivationSlice';
import { setFavoriteIds } from '../store/slices/favoriteSlice';
import { setLanguage } from '../store/slices/languageSlice';

function LogInScreen({ navigation }) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const dispatch = useAppDispatch();

    async function logIn() {
        try {
            const res = await axios.post(baseURL + `users/login`,
                {
                    userId: id,
                    password: pw
                })

            const { user } = res.data;
            const { access, refresh } = res.data.token;

            await SecureStore.setItemAsync('refreshToken', refresh);
            tokenStore.set(access);
            dispatch(setLanguage(user.language));
            dispatch(setLastMotivationId(user.lastMotivationId));
            dispatch(setFavoriteIds(user.favoriteMotivationIds));

            navigation.navigate('Main Screens');
        } catch (e) {
            console.log(e.response?.data?.message);
            Alert.alert("login", e.response?.data?.message);
        }

    }

    return <View style={styles.rootContainer}>
        <View>
            <Text>ID</Text>
            <TextInput style={styles.input} value={id} onChangeText={setId} />
        </View>
        <View>
            <Text>PW</Text>
            <TextInput style={styles.input} value={pw} onChangeText={setPw} secureTextEntry={true} />
        </View>
        <View style={styles.buttonStyle}>
            <Button title='login' onPress={logIn} />
        </View>
    </View>
}

export default LogInScreen;

const styles = StyleSheet.create({
    input: {
        width: 200,
        height: 40,
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 10
    },
    rootContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 50
    },
    buttonStyle: {
        marginTop: 5
    }
})