import axios from 'axios';
import { Button, StyleSheet, View } from 'react-native';
import { baseURL } from '../common/common';

function InitialScreen({ navigation }) {

    function moveSignUpScreen() {
        navigation.navigate('SignUpScreen');
    }

    function moveLogInScreen() {
        navigation.navigate('LogInScreen');
    }

    // function createMotivation() {
    //     axios.post(baseURL + 'motivation')
    //         .then(res => console.log('모티베이션 추가 완료'))
    //         .catch(err => console.log(err))
    // }

    return <View style={styles.rootContainer}>
        <View style={styles.buttonContainer} >
            <Button title='sign in' onPress={moveSignUpScreen} />
        </View>
        <View style={styles.buttonContainer} >
            <Button title='login' onPress={moveLogInScreen} />
        </View>
        {/* 데이터 추가 버튼 */}
        {/* <View style={styles.buttonContainer} >
            <Button title='createMotivation' onPress={createMotivation} />
        </View> */}
    </View>
}

export default InitialScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        margin: 10,
        width: 100,
    }
})