import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff6b57",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: "center"
  },
  text: {
    color: "#ffffff",
    fontWeight: "700"
  }
});

