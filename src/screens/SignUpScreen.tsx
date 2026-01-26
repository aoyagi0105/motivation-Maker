import { View, Text, StyleSheet, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { baseURL } from '../common/common';
import * as SecureStore from 'expo-secure-store';
import { tokenStore } from '../auth/tokenStore';
import { api } from '../auth/api';
import { lastMotivationIdStore } from '../common/lastMotivationIdStore';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function SignUpScreen({ navigation }) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [nickName, setNickName] = useState('');

    async function signUp() {
        const res = await api.post(baseURL + 'users/signUp', { userId: id, password: pw, nickName })
        const { lastMotivationId } = res.data;
        const { access, refresh } = res.data.token;
        await SecureStore.setItemAsync('refreshToken', refresh);
        tokenStore.set(access);
        lastMotivationIdStore.set(lastMotivationId);

        navigation.navigate('Main Screens');
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
        <View>
            <Text>nickName</Text>
            <TextInput style={styles.input} value={nickName} onChangeText={setNickName} />
        </View>
        <View style={styles.buttonStyle}>
            <Button title='sign up' onPress={signUp} />
        </View>
    </View>
}

export default SignUpScreen;

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