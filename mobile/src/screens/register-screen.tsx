import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { api } from "@/services/api";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import type { RootStackParamList } from "@/types/navigation";

export function RegisterScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "Register">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role: "USER"
      });
      Alert.alert("Account created", "Please sign in with your credentials.");
      navigation.navigate("Login");
    } catch {
      Alert.alert("Unable to register", "Please check your details and try again.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <Input label="Full Name" value={name} onChangeText={setName} />
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={() => void register()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
    padding: 24,
    gap: 16,
    justifyContent: "center"
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0f172a"
  }
});

