import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { baseURL } from '../common/common';
import * as SecureStore from 'expo-secure-store';
import { tokenStore } from '../auth/tokenStore';
import { api } from '../auth/api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { setLanguage } from '../store/slices/languageSlice';
import { Langs } from '../common/language';

function SignUpScreen({ navigation }) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [nickName, setNickName] = useState('');
    const dispatch = useAppDispatch();
    const { showActionSheetWithOptions } = useActionSheet();
    const language = useAppSelector(state => state.language.language);
    const selectedLang = Langs.find(lang => lang.value === language).label;


    async function signUp() {
        const res = await api.post(baseURL + 'users/signUp', { userId: id, password: pw, nickName })
        const { access, refresh } = res.data.token;
        await SecureStore.setItemAsync('refreshToken', refresh);
        tokenStore.set(access);
        navigation.navigate('Main Screens');
    }

    function openLanguageSheet() {
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
        <View >
            <Text>language</Text>
            <TouchableOpacity onPress={openLanguageSheet} style={styles.lanButton}>
                <Text>{selectedLang}</Text>
            </TouchableOpacity>
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
    },
    lanButton: {
        width: 200,
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'black'
    }
})