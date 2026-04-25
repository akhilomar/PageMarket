import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PromoHub</Text>
      <ActivityIndicator size="large" color="#ff6b57" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffaf0",
    gap: 16
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0f172a"
  }
});

