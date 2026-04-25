import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text } from "react-native";
import { api } from "@/services/api";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

export function AddPageScreen() {
  const [pageName, setPageName] = useState("");
  const [city, setCity] = useState("");

  async function submit() {
    try {
      await api.post("/pages", {
        pageName,
        platform: "Instagram",
        pageUrl: "https://instagram.com/example",
        niche: "Lifestyle",
        state: "Karnataka",
        city,
        followersCount: 1000,
        analyticsImages: []
      });
      Alert.alert("Page submitted", "Your page has been added successfully.");
    } catch {
      Alert.alert("Unable to save page", "Please try again.");
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Add page</Text>
      <Input label="Page Name" value={pageName} onChangeText={setPageName} />
      <Input label="City" value={city} onChangeText={setCity} />
      <Button title="Save Page" onPress={() => void submit()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fffaf0"
  },
  content: {
    padding: 24,
    gap: 16
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0f172a"
  }
});

