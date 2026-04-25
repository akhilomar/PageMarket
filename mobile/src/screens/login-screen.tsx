import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import type { RootStackParamList } from "@/types/navigation";

export function LoginScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "Login">) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("user@promohub.com");
  const [password, setPassword] = useState("password123");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={() => void signIn(email, password)} />
      <Button title="Create account" onPress={() => navigation.navigate("Register")} />
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

