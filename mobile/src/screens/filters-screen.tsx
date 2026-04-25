import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function FiltersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filters</Text>
      <Text style={styles.copy}>Connect this screen to query params like niche, city, platform, and budget.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
    padding: 24,
    gap: 10
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0f172a"
  },
  copy: {
    color: "#475569",
    lineHeight: 22
  }
});

