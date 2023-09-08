import React, { useState } from "react";
import { TextInput, StyleSheet, Button, Text, View, TouchableOpacity } from "react-native";
import {Ionicons} from 'react-native-vector-icons'
import axios from "axios";
import Main from "./Main";
import UserContext from "../../authsession/authsession";


import { login } from "../../service/auth";


export default function Login({ navigation }) {
  const { setAuth } = React.useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [err, setErr] = useState('');

  console.log(email, password)

  const handleLogin = async () => {
    try {
      const log = await login(email, password);
      await setAuth(log.data.data);
      navigation.navigate('Navtab');
    } catch (e) {
      setError(e.response.data.data);
    }
  };
  const handleEmailChange = (value) => {
    setEmail(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  console.log(handleEmailChange);





  return (
    <View style={styles.container}>
      <TouchableOpacity 
      onPress={() => navigation.navigate('Main')}
      >
          <Ionicons name="chevron-back-outline" size={40} color="black"/>
      </TouchableOpacity>

      <Text style={styles.h1}>Connexion</Text>
      
      {/* EMAIL */}
      <View style={styles.inputDiv}>
      <Text style={styles.textLabel}>Nom d'utilisateur ou e-mail</Text>
        <TextInput
          icon="mail"
          placeholder="Enter your email"
          // autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleEmailChange}
          value={email}
          style={styles.inputField}
        />
      </View>

      {/* PASSWORD */}
      <View style={styles.inputDiv}>
        <Text style={styles.textLabel}>Password</Text>
        <TextInput
          icon="key"
          placeholder="Enter your password"
          secureTextEntry
          autoCompleteType="password"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="go"
          returnKeyLabel="go"
          onChangeText={handlePasswordChange}
          value={password}
          style={styles.inputField}
        />
      </View>

      {/* LogBtn */}
      <View style={styles.loginBtn}>
        <Button title="Login" onPress={handleLogin} />
      </View>

      {/* <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      /> */}

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    fontWeight: "400",
    letterSpacing: 1,
    fontSize: '20'
  },
  labelInput: { color: "#223e4b", fontSize: 20, marginBottom: 16 },
  inputDiv: { paddingHorizontal: 32, marginBottom: 16, width: "100%" },
  loginBtn: { marginBottom: 16 },
  textLabel: {
    textTransform: 'uppercase'
  },

});