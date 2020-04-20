import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Form, Item, Input, Text, Button} from 'native-base';
import {useLoggedIn} from '../helpers/hooks';
import {fetchLogin} from '../helpers/fetchers';
import AsyncStorage from '@react-native-community/async-storage';

export const Account = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const isLoggedIn = useLoggedIn();

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('jwt', token);
    } catch (e) {
      // saving error
    }
  };

  const _clearToken = async () => {  
    setSuccess(false);

    try {
      await AsyncStorage.setItem('jwt', '');
      setSuccess(true);
    } catch (e) {
      //checking error
    }
  };

  const _login = async () => {
    let res = await fetchLogin(email, password);
    setSuccess(false);
    if (!!res.jwt) {
      storeToken(res.jwt);
      setSuccess(true);
    }
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View style={{width: '50%', marginTop: 50, alignSelf: 'center'}}>
          <Button onPress={() => _clearToken()} style={{justifyContent: 'center'}}>
            <Text>Log out</Text>
          </Button>
        </View>
      ) : (
        <>
          <Form>
            <Item>
              <Input
                value={email}
                onChangeText={(t) => setEmail(t)}
                placeholder="Username"
              />
            </Item>
            <Item>
              <Input
                secureTextEntry
                value={password}
                onChangeText={(t) => setPassword(t)}
                placeholder="Password"
              />
            </Item>
          </Form>
          <View style={{width: '50%', marginTop: 50, alignSelf: 'center'}}>
            <Button onPress={() => _login()} style={{justifyContent: 'center'}}>
              <Text>Log in</Text>
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
