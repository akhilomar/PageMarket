import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { api } from "@/services/api";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import type { RootStackParamList } from "@/types/navigation";

export function BookingScreen({ route }: NativeStackScreenProps<RootStackParamList, "Booking">) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function submit() {
    try {
      await api.post("/bookings", {
        pageId: route.params.pageId,
        promotionType: "Post",
        campaignTitle: title,
        campaignDescription: description,
        preferredDate: new Date().toISOString()
      });
      Alert.alert("Booking created", "Your request was sent successfully.");
    } catch {
      Alert.alert("Unable to create booking", "Please try again.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create booking</Text>
      <Input label="Campaign Title" value={title} onChangeText={setTitle} />
      <Input label="Campaign Description" value={description} onChangeText={setDescription} />
      <Button title="Submit Booking" onPress={() => void submit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
    padding: 24,
    gap: 16
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0f172a"
  }
});

