import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "@/components/button";
import { PageCard } from "@/components/page-card";
import { api } from "@/services/api";
import type { RootStackParamList } from "@/types/navigation";

export function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "Home">) {
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const response = await api.get("/pages");
      setPages(response.data.items || []);
    }

    void load();
  }, []);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.hero}>Explore creator pages</Text>
      <View style={styles.actions}>
        <Button title="Filters" onPress={() => navigation.navigate("Filters")} />
        <Button title="My Bookings" onPress={() => navigation.navigate("MyBookings")} />
      </View>
      <View style={styles.list}>
        {pages.map((page) => (
          <PageCard key={page.id} page={page} onPress={() => navigation.navigate("PageDetail", { pageId: page.id })} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fffaf0"
  },
  content: {
    padding: 20,
    gap: 16
  },
  hero: {
    fontSize: 30,
    fontWeight: "900",
    color: "#0f172a"
  },
  actions: {
    gap: 12
  },
  list: {
    gap: 14
  }
});

